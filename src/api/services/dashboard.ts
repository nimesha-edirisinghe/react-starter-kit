import { apiClient } from '../client';
import type {
  DashboardStats,
  RecentIncident,
  ChartData,
  TrendData,
  HourlyData,
  CircuitData,
  DashboardData
} from '../types/dashboard.types';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/dashboard/stats');
  return response.data;
};

export const getRecentIncidents = async (): Promise<RecentIncident[]> => {
  const response = await apiClient.get('/dashboard/recent-incidents');
  return response.data;
};

export const getSeverityData = async (): Promise<ChartData[]> => {
  const response = await apiClient.get('/dashboard/severity-data');
  return response.data;
};

export const getTrendData = async (): Promise<TrendData[]> => {
  const response = await apiClient.get('/dashboard/trend-data');
  return response.data;
};

export const getHourlyData = async (): Promise<HourlyData[]> => {
  const response = await apiClient.get('/dashboard/hourly-data');
  return response.data;
};

export const getCircuitData = async (): Promise<CircuitData[]> => {
  const response = await apiClient.get('/dashboard/circuit-data');
  return response.data;
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};
