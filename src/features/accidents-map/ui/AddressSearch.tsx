import { useEffect, useMemo, useRef, useState } from "react";
import { Marker } from "maplibre-gl";
import { Input, List, Spin, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { accidentsMapStore } from "../model/store";

type NominatimItem = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

export const AddressSearch = () => {
  const map = accidentsMapStore.map;
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<NominatimItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const trimmed = useMemo(() => query.trim(), [query]);
  const searchQ = useMemo(() => {
    const q = trimmed;
    if (!q) return q;
    const low = q.toLowerCase();
    if (low.includes("астана") || low.includes("astana")) return q;
    return `${q}, Астана`;
  }, [trimmed]);

  const ASTANA_VIEWBOX = "71.15,51.00,71.65,51.35";

  useEffect(() => {
    if (!searchQ || searchQ.length < 3) {
      setItems([]);
      setOpen(false);
      abortRef.current?.abort();
      return;
    }

    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      try {
        const url =
          "https://nominatim.openstreetmap.org/search?" +
          new URLSearchParams({
            format: "json",
            q: searchQ,
            limit: "6",
            viewbox: ASTANA_VIEWBOX,
            bounded: "1",
            "accept-language": "ru",
          }).toString();

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Geocode failed");
        const data = (await res.json()) as NominatimItem[];
        setItems(data);
        setOpen(true);
      } catch (e) {
        if ((e as { name?: string })?.name !== "AbortError") {
          setItems([]);
          setOpen(false);
        }
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [searchQ]);

  const selectItem = (it: NominatimItem) => {
    if (!map) return;
    const lng = Number(it.lon);
    const lat = Number(it.lat);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;

    map.flyTo({ center: [lng, lat], zoom: 16, duration: 900 });

    markerRef.current?.remove();
    markerRef.current = new Marker({ color: "#2563eb" })
      .setLngLat([lng, lat])
      .addTo(map);

    setQuery(it.display_name);
    setOpen(false);
  };

  return (
    <div className="absolute top-3 left-3 z-[1002] w-[420px] max-w-[calc(100vw-24px)]">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => items.length > 0 && setOpen(true)}
        placeholder="Поиск адреса в Астане…"
        prefix={<SearchOutlined />}
        suffix={loading && <Spin size="small" />}
        size="large"
        allowClear
      />
      {open && items.length > 0 && (
        <Card className="mt-2 shadow-lg" variant="borderless">
          <List
            size="small"
            dataSource={items}
            renderItem={(it) => (
              <List.Item
                onClick={() => selectItem(it)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm">{it.display_name}</div>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};
