import { useQuery } from '@tanstack/react-query';
import {
  getSeverityData,
  getTrendData,
  getHourlyData,
  getCircuitData
} from '~/api/services/dashboard';

export function useSeverityDataQuery() {
  return useQuery({
    queryKey: ['dashboard', 'severity-data'],
    queryFn: getSeverityData,
    staleTime: 10 * 60 * 1000
  });
}

export function useTrendDataQuery() {
  return useQuery({
    queryKey: ['dashboard', 'trend-data'],
    queryFn: getTrendData,
    staleTime: 10 * 60 * 1000
  });
}

export function useHourlyDataQuery() {
  return useQuery({
    queryKey: ['dashboard', 'hourly-data'],
    queryFn: getHourlyData,
    staleTime: 10 * 60 * 1000
  });
}

export function useCircuitDataQuery() {
  return useQuery({
    queryKey: ['dashboard', 'circuit-data'],
    queryFn: getCircuitData,
    staleTime: 10 * 60 * 1000
  });
}
