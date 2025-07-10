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
    queryClient.setQueryData<RacingIncident[]>(incidentQueryKeys.list(), (oldData) => {
      if (!oldData) return [newIncident];
      if (oldData.some((incident) => incident.id === newIncident.id)) {
        return oldData;
      }
      return [newIncident, ...oldData];
    });

    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          const { category, severity, status, type, circuit, location } = getUrlParams();
          const matchesFilters =
            (!category || newIncident.raceCategory === category) &&
            (!severity || newIncident.severity === severity) &&
            (!status || newIncident.status === status) &&
            (!type || newIncident.type === type) &&
            (!circuit || newIncident.circuit === circuit) &&
            (!location || newIncident.location === location);

          if (matchesFilters) {
            queryClient.setQueryData<IncidentsResponse>(queryKey, (oldData) => {
              if (!oldData) return data;

              if (oldData.incidents.some((incident) => incident.id === newIncident.id)) {
                return oldData;
              }

              const newTotal = oldData.pagination.total + 1;
              const newFiltered = oldData.pagination.filtered + 1;
              const itemsPerPage = oldData.pagination.limit;
              const newTotalPages = Math.ceil(newFiltered / itemsPerPage);

              const updatedIncidents =
                oldData.pagination.page === 1
                  ? [newIncident, ...oldData.incidents.slice(0, itemsPerPage - 1)]
                  : oldData.incidents;

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

  return useMutation<RacingIncident, Error, IncidentFormData>({
    mutationFn: createIncident,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: incidentQueryKeys.list() });
      await queryClient.cancelQueries({ queryKey: ['incidents', 'filtered'] });
    },
    onSuccess: (newIncident) => {
      addIncidentToList(newIncident);
      invalidateQueries();
    },
    onError: (error) => {
      console.error('Failed to create incident:', error);
      invalidateQueries();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: ['incidents', 'filtered'] });
    }
  });
};
