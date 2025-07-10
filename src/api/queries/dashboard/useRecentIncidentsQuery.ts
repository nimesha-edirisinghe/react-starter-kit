import { useQuery } from '@tanstack/react-query';
import { getRecentIncidents } from '~/api/services/dashboard';
import { dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export function useRecentIncidentsQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentIncidents(),
    queryFn: getRecentIncidents,
    staleTime: 20 * 60 * 1000, // Data is fresh for 20 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: 1000 // Retry after 1 second
  });
}
