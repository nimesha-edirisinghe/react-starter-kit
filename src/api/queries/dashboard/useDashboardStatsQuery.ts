import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '~/api/services/dashboard';

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000
  });
}
