import { useEffect, useRef } from "react";
import { Map as MaplibreMap, type StyleSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { accidentsMapStore } from "../model/store";
import { MAP_CONFIG } from "../../../config/map.config";
import "maplibre-gl/dist/maplibre-gl.css";

export const Map = observer(() => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MaplibreMap({
      container: mapContainer.current,
      style: MAP_CONFIG.style as unknown as StyleSpecification,
      center: [MAP_CONFIG.center.lng, MAP_CONFIG.center.lat],
      zoom: MAP_CONFIG.zoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
    });

    mapRef.current = map;

    map.on("load", () => {
      accidentsMapStore.setMap(map);
      accidentsMapStore.setMapLoaded(true);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        accidentsMapStore.cleanup();
      }
    };
  }, []);

  return <div ref={mapContainer} className="relative h-full w-full" />;
});
