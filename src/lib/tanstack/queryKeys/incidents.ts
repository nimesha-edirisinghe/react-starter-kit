export const incidentQueryKeys = {
  // Base key for all incident queries
  all: ['incidents'] as const,

  // List of incidents with optional filters
  list: (filters?: Record<string, any>) =>
    filters
      ? ([...incidentQueryKeys.all, 'list', filters] as const)
      : ([...incidentQueryKeys.all, 'list'] as const),

  // Single incident by ID
  detail: (id: string | number) => [...incidentQueryKeys.all, 'detail', id] as const,

  // Incident statistics
  stats: () => [...incidentQueryKeys.all, 'stats'] as const,

  // Filtered incidents
  filtered: (params: Record<string, any>) => [...incidentQueryKeys.all, 'filtered', params] as const
} as const;
