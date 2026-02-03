import Supercluster from "supercluster";
import type { AccidentPoint } from "../types/accident.types";
import { CLUSTER_CONFIG } from "../../config/map.config";

export const createClusterIndex = (points: AccidentPoint[]): Supercluster => {
  const index = new Supercluster({
    radius: CLUSTER_CONFIG.radius,
    maxZoom: CLUSTER_CONFIG.maxZoom,
    minZoom: CLUSTER_CONFIG.minZoom,
  });

  const features = points.map((point) => ({
    type: "Feature" as const,
    properties: {
      ...point.properties,
      pointId: point.id,
    },
    geometry: {
      type: "Point" as const,
      coordinates: point.coordinates,
    },
  }));

  index.load(features);

  return index;
};
