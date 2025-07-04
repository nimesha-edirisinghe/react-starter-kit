import { useQuery } from '@tanstack/react-query';
import { getChartData } from '~/api/services/live';
import { LiveChartData } from '~/api/types';
import { liveQueryKeys } from '~/lib/tanstack/queryKeys';

export function useLiveDataQuery() {
  return useQuery<LiveChartData>({
    queryKey: liveQueryKeys.chartData(),
    queryFn: getChartData,
    refetchInterval: 10000
  });
}
