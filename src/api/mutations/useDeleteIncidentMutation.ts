import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';
import { incidentQueryKeys, dashboardQueryKeys } from '~/lib/tanstack/queryKeys';

export const useDeleteIncidentMutation = () => {
  const queryClient = useQueryClient();

  const removeIncidentFromList = (deletedId: string) => {
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(
        incidentQueryKeys.list(),
        currentIncidents.filter((incident) => incident.id !== deletedId)
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
    mutationFn: deleteIncident,
    onSuccess: (_, deletedId: string) => {
      removeIncidentFromList(deletedId);
      invalidateDashboard();
    },
    onError: (error) => {
      console.error('Failed to delete incident:', error);
      queryClient.invalidateQueries({ queryKey: incidentQueryKeys.all });
    }
  });
};
