import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 20 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: 2000
  });
}
