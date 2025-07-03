import { useQuery } from '@tanstack/react-query';
import { getAlerts } from '~/api/services/alerts';
import type { LiveAlert } from '~/api/types/alerts.types';
import { liveQueryKeys } from '~/lib/tanstack/queryKeys';

export function useLiveAlertsQuery() {
  return useQuery<LiveAlert[]>({
    queryKey: liveQueryKeys.alerts(),
    queryFn: getAlerts,
    refetchInterval: 10000
  });
}
