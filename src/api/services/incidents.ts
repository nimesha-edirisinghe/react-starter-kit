import { apiClient } from '../client';
import { RacingIncident, IncidentFormData } from '~/features/incident/types/incident';

// Types for API requests
export interface IncidentSearchParams {
  search?: string;
  category?: string;
  severity?: string;
  status?: string;
  type?: string;
  circuit?: string;
  location?: string;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  filtered: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IncidentsResponse {
  incidents: RacingIncident[];
  pagination: PaginationInfo;
  counts: {
    total: number;
    filtered: number;
    showing: number;
  };
}

// Updated function to get incidents with optional search and filter parameters
export const getIncidents = async (
  params?: IncidentSearchParams
): Promise<RacingIncident[] | IncidentsResponse> => {
  if (!params || Object.keys(params).length === 0) {
    const response = await apiClient.get<RacingIncident[]>('/incidents');
    return response.data;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  const url = queryString ? `/incidents?${queryString}` : '/incidents';

  const response = await apiClient.get<IncidentsResponse>(url);
  return response.data;
};

export const getFilteredIncidents = async (
  params: IncidentSearchParams
): Promise<IncidentsResponse> => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  const url = queryString ? `/incidents?${queryString}` : '/incidents?page=1&limit=10';

  const response = await apiClient.get<IncidentsResponse>(url);
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
