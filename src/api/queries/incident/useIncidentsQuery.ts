import { useQuery } from '@tanstack/react-query';
import { getIncidents, getFilteredIncidents, IncidentSearchParams } from '~/api/services/incidents';
import { incidentQueryKeys } from '~/lib/tanstack/queryKeys';

export function useIncidentsQuery() {
  return useQuery({
    queryKey: incidentQueryKeys.list(),
    queryFn: () => getIncidents(),
    staleTime: 20 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
}

export function useFilteredIncidentsQuery(params: IncidentSearchParams) {
  return useQuery({
    queryKey: incidentQueryKeys.filtered(params),
    queryFn: () => getFilteredIncidents(params),
    staleTime: 20 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: true
  });
}
