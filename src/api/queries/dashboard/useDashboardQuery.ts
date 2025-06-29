import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '~/api/services/dashboard';

export function useDashboardQuery() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
}
