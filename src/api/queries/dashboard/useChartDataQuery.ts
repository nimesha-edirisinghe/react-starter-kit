import { useQuery } from '@tanstack/react-query';
import {
  getSeverityData,
  getTrendData,
  getHourlyData,
  getCircuitData
} from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

const STALE_TIME = 10 * 60 * 1000; // 10 minutes

export function useSeverityDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.severity(),
    queryFn: getSeverityData,
    staleTime: STALE_TIME
  });
}

export function useTrendDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.trend(),
    queryFn: getTrendData,
    staleTime: STALE_TIME
  });
}

export function useHourlyDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.hourly(),
    queryFn: getHourlyData,
    staleTime: STALE_TIME
  });
}

export function useCircuitDataQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.charts.circuit(),
    queryFn: getCircuitData,
    staleTime: STALE_TIME
  });
}
