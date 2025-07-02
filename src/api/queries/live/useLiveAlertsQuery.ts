import { useQuery } from '@tanstack/react-query';
import { getAlerts } from '~/api/services/alerts';
import type { LiveAlert } from '~/api/types/alerts.types';

export function useLiveAlertsQuery() {
  return useQuery<LiveAlert[]>({
    queryKey: ['liveAlerts'],
    queryFn: getAlerts,
    refetchInterval: 10000
  });
}
