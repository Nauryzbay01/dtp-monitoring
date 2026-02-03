import { configure } from "mobx";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
});

export { accidentsMapStore } from "../features/accidents-map/model/store";
