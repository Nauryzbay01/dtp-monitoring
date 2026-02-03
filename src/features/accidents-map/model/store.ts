import { makeAutoObservable } from "mobx";
import type { Map as MaplibreMap } from "maplibre-gl";
import type { AccidentPoint } from "../../../shared/types";

class AccidentsMapStore {
  map: MaplibreMap | null = null;
  selectedAccident: AccidentPoint | null = null;
  isMapLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMap = (map: MaplibreMap) => {
    this.map = map;
  };

  setMapLoaded = (loaded: boolean) => {
    this.isMapLoaded = loaded;
  };

  selectAccident = (accident: AccidentPoint | null) => {
    this.selectedAccident = accident;
  };

  clearSelection = () => {
    this.selectedAccident = null;
  };

  flyToAccident = (accident: AccidentPoint, zoom = 15) => {
    if (this.map) {
      this.map.flyTo({
        center: accident.coordinates,
        zoom,
        duration: 1000,
      });
      this.selectAccident(accident);
    }
  };

  cleanup = () => {
    this.map = null;
    this.selectedAccident = null;
    this.isMapLoaded = false;
  };
}

export const accidentsMapStore = new AccidentsMapStore();
