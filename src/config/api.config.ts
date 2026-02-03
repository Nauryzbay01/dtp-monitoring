export const API_CONFIG = {
  accidents: {
    url: "https://gis.kgp.kz/arcgis/rest/services/KPSSU/DTP/FeatureServer/0/query",
    params: {
      where: "area_code = '1971'",
      outFields: "*",
      returnGeometry: true,
      outSR: 4326,
      f: "geojson",
    },
  },
  boundary: {
    url: "https://services8.arcgis.com/GyR85gR88mMqIY4t/ArcGIS/rest/services/Open_dataset_of_administrative_boundaries_of_Kazakhstan_WFL1/FeatureServer/1/query",
    params: {
      where: "name_en='Astana'",
      outFields: "*",
      returnGeometry: true,
      outSR: 4326,
      f: "pgeojson",
    },
  },
} as const;

export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 2,
} as const;
