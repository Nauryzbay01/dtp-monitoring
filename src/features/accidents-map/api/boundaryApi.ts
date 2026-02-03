import { BaseApiService } from "../../../shared/api";
import { API_CONFIG } from "../../../config/api.config";
import type {
  GeoJSONFeatureCollection,
  BoundaryProperties,
} from "../../../shared/types";

class BoundaryApiService extends BaseApiService {
  async getBoundary(): Promise<GeoJSONFeatureCollection<BoundaryProperties>> {
    const url = this.buildUrl(
      API_CONFIG.boundary.url,
      API_CONFIG.boundary.params,
    );

    const data =
      await this.get<GeoJSONFeatureCollection<BoundaryProperties>>(url);

    this.validateGeoJSON(data);

    return data;
  }
}

export const boundaryApi = new BoundaryApiService();
