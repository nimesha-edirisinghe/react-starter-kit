export const liveQueryKeys = {
  // Base key for all live queries
  all: ['live'] as const,

  // Live chart data
  chartData: () => [...liveQueryKeys.all, 'chart-data'] as const,

  // Live alerts
  alerts: () => [...liveQueryKeys.all, 'alerts'] as const,

  // Race details
  raceDetails: () => [...liveQueryKeys.all, 'race-details'] as const,

  // Track map data
  trackMap: () => [...liveQueryKeys.all, 'track-map'] as const,

  // Live feed data
  feed: () => [...liveQueryKeys.all, 'feed'] as const,

  // Live race status
  raceStatus: () => [...liveQueryKeys.all, 'race-status'] as const,

  // Session-specific data
  session: (sessionId: string) => [...liveQueryKeys.all, 'session', sessionId] as const
} as const;
