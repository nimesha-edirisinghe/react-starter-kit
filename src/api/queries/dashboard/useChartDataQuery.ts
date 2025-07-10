import { useQuery } from '@tanstack/react-query';
import {
  getSeverityData,
  getTrendData,
  getHourlyData,
  getCircuitData
} from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

const STALE_TIME = 20 * 60 * 1000; // 20 minutes

const defaultOptions = {
  staleTime: STALE_TIME,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  retry: 3,
  retryDelay: 1000
};

export function useSeverityDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.severity(),
    queryFn: getSeverityData,
    ...defaultOptions
  });
}

export function useTrendDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.trend(),
    queryFn: getTrendData,
    ...defaultOptions
  });
}

export function useHourlyDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.hourly(),
    queryFn: getHourlyData,
    ...defaultOptions
  });
}

export function useCircuitDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.circuit(),
    queryFn: getCircuitData,
    ...defaultOptions
  });
}
