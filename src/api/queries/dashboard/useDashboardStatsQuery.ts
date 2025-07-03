import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000
  });
}
