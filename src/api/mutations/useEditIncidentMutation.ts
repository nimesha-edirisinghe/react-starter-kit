import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';
import { IncidentsResponse } from '../services/incidents';
import { useUrlParams } from '~/features/incident/hooks/useUrlParams';

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

          // If this was the last item on the current page and not the first page,
          // we need to navigate to the previous page
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

  return useMutation({
    mutationFn: editIncident,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: incidentQueryKeys.all });

      // Snapshot the previous values
      const previousIncidents =
        queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list()) || [];
      const previousFilteredQueries = queryClient.getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      });

      // Get the current incident to merge with updates
      const currentIncident = previousIncidents.find(
        (incident: RacingIncident) => incident.id === variables.id
      );

      if (!currentIncident) {
        return { previousIncidents, previousFilteredQueries };
      }

      // Create an optimistic incident by merging current data with updates
      const optimisticIncident: RacingIncident = {
        ...currentIncident,
        type: variables.incident.type || currentIncident.type,
        raceCategory: variables.incident.raceCategory || currentIncident.raceCategory,
        location: variables.incident.location,
        circuit: variables.incident.circuit,
        severity: variables.incident.severity || currentIncident.severity,
        drivers: variables.incident.drivers.split(',').map((d) => d.trim()),
        teams: variables.incident.teams.split(',').map((t) => t.trim()),
        lapNumber: parseInt(variables.incident.lapNumber.toString()),
        raceTime: variables.incident.raceTime,
        description: variables.incident.description,
        status: variables.incident.status || currentIncident.status,
        stewardNotes: variables.incident.stewardNotes,
        timestamp: new Date().toISOString()
      };

      // Optimistically update
      updateIncidentInList(optimisticIncident);

      // Return context with the snapshotted values
      return { previousIncidents, previousFilteredQueries };
    },
    onSuccess: (updatedIncident) => {
      updateIncidentInList(updatedIncident);
      invalidateDashboard();
    },
    onError: (error, _, context) => {
      console.error('Failed to edit incident:', error);
      // Rollback to the snapshots
      if (context?.previousIncidents) {
        queryClient.setQueryData(incidentQueryKeys.list(), context.previousIncidents);
      }
      if (context?.previousFilteredQueries) {
        context.previousFilteredQueries.forEach(([queryKey, data]) => {
          if (data) {
            queryClient.setQueryData(queryKey, data);
          }
        });
      }
      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    }
  });
};
