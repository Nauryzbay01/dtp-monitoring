import type { LayerConfig } from "./types";

export const AVAILABLE_LAYERS: LayerConfig[] = [
  {
    id: "accidents",
    name: "Точки ДТП",
    description: "Отображение отдельных точек ДТП",
    defaultVisible: true,
  },
  {
    id: "clusters",
    name: "Кластеры",
    description: "Группировка близких точек ДТП",
    defaultVisible: true,
  },
  {
    id: "boundary",
    name: "Граница города",
    description: "Административная граница Астаны",
    defaultVisible: true,
  },
];
