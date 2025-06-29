import { useQuery } from '@tanstack/react-query';
import { getRecentIncidents } from '~/api/services/dashboard';

export function useRecentIncidentsQuery() {
  return useQuery({
    queryKey: ['dashboard', 'recent-incidents'],
    queryFn: getRecentIncidents,
    staleTime: 2 * 60 * 1000
  });
}
