export const MAP_CONFIG = {
  center: {
    lng: 71.4704,
    lat: 51.1694,
  },
  zoom: 11,
  minZoom: 8,
  maxZoom: 18,
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
} as const;

export const CLUSTER_CONFIG = {
  radius: 50,
  maxZoom: 14,
  minZoom: 0,
} as const;

export const ACCIDENT_MARKER_STYLE = {
  default: {
    color: "#dc2626",
    size: 8,
  },
  selected: {
    color: "#f59e0b",
    size: 12,
  },
} as const;

export const CLUSTER_STYLE = {
  small: {
    color: "#3b82f6",
    textColor: "#ffffff",
    size: 30,
  },
  medium: {
    color: "#2563eb",
    textColor: "#ffffff",
    size: 40,
  },
  large: {
    color: "#1e40af",
    textColor: "#ffffff",
    size: 50,
  },
} as const;

export const BOUNDARY_STYLE = {
  fillColor: "#3b82f6",
  fillOpacity: 0.1,
  lineColor: "#2563eb",
  lineWidth: 2,
} as const;
