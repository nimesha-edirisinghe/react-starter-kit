import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';
import { IncidentsResponse } from '../services/incidents';
import { useUrlParams } from '~/features/incident/hooks/useUrlParams';
import type { IncidentFormData } from '~/features/incident/types/incident';

export const useCreateIncidentMutation = () => {
  const queryClient = useQueryClient();
  const { getUrlParams } = useUrlParams();

  const addIncidentToList = (newIncident: RacingIncident) => {
    // Update unfiltered list
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(incidentQueryKeys.list(), [
        newIncident,
        ...currentIncidents
      ]);
    }

    // Update filtered lists and handle pagination
    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          // Check if the incident matches the current filters
          const { category, severity, status, type, circuit, location } = getUrlParams();
          const matchesFilters =
            (!category || newIncident.raceCategory === category) &&
            (!severity || newIncident.severity === severity) &&
            (!status || newIncident.status === status) &&
            (!type || newIncident.type === type) &&
            (!circuit || newIncident.circuit === circuit) &&
            (!location || newIncident.location === location);

          if (matchesFilters) {
            const newTotal = data.pagination.total + 1;
            const newFiltered = data.pagination.filtered + 1;
            const itemsPerPage = data.pagination.limit;
            const newTotalPages = Math.ceil(newFiltered / itemsPerPage);

            // Add the new incident to the first page only
            const updatedIncidents =
              data.pagination.page === 1
                ? [newIncident, ...data.incidents.slice(0, itemsPerPage - 1)]
                : data.incidents;

            queryClient.setQueryData<IncidentsResponse>(queryKey, {
              ...data,
              incidents: updatedIncidents,
              pagination: {
                ...data.pagination,
                total: newTotal,
                filtered: newFiltered,
                totalPages: newTotalPages
              },
              counts: {
                ...data.counts,
                total: newTotal,
                filtered: newFiltered,
                showing: updatedIncidents.length
              }
            });
          }
        }
      });
  };

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.stats() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.recentIncidents() });
  };

  return useMutation<RacingIncident, Error, IncidentFormData>({
    mutationFn: createIncident,
    onSuccess: (newIncident) => {
      // Update the cache with the new incident
      addIncidentToList(newIncident);
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Failed to create incident:', error);
    }
  });
};
