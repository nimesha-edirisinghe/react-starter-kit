// Application query keys
import { dashboardQueryKeys } from './dashboard';
import { incidentQueryKeys } from './incidents';
import { liveQueryKeys } from './live';
import { authQueryKeys } from './auth';

export const queryKeys = {
  // Application query keys
  dashboard: dashboardQueryKeys,
  incidents: incidentQueryKeys,
  live: liveQueryKeys,
  auth: authQueryKeys
} as const;

// Export individual query key factories for direct imports
export { dashboardQueryKeys } from './dashboard';
export { incidentQueryKeys } from './incidents';
export { liveQueryKeys } from './live';
export { authQueryKeys } from './auth';
