import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export function useDashboardQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.data(),
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
}
