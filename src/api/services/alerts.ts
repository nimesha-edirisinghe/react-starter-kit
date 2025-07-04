import { apiClient } from '../client';
import type { LiveAlert } from '../types/alerts.types';

export const getAlerts = async (): Promise<LiveAlert[]> => {
  const response = await apiClient.get('/live/alerts');
  return response.data;
};
