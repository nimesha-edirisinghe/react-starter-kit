import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';
import { IncidentsResponse } from '../services/incidents';
import { useUrlParams } from '~/features/incident/hooks/useUrlParams';

interface MutationContext {
  previousUnfiltered: RacingIncident[] | undefined;
  previousFiltered: [readonly unknown[], IncidentsResponse | undefined][];
}

export const useDeleteIncidentMutation = () => {
  const queryClient = useQueryClient();
  const { getUrlParams, updateUrlParams } = useUrlParams();

  const removeIncidentFromList = (deletedId: string) => {
    queryClient.setQueryData<RacingIncident[]>(incidentQueryKeys.list(), (oldData) => {
      if (!oldData) return [];
      return oldData.filter((incident) => incident.id !== deletedId);
    });

    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          queryClient.setQueryData<IncidentsResponse>(queryKey, (oldData) => {
            if (!oldData) return data;

            const updatedIncidents = oldData.incidents.filter(
              (incident) => incident.id !== deletedId
            );
            const { page } = getUrlParams();
            const newTotal = oldData.pagination.total - 1;
            const newFiltered = oldData.pagination.filtered - 1;
            const itemsPerPage = oldData.pagination.limit;
            const newTotalPages = Math.ceil(newFiltered / itemsPerPage);

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

            return {
              ...oldData,
              incidents: updatedIncidents,
              pagination: {
                ...oldData.pagination,
                total: newTotal,
                filtered: newFiltered,
                totalPages: newTotalPages
              },
              counts: {
                ...oldData.counts,
                total: newTotal,
                filtered: newFiltered,
                showing: updatedIncidents.length
              }
            };
          });
        }
      });
  };

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.stats() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.recentIncidents() });
    queryClient.invalidateQueries({ queryKey: incidentQueryKeys.list() });
    queryClient.invalidateQueries({
      queryKey: ['incidents', 'filtered'],
      refetchType: 'none'
    });
  };

  return useMutation<void, Error, string, MutationContext>({
    mutationFn: deleteIncident,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: incidentQueryKeys.list() });
      await queryClient.cancelQueries({ queryKey: ['incidents', 'filtered'] });

      // Save the current state for rollback
      const previousUnfiltered = queryClient.getQueryData<RacingIncident[]>(
        incidentQueryKeys.list()
      );
      const previousFiltered = queryClient.getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      });

      // Perform optimistic update
      removeIncidentFromList(deletedId);

      return { previousUnfiltered, previousFiltered };
    },
    onSuccess: (_, deletedId) => {
      removeIncidentFromList(deletedId);
      invalidateQueries();
    },
    onError: (error, _, context) => {
      console.error('Failed to delete incident:', error);

      // Rollback to previous state
      if (context) {
        queryClient.setQueryData(incidentQueryKeys.list(), context.previousUnfiltered);
        context.previousFiltered.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      invalidateQueries();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: ['incidents', 'filtered'] });
    }
  });
};
