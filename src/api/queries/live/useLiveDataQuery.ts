import { useQuery } from '@tanstack/react-query';
import { getChartData } from '~/api/services/live';
import { LiveChartData } from '~/api/types';

export function useLiveDataQuery() {
  return useQuery<LiveChartData>({
    queryKey: ['live', 'chart-data'],
    queryFn: getChartData,
    refetchInterval: 10000
  });
}
