export const dashboardQueryKeys = {
  // Base key for all dashboard queries
  all: ['dashboard'] as const,

  // Main dashboard data
  data: () => [...dashboardQueryKeys.all, 'data'] as const,

  // Dashboard statistics
  stats: () => [...dashboardQueryKeys.all, 'stats'] as const,

  // Recent incidents on dashboard
  recentIncidents: () => [...dashboardQueryKeys.all, 'recent-incidents'] as const,

  // Chart data keys
  charts: {
    all: () => [...dashboardQueryKeys.all, 'charts'] as const,
    severity: () => [...dashboardQueryKeys.charts.all(), 'severity-data'] as const,
    trend: () => [...dashboardQueryKeys.charts.all(), 'trend-data'] as const,
    hourly: () => [...dashboardQueryKeys.charts.all(), 'hourly-data'] as const,
    circuit: () => [...dashboardQueryKeys.charts.all(), 'circuit-data'] as const
  }
} as const;
