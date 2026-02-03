import { accidentsMapStore } from "./store";

export const accidentsMapSelectors = {
  getMap: () => accidentsMapStore.map,

  getSelectedAccident: () => accidentsMapStore.selectedAccident,

  isMapLoaded: () => accidentsMapStore.isMapLoaded,

  hasSelection: () => accidentsMapStore.selectedAccident !== null,
};
