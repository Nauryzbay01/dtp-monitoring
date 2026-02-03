import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { accidentsMapStore } from "../model/store";
import { useBoundaryData } from "../../../shared/hooks/useBoundaryData";
import { BOUNDARY_STYLE } from "../../../config/map.config";

export const BoundaryLayer = observer(
  ({ isVisible }: { isVisible: boolean }) => {
    const { data: boundaryData } = useBoundaryData();
    const map = accidentsMapStore.map;

    useEffect(() => {
      if (!map || !boundaryData || !accidentsMapStore.isMapLoaded) return;

      const sourceId = "boundary-source";
      const layerId = "boundary-layer";
      const lineLayerId = "boundary-line-layer";

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: boundaryData as unknown as GeoJSON.FeatureCollection,
        });
      }

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": BOUNDARY_STYLE.fillColor,
            "fill-opacity": BOUNDARY_STYLE.fillOpacity,
          },
        });
      }

      if (!map.getLayer(lineLayerId)) {
        map.addLayer({
          id: lineLayerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": BOUNDARY_STYLE.lineColor,
            "line-width": BOUNDARY_STYLE.lineWidth,
          },
        });
      }

      return () => {
        if (map.getLayer(lineLayerId)) {
          map.removeLayer(lineLayerId);
        }
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      };
    }, [map, boundaryData, accidentsMapStore.isMapLoaded]);

    useEffect(() => {
      if (!map) return;

      const layerId = "boundary-layer";
      const lineLayerId = "boundary-line-layer";

      if (map.getLayer(layerId)) {
        map.setLayoutProperty(
          layerId,
          "visibility",
          isVisible ? "visible" : "none",
        );
      }

      if (map.getLayer(lineLayerId)) {
        map.setLayoutProperty(
          lineLayerId,
          "visibility",
          isVisible ? "visible" : "none",
        );
      }
    }, [map, isVisible]);

    return null;
  },
);
