import { useQuery } from "@tanstack/react-query";
import { boundaryApi } from "../../features/accidents-map/api";
import { QUERY_CONFIG } from "../../config/api.config";

export const useBoundaryData = () => {
  return useQuery({
    queryKey: ["boundary"],
    queryFn: () => boundaryApi.getBoundary(),
    staleTime: QUERY_CONFIG.staleTime,
    gcTime: QUERY_CONFIG.cacheTime,
    refetchOnWindowFocus: QUERY_CONFIG.refetchOnWindowFocus,
    retry: QUERY_CONFIG.retry,
  });
};
