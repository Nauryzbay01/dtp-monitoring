import { useQuery } from "@tanstack/react-query";
import { accidentsApi } from "../../features/accidents-map/api";
import { QUERY_CONFIG } from "../../config/api.config";

export const useAccidentsData = () => {
  return useQuery({
    queryKey: ["accidents"],
    queryFn: () => accidentsApi.getAccidents(),
    staleTime: QUERY_CONFIG.staleTime,
    gcTime: QUERY_CONFIG.cacheTime,
    refetchOnWindowFocus: QUERY_CONFIG.refetchOnWindowFocus,
    retry: QUERY_CONFIG.retry,
  });
};
