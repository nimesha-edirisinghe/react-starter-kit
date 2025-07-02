import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';

export const useDeleteIncidentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIncident,
    onSuccess: (_, deletedId) => {
      const currentIncidents = queryClient.getQueryData<RacingIncident[]>(['incidents']);
      if (currentIncidents) {
        queryClient.setQueryData<RacingIncident[]>(['incidents'], (oldData = []) => {
          return oldData.filter((incident) => incident.id !== deletedId);
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['incidents'] });
      }
    },
    onError: (error) => {
      console.error('Failed to delete incident:', error);
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    }
  });
};
