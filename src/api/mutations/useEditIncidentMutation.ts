import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editIncident } from '../services/incidents';
import { RacingIncident } from '~/features/incident/types/incident';

export const useEditIncidentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editIncident,
    onSuccess: (updatedIncident: RacingIncident) => {
      const currentIncidents = queryClient.getQueryData<RacingIncident[]>(['incidents']);
      if (currentIncidents) {
        queryClient.setQueryData<RacingIncident[]>(['incidents'], (oldData = []) => {
          return oldData.map((incident) =>
            incident.id === updatedIncident.id ? updatedIncident : incident
          );
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['incidents'] });
      }
    },
    onError: (error) => {
      console.error('Failed to edit incident:', error);
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    }
  });
};
