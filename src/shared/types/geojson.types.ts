import type { AccidentProperties } from "./accident.types";
import type { BoundaryProperties } from "./boundary.types";

export type GeoJSONFeature<T = AccidentProperties> = {
  type: "Feature";
  geometry: {
    type: "Point" | "MultiPolygon" | "Polygon";
    coordinates: number[] | number[][][] | number[][][][];
  };
  properties: T;
};

export type GeoJSONFeatureCollection<T = AccidentProperties> = {
  type: "FeatureCollection";
  features: GeoJSONFeature<T>[];
};

export type { AccidentProperties, BoundaryProperties };
