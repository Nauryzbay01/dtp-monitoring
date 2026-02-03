import type { Map as MaplibreMap } from "maplibre-gl";

export const getMapBounds = (
  map: MaplibreMap,
): [number, number, number, number] => {
  const bounds = map.getBounds();
  return [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
  ];
};
