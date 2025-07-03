import { useQuery } from '@tanstack/react-query';
import { getRaceDetails } from '~/api/services/live';
import { liveQueryKeys } from '~/lib/tanstack/queryKeys';

export const useRaceDetailsQuery = () => {
  return useQuery({
    queryKey: liveQueryKeys.raceDetails(),
    queryFn: getRaceDetails
    // refetchInterval: 1000
  });
};
