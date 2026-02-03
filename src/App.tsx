import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import { Providers } from "./app/providers";
import { MapPage } from "./pages/MapPage";
import { LoadingSpinner } from "./shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "./shared/ui/ErrorMessage/ErrorMessage";
import { useAccidentsData } from "./shared/hooks/useAccidentsData";
import { useBoundaryData } from "./shared/hooks/useBoundaryData";
import "./App.css";

const AppContent = () => {
  const {
    isLoading: accidentsLoading,
    error: accidentsError,
    refetch: refetchAccidents,
  } = useAccidentsData();
  const {
    isLoading: boundaryLoading,
    error: boundaryError,
    refetch: refetchBoundary,
  } = useBoundaryData();

  const isLoading = accidentsLoading || boundaryLoading;
  const error = accidentsError || boundaryError;

  if (error) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : "Не удалось загрузить данные"
        }
        onRetry={() => {
          refetchAccidents();
          refetchBoundary();
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <MapPage />;
};

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <Providers>
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">Мониторинг ДТП г. Астана</h1>
          </header>
          <main className="app-main">
            <AppContent />
          </main>
        </div>
      </Providers>
    </ConfigProvider>
  );
}

export default App;
