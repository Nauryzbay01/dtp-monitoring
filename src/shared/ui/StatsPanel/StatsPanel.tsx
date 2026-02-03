import { observer } from "mobx-react-lite";
import { Card, Statistic } from "antd";
import { useAccidentsData } from "../../hooks/useAccidentsData";

export const StatsPanel = observer(() => {
  const { data: accidentsData, isLoading } = useAccidentsData();
  const totalAccidents = accidentsData?.features.length ?? 0;

  return (
    <Card
      className="absolute top-4 right-4 z-[1001] min-w-[220px]"
      variant="borderless"
      styles={{
        body: { padding: 16 },
      }}
    >
      <Statistic
        title="Всего ДТП"
        value={totalAccidents}
        loading={isLoading}
        styles={{ content: { fontSize: 24 } }}
      />
      <div className="mt-3">
        <div className="text-xs text-gray-400">Город</div>
        <div className="text-lg font-semibold">Астана</div>
      </div>
    </Card>
  );
});
