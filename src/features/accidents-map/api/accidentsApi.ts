import { BaseApiService } from "../../../shared/api";
import { API_CONFIG } from "../../../config/api.config";
import type {
  GeoJSONFeatureCollection,
  AccidentProperties,
} from "../../../shared/types";

class AccidentsApiService extends BaseApiService {
  async getAccidents(): Promise<GeoJSONFeatureCollection<AccidentProperties>> {
    const url = this.buildUrl(
      API_CONFIG.accidents.url,
      API_CONFIG.accidents.params,
    );

    const data =
      await this.get<GeoJSONFeatureCollection<AccidentProperties>>(url);

    this.validateGeoJSON(data);

    return data;
  }

  async getAccidentById(id: number): Promise<AccidentProperties> {
    const url = this.buildUrl(API_CONFIG.accidents.url, {
      ...API_CONFIG.accidents.params,
      where: `OBJECTID = ${id}`,
    });

    const data =
      await this.get<GeoJSONFeatureCollection<AccidentProperties>>(url);

    this.validateGeoJSON(data);

    if (!data.features || data.features.length === 0) {
      throw new Error(`Accident with id ${id} not found`);
    }

    return data.features[0].properties;
  }
}

export const accidentsApi = new AccidentsApiService();
