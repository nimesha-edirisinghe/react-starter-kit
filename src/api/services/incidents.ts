import { RacingIncident, IncidentFormData } from '~/features/incident/types/incident';
import { apiClient } from '../client';

// API function - GET endpoint
export const getIncidents = async (): Promise<RacingIncident[]> => {
  const response = await apiClient.get('/api/incidents');
  return response.data;
};

// API function - POST endpoint for creating incidents
export const createIncident = async (incidentData: IncidentFormData): Promise<RacingIncident> => {
  const response = await apiClient.post('/api/incidents', incidentData);
  return response.data;
};
