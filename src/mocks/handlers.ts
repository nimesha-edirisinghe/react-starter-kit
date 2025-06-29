import { authHandlers } from './handlers/authHandlers';
import { dashboardHandlers } from './handlers/dashboardHandlers';
import { incidentHandlers } from './handlers/incidentHandlers';

export const handlers = [...authHandlers, ...dashboardHandlers, ...incidentHandlers];
