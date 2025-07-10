import { useQuery } from '@tanstack/react-query';
import {
  getIncidents,
  getFilteredIncidents,
  IncidentSearchParams,
  IncidentsResponse
} from '~/api/services/incidents';
import { incidentQueryKeys } from '~/lib/tanstack/queryKeys';

export function useIncidentsQuery() {
  return useQuery({
    queryKey: incidentQueryKeys.list(),
    queryFn: () => getIncidents(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}

export function useFilteredIncidentsQuery(params: IncidentSearchParams) {
  return useQuery<IncidentsResponse>({
    queryKey: incidentQueryKeys.filtered(params),
    queryFn: () => getFilteredIncidents(params),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: true,
    placeholderData: (previousData) => previousData, // Use previous data as placeholder while fetching
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
