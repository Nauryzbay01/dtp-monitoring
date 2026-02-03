import type Supercluster from "supercluster";
import type { AccidentPoint, ClusterPoint } from "../types/accident.types";

export const getClusters = (
  index: Supercluster,
  bbox: [number, number, number, number],
  zoom: number,
): (AccidentPoint | ClusterPoint)[] => {
  const clusters = index.getClusters(bbox, Math.floor(zoom));

  return clusters.map((cluster) => {
    if (cluster.properties.cluster) {
      return {
        id: cluster.id!,
        coordinates: cluster.geometry.coordinates as [number, number],
        pointCount: cluster.properties.point_count,
        points: [],
      } as ClusterPoint;
    } else {
      return {
        id: cluster.properties.pointId,
        coordinates: cluster.geometry.coordinates as [number, number],
        properties: cluster.properties,
      } as AccidentPoint;
    }
  });
};
