import { useQuery } from '@tanstack/react-query';
import { getTrackMapData } from '~/api/services/live';

export const useTrackMapQuery = () => {
  return useQuery({
    queryKey: ['track-map'],
    queryFn: getTrackMapData,
    refetchInterval: 10000
  });
};
