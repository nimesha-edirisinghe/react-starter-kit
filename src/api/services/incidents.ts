import { apiClient } from '../client';
import type { RacingIncident, IncidentFormData } from '../types/incidents.types';

export const getIncidents = async (): Promise<RacingIncident[]> => {
  const response = await apiClient.get('/incidents');
  return response.data;
};

export const createIncident = async (incidentData: IncidentFormData): Promise<RacingIncident> => {
  const response = await apiClient.post('/incidents', incidentData);
  return response.data;
};
