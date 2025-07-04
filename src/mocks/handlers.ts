import { authHandlers } from './handlers/authHandlers';
import { dashboardHandlers } from './handlers/dashboardHandlers';
import { incidentHandlers } from './handlers/incidentHandlers';
import { liveHandlers } from './handlers/liveHandlers';

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...incidentHandlers,
  ...liveHandlers
];
