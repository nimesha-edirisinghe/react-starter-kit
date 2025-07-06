import { useQuery } from '@tanstack/react-query';
import { getRecentIncidents } from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export function useRecentIncidentsQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentIncidents(),
    queryFn: getRecentIncidents,
    staleTime: 20 * 60 * 1000
  });
}
