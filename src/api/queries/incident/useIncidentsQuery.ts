import { useQuery } from '@tanstack/react-query';
import { getIncidents } from '~/api/services/incidents';

export function useIncidentsQuery() {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: getIncidents,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
}
