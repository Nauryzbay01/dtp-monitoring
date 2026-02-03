import { observer } from "mobx-react-lite";
import {
  Map,
  AccidentsLayer,
  BoundaryLayer,
  ClustersLayer,
  LayersControl,
  AddressSearch,
} from "../features/accidents-map";
import { useLayersVisibility } from "../shared/hooks/useLayersVisibility";

export const MapPage = observer(() => {
  const { visibility, toggleLayer } = useLayersVisibility();

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Map />
      <AddressSearch />
      <AccidentsLayer isVisible={visibility.accidents} />
      <BoundaryLayer isVisible={visibility.boundary} />
      <ClustersLayer isVisible={visibility.clusters} />
      <LayersControl visibility={visibility} onToggle={toggleLayer} />
      {/* <StatsPanel /> */}
    </div>
  );
});
