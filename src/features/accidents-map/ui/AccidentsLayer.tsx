import { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import {
  Popup,
  type MapLayerMouseEvent,
  type GeoJSONSource,
} from "maplibre-gl";
import { renderToStaticMarkup } from "react-dom/server";
import { accidentsMapStore } from "../model/store";
import { useAccidentsData } from "../../../shared/hooks/useAccidentsData";
import { ACCIDENT_MARKER_STYLE } from "../../../config/map.config";
import type { AccidentPoint } from "../../../shared/types";
import { AccidentPopup } from "./AccidentPopup";

export const AccidentsLayer = observer(
  ({ isVisible }: { isVisible: boolean }) => {
    const { data: accidentsData } = useAccidentsData();
    const map = accidentsMapStore.map;
    const selectedAccident = accidentsMapStore.selectedAccident;
    const currentPopupRef = useRef<Popup | null>(null);

    const accidentPoints: AccidentPoint[] = useMemo(() => {
      if (!accidentsData) return [];

      return accidentsData.features.map((feature, index) => ({
        id: feature.properties.OBJECTID || index,
        coordinates: feature.geometry.coordinates as [number, number],
        properties: feature.properties,
      }));
    }, [accidentsData]);

    const geojson = useMemo(() => {
      return {
        type: "FeatureCollection" as const,
        features: accidentPoints.map((point) => ({
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: point.coordinates,
          },
          properties: {
            id: point.id,
            ...point.properties,
          },
        })),
      };
    }, [accidentPoints]);

    useEffect(() => {
      if (!map || !accidentsMapStore.isMapLoaded) return;

      const sourceId = "accidents-source";
      const layerId = "accidents-layer";
      const selectedLayerId = "accidents-selected-layer";

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: geojson,
        });
      } else {
        const source = map.getSource(sourceId) as GeoJSONSource;
        source.setData(geojson);
      }

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": ACCIDENT_MARKER_STYLE.default.size,
            "circle-color": ACCIDENT_MARKER_STYLE.default.color,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });
      }

      if (!map.getLayer(selectedLayerId)) {
        map.addLayer({
          id: selectedLayerId,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": ACCIDENT_MARKER_STYLE.selected.size,
            "circle-color": ACCIDENT_MARKER_STYLE.selected.color,
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff",
          },
          filter: ["==", ["get", "id"], ""],
        });
      }

      const handleClick = (e: MapLayerMouseEvent) => {
        if (!e.features || e.features.length === 0) return;

        const feature = e.features[0];
        const point = accidentPoints.find(
          (p) => p.id === feature.properties?.id,
        );

        if (point) {
          if (currentPopupRef.current) {
            currentPopupRef.current.remove();
            currentPopupRef.current = null;
          }

          accidentsMapStore.selectAccident(point);

          const popup = new Popup({
            closeButton: true,
            closeOnClick: false,
          })
            .setLngLat(point.coordinates)
            .setHTML(renderToStaticMarkup(<AccidentPopup accident={point} />))
            .addTo(map);

          currentPopupRef.current = popup;

          popup.on("close", () => {
            accidentsMapStore.clearSelection();
            currentPopupRef.current = null;
          });
        }
      };

      map.on("click", layerId, handleClick);

      map.on("mouseenter", layerId, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", layerId, () => {
        map.getCanvas().style.cursor = "";
      });

      return () => {
        if (currentPopupRef.current) {
          currentPopupRef.current.remove();
          currentPopupRef.current = null;
        }

        map.off("click", layerId, handleClick);
        if (map.getLayer(selectedLayerId)) {
          map.removeLayer(selectedLayerId);
        }
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      };
    }, [map, geojson, accidentPoints, accidentsMapStore.isMapLoaded]);

    useEffect(() => {
      if (!map) return;

      const layerId = "accidents-layer";
      const selectedLayerId = "accidents-selected-layer";

      if (map.getLayer(layerId)) {
        map.setLayoutProperty(
          layerId,
          "visibility",
          isVisible ? "visible" : "none",
        );
      }

      if (map.getLayer(selectedLayerId)) {
        map.setLayoutProperty(
          selectedLayerId,
          "visibility",
          isVisible ? "visible" : "none",
        );
      }
    }, [map, isVisible]);

    useEffect(() => {
      if (!map) return;

      const selectedLayerId = "accidents-selected-layer";

      if (map.getLayer(selectedLayerId)) {
        map.setFilter(selectedLayerId, [
          "==",
          ["get", "id"],
          selectedAccident?.id ?? "",
        ]);
      }
    }, [map, selectedAccident]);

    return null;
  },
);
