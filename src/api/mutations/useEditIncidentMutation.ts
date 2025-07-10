import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';
import { IncidentsResponse } from '../services/incidents';
import { useUrlParams } from '~/features/incident/hooks/useUrlParams';
import type { IncidentFormData } from '~/features/incident/types/incident';

interface EditIncidentPayload {
  id: string;
  incident: IncidentFormData;
}

export const useEditIncidentMutation = () => {
  const queryClient = useQueryClient();
  const { getUrlParams, updateUrlParams } = useUrlParams();

  const updateIncidentInList = (updatedIncident: RacingIncident) => {
    // Update unfiltered list
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(
        incidentQueryKeys.list(),
        currentIncidents.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident
        )
      );
    }

    // Update filtered lists and handle pagination
    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          // Check if the incident still matches the current filters
          const { category, severity, status, type, circuit, location } = getUrlParams();
          const matchesFilters =
            (!category || updatedIncident.raceCategory === category) &&
            (!severity || updatedIncident.severity === severity) &&
            (!status || updatedIncident.status === status) &&
            (!type || updatedIncident.type === type) &&
            (!circuit || updatedIncident.circuit === circuit) &&
            (!location || updatedIncident.location === location);

          const updatedIncidents = data.incidents
            .map((incident) =>
              incident.id === updatedIncident.id
                ? matchesFilters
                  ? updatedIncident
                  : null
                : incident
            )
            .filter((incident): incident is RacingIncident => incident !== null);

          const { page } = getUrlParams();
          const newFiltered = matchesFilters
            ? data.pagination.filtered
            : data.pagination.filtered - 1;
          const itemsPerPage = data.pagination.limit;
          const newTotalPages = Math.ceil(newFiltered / itemsPerPage);

          if (updatedIncidents.length === 0 && page > 1 && page > newTotalPages) {
            const filters = {
              search: getUrlParams().search,
              category,
              severity,
              status,
              type,
              circuit,
              location
            };
            updateUrlParams(filters, page - 1, true);
          }

          queryClient.setQueryData<IncidentsResponse>(queryKey, {
            ...data,
            incidents: updatedIncidents,
            pagination: {
              ...data.pagination,
              filtered: newFiltered,
              totalPages: newTotalPages
            },
            counts: {
              ...data.counts,
              filtered: newFiltered,
              showing: updatedIncidents.length
            }
          });
        }
      });
  };

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.stats() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.recentIncidents() });
  };

  return useMutation<RacingIncident, Error, EditIncidentPayload>({
    mutationFn: editIncident,
    onSuccess: (updatedIncident) => {
      updateIncidentInList(updatedIncident);
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Failed to edit incident:', error);
    }
  });
};
