import { RacingIncident } from '~/features/incident/types/incident';
import { apiClient } from '../client';

// API function - only GET endpoint
export const getIncidents = async (): Promise<RacingIncident[]> => {
  const response = await apiClient.get('/api/incidents');
  return response.data;
};
