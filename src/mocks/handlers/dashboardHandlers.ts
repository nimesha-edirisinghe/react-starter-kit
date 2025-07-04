import { http, HttpResponse } from 'msw';
import { mockIncidents, getIncidentsBySeverity } from '../fixtures/mockIncidents';
import {
  generateCircuitData,
  generateHourlyData,
  generateTrendData
} from '~/features/dashboard/components/incident-charts/utils/dataGenerators';
import { SEVERITY_COLORS } from '~/features/dashboard/components/incident-charts/utils/constants';

export const dashboardHandlers = [
  // Get dashboard stats
  http.get('/api/dashboard/stats', () => {
    const totalIncidents = mockIncidents.length;
    const investigating = mockIncidents.filter((i) => i.status === 'investigating').length;
    const resolved = mockIncidents.filter((i) => i.status === 'resolved').length;
    const pending = mockIncidents.filter((i) => i.status === 'pending').length;

    return HttpResponse.json({
      totalIncidents,
      investigating,
      resolved,
      pending
    });
  }),

  // Get recent incidents
  http.get('/api/dashboard/recent-incidents', () => {
    const recentIncidents = mockIncidents.slice(0, 5);
    return HttpResponse.json(recentIncidents);
  }),

  // Get severity data for charts
  http.get('/api/dashboard/severity-data', () => {
    const severityData = getIncidentsBySeverity().map((item) => ({
      ...item,
      fill: SEVERITY_COLORS[item.name as keyof typeof SEVERITY_COLORS] || '#64748b'
    }));
    return HttpResponse.json(severityData);
  }),

  // Get trend data
  http.get('/api/dashboard/trend-data', () => {
    const trendData = generateTrendData();
    return HttpResponse.json(trendData);
  }),

  // Get hourly data
  http.get('/api/dashboard/hourly-data', () => {
    const hourlyData = generateHourlyData();
    return HttpResponse.json(hourlyData);
  }),

  // Get circuit data
  http.get('/api/dashboard/circuit-data', () => {
    const circuitData = generateCircuitData();
    return HttpResponse.json(circuitData);
  }),

  // Get all dashboard data in one request
  http.get('/api/dashboard', () => {
    const totalIncidents = mockIncidents.length;
    const investigating = mockIncidents.filter((i) => i.status === 'investigating').length;
    const resolved = mockIncidents.filter((i) => i.status === 'resolved').length;
    const pending = mockIncidents.filter((i) => i.status === 'pending').length;

    const stats = {
      totalIncidents,
      investigating,
      resolved,
      pending
    };

    const recentIncidents = mockIncidents.slice(0, 5);
    const severityData = getIncidentsBySeverity().map((item) => ({
      ...item,
      fill: SEVERITY_COLORS[item.name as keyof typeof SEVERITY_COLORS] || '#64748b'
    }));
    const trendData = generateTrendData();
    const hourlyData = generateHourlyData();
    const circuitData = generateCircuitData();

    return HttpResponse.json({
      stats,
      recentIncidents,
      severityData,
      trendData,
      hourlyData,
      circuitData
    });
  })
];
