import type Supercluster from "supercluster";
import type { AccidentPoint } from "../types/accident.types";

export const getClusterLeaves = (
  index: Supercluster,
  clusterId: number,
  limit = 100,
): AccidentPoint[] => {
  const leaves = index.getLeaves(clusterId, limit);

  return leaves.map((leaf) => ({
    id: leaf.properties.pointId,
    coordinates: leaf.geometry.coordinates as [number, number],
    properties: leaf.properties,
  }));
};
