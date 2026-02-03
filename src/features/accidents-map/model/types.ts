export type LayerType = "accidents" | "clusters" | "boundary";

export type LayerVisibility = {
  accidents: boolean;
  clusters: boolean;
  boundary: boolean;
};

export type LayerConfig = {
  id: LayerType;
  name: string;
  description: string;
  defaultVisible: boolean;
};
