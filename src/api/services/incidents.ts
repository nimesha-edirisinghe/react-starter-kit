import { apiClient } from '../client';
import { RacingIncident, IncidentFormData } from '~/features/incident/types/incident';

export const getIncidents = async (): Promise<RacingIncident[]> => {
  const response = await apiClient.get<RacingIncident[]>('/incidents');
  return response.data;
};

export const createIncident = async (data: IncidentFormData): Promise<RacingIncident> => {
  const response = await apiClient.post<RacingIncident>('/incidents', data);
  return response.data;
};

export const deleteIncident = async (id: string): Promise<void> => {
  await apiClient.delete(`/incidents/${id}`);
};

export const editIncident = async (data: {
  id: string;
  incident: IncidentFormData;
}): Promise<RacingIncident> => {
  const formattedData = {
    ...data.incident,
    drivers: data.incident.drivers.split(',').map((d) => d.trim()),
    teams: data.incident.teams.split(',').map((t) => t.trim()),
    lapNumber: parseInt(data.incident.lapNumber)
  };

  const response = await apiClient.put<RacingIncident>(`/incidents/${data.id}`, formattedData);
  return response.data;
};
