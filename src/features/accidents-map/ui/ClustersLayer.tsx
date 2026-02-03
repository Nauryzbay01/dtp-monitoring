import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import type { GeoJSONSource, MapMouseEvent } from "maplibre-gl";
import type Supercluster from "supercluster";
import { accidentsMapStore } from "../model/store";
import { useAccidentsData } from "../../../shared/hooks/useAccidentsData";
import {
  createClusterIndex,
  getMapBounds,
  getClusters,
} from "../../../shared/utils";
import { CLUSTER_STYLE } from "../../../config/map.config";
import type {
  AccidentPoint,
  ClusterPoint,
} from "../../../shared/types";

export const ClustersLayer = observer(({ isVisible }: { isVisible: boolean }) => {
  const { data: accidentsData } = useAccidentsData();
  const map = accidentsMapStore.map;
  const [clusterIndex, setClusterIndex] = useState<Supercluster | null>(null);

  const accidentPoints: AccidentPoint[] = useMemo(() => {
    if (!accidentsData) return [];

    return accidentsData.features.map((feature, index) => ({
      id: feature.properties.OBJECTID || index,
      coordinates: feature.geometry.coordinates as [number, number],
      properties: feature.properties,
    }));
  }, [accidentsData]);

  useEffect(() => {
    if (accidentPoints.length > 0) {
      const index = createClusterIndex(accidentPoints);
      setClusterIndex(index);
    }
  }, [accidentPoints]);

  const updateClusters = () => {
    if (!map || !clusterIndex) return;

    const bounds = getMapBounds(map);
    const zoom = map.getZoom();
    const clusters = getClusters(clusterIndex, bounds, zoom);

    const clusterFeatures = clusters
      .filter((c): c is ClusterPoint => "pointCount" in c)
      .map((cluster) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: cluster.coordinates,
        },
        properties: {
          cluster: true,
          clusterId: cluster.id,
          pointCount: cluster.pointCount,
        },
      }));

    const geojson = {
      type: "FeatureCollection" as const,
      features: clusterFeatures,
    };

    const source = map.getSource("clusters-source") as GeoJSONSource;
    if (source) {
      source.setData(geojson);
    }
  };

  useEffect(() => {
    if (!map || !clusterIndex || !accidentsMapStore.isMapLoaded) return;

    const sourceId = "clusters-source";
    const layerId = "clusters-layer";
    const countLayerId = "clusters-count-layer";

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
    }

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-color": [
            "step",
            ["get", "pointCount"],
            CLUSTER_STYLE.small.color,
            10,
            CLUSTER_STYLE.medium.color,
            50,
            CLUSTER_STYLE.large.color,
          ],
          "circle-radius": [
            "step",
            ["get", "pointCount"],
            CLUSTER_STYLE.small.size,
            10,
            CLUSTER_STYLE.medium.size,
            50,
            CLUSTER_STYLE.large.size,
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    }

    if (!map.getLayer(countLayerId)) {
      map.addLayer({
        id: countLayerId,
        type: "symbol",
        source: sourceId,
        layout: {
          "text-field": ["get", "pointCount"],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 14,
        },
        paint: {
          "text-color": CLUSTER_STYLE.small.textColor,
        },
      });
    }

    updateClusters();

    const handleClusterClick = (e: MapMouseEvent) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const clusterId = feature.properties?.clusterId;

      if (clusterId && clusterIndex) {
        const zoom = clusterIndex.getClusterExpansionZoom(clusterId);
        map.flyTo({
          center: feature.geometry.coordinates,
          zoom: zoom,
          duration: 1000,
        });
      }
    };

    map.on("click", layerId, handleClusterClick);

    map.on("mouseenter", layerId, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", layerId, () => {
      map.getCanvas().style.cursor = "";
    });

    map.on("move", updateClusters);
    map.on("zoom", updateClusters);

    return () => {
      map.off("click", layerId, handleClusterClick);
      map.off("move", updateClusters);
      map.off("zoom", updateClusters);

      if (map.getLayer(countLayerId)) {
        map.removeLayer(countLayerId);
      }
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
      }
    };
  }, [map, clusterIndex, accidentsMapStore.isMapLoaded]);

  useEffect(() => {
    if (!map) return;

    const layerId = "clusters-layer";
    const countLayerId = "clusters-count-layer";

    if (map.getLayer(layerId)) {
      map.setLayoutProperty(
        layerId,
        "visibility",
        isVisible ? "visible" : "none",
      );
    }

    if (map.getLayer(countLayerId)) {
      map.setLayoutProperty(
        countLayerId,
        "visibility",
        isVisible ? "visible" : "none",
      );
    }
  }, [map, isVisible]);

  return null;
});
