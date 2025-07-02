import { useQuery } from '@tanstack/react-query';
import { getRaceDetails } from '~/api/services/live';

export const useRaceDetailsQuery = () => {
  return useQuery({
    queryKey: ['race-details'],
    queryFn: getRaceDetails
    // refetchInterval: 1000
  });
};
