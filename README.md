# Мониторинг ДТП г. Астана

Интерактивная карта для визуализации дорожно-транспортных происшествий в городе Астана.

## Технологии

- React 18 + TypeScript
- MapLibre GL — интерактивная карта
- MobX — состояние UI и карты
- React Query — data fetching и кэширование
- Supercluster — кластеризация точек
- Ant Design + Tailwind CSS — UI

## Структура проекта

```
src/
├── app/              # Провайдеры (React Query), MobX store
├── pages/            # Страницы приложения
├── features/         # Бизнес-фичи (accidents-map)
│   └── accidents-map/
│       ├── api/      # API клиенты
│       ├── model/    # MobX store, типы, константы
│       └── ui/       # Компоненты слоев, контролы
├── shared/           # Переиспользуемый код
│   ├── ui/           # Общие UI компоненты
│   ├── hooks/        # React хуки
│   ├── api/          # BaseApiService
│   ├── helpers/      # Форматирование, debounce/throttle
│   ├── utils/        # Утилиты кластеризации
│   └── types/        # Общие типы (GeoJSON, Accident, Boundary)
└── config/           # Конфигурация API и карты
```

## Установка

```bash
npm install
npm run dev
```
