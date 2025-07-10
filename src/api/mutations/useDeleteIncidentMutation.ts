import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';
import { IncidentsResponse } from '../services/incidents';
import { useUrlParams } from '~/features/incident/hooks/useUrlParams';

export const useDeleteIncidentMutation = () => {
  const queryClient = useQueryClient();
  const { getUrlParams, updateUrlParams } = useUrlParams();

  const removeIncidentFromList = (deletedId: string) => {
    // Update unfiltered list
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(
        incidentQueryKeys.list(),
        currentIncidents.filter((incident) => incident.id !== deletedId)
      );
    }

    // Update filtered lists and handle pagination
    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          const updatedIncidents = data.incidents.filter((incident) => incident.id !== deletedId);
          const { page } = getUrlParams();
          const newTotal = data.pagination.total - 1;
          const newFiltered = data.pagination.filtered - 1;
          const itemsPerPage = data.pagination.limit;
          const newTotalPages = Math.ceil(newFiltered / itemsPerPage);

          // If this was the last item on the current page and not the first page,
          // we need to navigate to the previous page
          if (updatedIncidents.length === 0 && page > 1 && page > newTotalPages) {
            const filters = {
              search: getUrlParams().search,
              category: getUrlParams().category,
              severity: getUrlParams().severity,
              status: getUrlParams().status,
              type: getUrlParams().type,
              circuit: getUrlParams().circuit,
              location: getUrlParams().location
            };
            updateUrlParams(filters, page - 1, true);
          }

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
              showing: data.counts.showing - 1
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
    mutationFn: deleteIncident,
    onMutate: async (deletedId: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: incidentQueryKeys.all });

      // Snapshot the previous values
      const previousIncidents = queryClient.getQueryData(incidentQueryKeys.list());
      const previousFilteredQueries = queryClient.getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      });

      // Optimistically update
      removeIncidentFromList(deletedId);

      // Return context with the snapshotted values
      return { previousIncidents, previousFilteredQueries };
    },
    onSuccess: (_, deletedId: string) => {
      removeIncidentFromList(deletedId);
      invalidateDashboard();
    },
    onError: (error, _, context) => {
      console.error('Failed to delete incident:', error);
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
