import { useQuery } from '@tanstack/react-query';
import { getTrackMapData } from '~/api/services/live';
import { liveQueryKeys } from '~/lib/tanstack/queryKeys';

export const useTrackMapQuery = () => {
  return useQuery({
    queryKey: liveQueryKeys.trackMap(),
    queryFn: getTrackMapData,
    refetchInterval: 10000
  });
};
