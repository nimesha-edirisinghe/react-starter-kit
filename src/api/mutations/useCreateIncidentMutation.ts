import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export const useCreateIncidentMutation = () => {
  const queryClient = useQueryClient();

  const updateIncidentList = (newIncident: RacingIncident) => {
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());

    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(incidentQueryKeys.list(), [
        newIncident,
        ...currentIncidents
      ]);
    } else {
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    }
  };

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.stats() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.recentIncidents() });
  };

  return useMutation({
    mutationFn: createIncident,
    onSuccess: (newIncident) => {
      updateIncidentList(newIncident);
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Failed to create incident:', error);
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    }
  });
};
