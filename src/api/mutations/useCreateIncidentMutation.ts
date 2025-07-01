import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';

export const useCreateIncidentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: (newIncident: RacingIncident) => {
      const currentIncidents = queryClient.getQueryData<RacingIncident[]>(['incidents']);
      if (currentIncidents) {
        queryClient.setQueryData<RacingIncident[]>(['incidents'], (oldData = []) => {
          return [newIncident, ...oldData];
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['incidents'] });
      }
    },

    onError: (error) => {
      console.error('Failed to create incident:', error);
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    }
  });
};
