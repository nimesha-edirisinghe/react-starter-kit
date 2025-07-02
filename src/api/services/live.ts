import { apiClient } from '../client';
import type { RaceDetails, LiveData, TrackMapResponse, LiveChartData } from '../types/live.types';
import type { LiveAlert } from '../types/alerts.types';

export const getLiveAlerts = async (): Promise<LiveAlert[]> => {
  const response = await apiClient.get<LiveAlert[]>('/live/alerts');
  return response.data;
};

export const getRaceDetails = async (): Promise<RaceDetails> => {
  const response = await apiClient.get<RaceDetails>('/live/race-details');
  return response.data;
};

export const getLiveData = async (): Promise<LiveData> => {
  const response = await apiClient.get<LiveData>('/live/data');
  return response.data;
};

export const getTrackMapData = async (): Promise<TrackMapResponse> => {
  const response = await apiClient.get<TrackMapResponse>('/live/track-map');
  return response.data;
};

export const getChartData = async (): Promise<LiveChartData> => {
  const response = await apiClient.get<LiveChartData>('/live/chart-data');
  return response.data;
};
