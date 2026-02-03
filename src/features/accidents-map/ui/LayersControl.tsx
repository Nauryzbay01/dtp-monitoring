import { observer } from "mobx-react-lite";
import { Card, Switch, Button, Space } from "antd";
import { AVAILABLE_LAYERS } from "../model/constants";
import type { LayerType } from "../model/types";

type LayersControlProps = {
  visibility: Record<LayerType, boolean>;
  onToggle: (layer: LayerType) => void;
};

export const LayersControl = observer(
  ({ visibility, onToggle }: LayersControlProps) => {
    const handleShowAll = () => {
      AVAILABLE_LAYERS.forEach((layer) => {
        if (!visibility[layer.id]) onToggle(layer.id);
      });
    };

    const handleHideAll = () => {
      AVAILABLE_LAYERS.forEach((layer) => {
        if (visibility[layer.id]) onToggle(layer.id);
      });
    };

    return (
      <Card
        className="absolute top-4 right-4 z-[1002] w-[280px]"
        title="Слои карты"
        variant="borderless"
        styles={{
          header: { padding: "12px 16px" },
          body: { padding: 8 },
        }}
      >
        <Space direction="vertical" size={0} className="w-full">
          {AVAILABLE_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <Switch
                  checked={visibility[layer.id]}
                  onChange={() => onToggle(layer.id)}
                  size="small"
                />
                <div className="flex-1">
                  <span className="block font-medium text-sm">
                    {layer.name}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {layer.description}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </Space>
        <div className="flex gap-2 pt-2 mt-2 border-t border-gray-100">
          <Button onClick={handleShowAll} size="small" block>
            Показать все
          </Button>
          <Button onClick={handleHideAll} size="small" block>
            Скрыть все
          </Button>
        </div>
      </Card>
    );
  },
);
