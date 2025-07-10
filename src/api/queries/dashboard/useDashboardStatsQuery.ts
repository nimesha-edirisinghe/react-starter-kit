import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 20 * 60 * 1000, // Data is fresh for 20 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: 1000 // Retry after 1 second
  });
}
