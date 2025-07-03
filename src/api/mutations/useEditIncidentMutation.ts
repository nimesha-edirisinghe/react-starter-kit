import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export const useEditIncidentMutation = () => {
  const queryClient = useQueryClient();

  const updateIncidentInList = (updatedIncident: RacingIncident) => {
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());

    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(
        incidentQueryKeys.list(),
        currentIncidents.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident
        )
      );
    } else {
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    }
  };

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.stats() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.recentIncidents() });
  };

  return useMutation({
    mutationFn: editIncident,
    onSuccess: (updatedIncident) => {
      updateIncidentInList(updatedIncident);
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Failed to edit incident:', error);
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    }
  });
};
