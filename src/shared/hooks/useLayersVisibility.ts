import { useState } from "react";
import { AVAILABLE_LAYERS } from "../../features/accidents-map/model/constants";
import type {
  LayerType,
  LayerVisibility,
} from "../../features/accidents-map/model/types";

export const useLayersVisibility = (initial?: Partial<LayerVisibility>) => {
  const defaultVisibility = AVAILABLE_LAYERS.reduce(
    (acc, layer) => ({
      ...acc,
      [layer.id]: initial?.[layer.id] ?? layer.defaultVisible,
    }),
    {} as LayerVisibility,
  );

  const [visibility, setVisibility] =
    useState<LayerVisibility>(defaultVisibility);

  const toggleLayer = (layer: LayerType) => {
    setVisibility((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  const setLayerVisibility = (layer: LayerType, visible: boolean) => {
    setVisibility((prev) => ({
      ...prev,
      [layer]: visible,
    }));
  };

  const showAllLayers = () => {
    const allVisible = AVAILABLE_LAYERS.reduce(
      (acc, layer) => ({ ...acc, [layer.id]: true }),
      {} as LayerVisibility,
    );
    setVisibility(allVisible);
  };

  const hideAllLayers = () => {
    const allHidden = AVAILABLE_LAYERS.reduce(
      (acc, layer) => ({ ...acc, [layer.id]: false }),
      {} as LayerVisibility,
    );
    setVisibility(allHidden);
  };

  return {
    visibility,
    toggleLayer,
    setLayerVisibility,
    showAllLayers,
    hideAllLayers,
  };
};
