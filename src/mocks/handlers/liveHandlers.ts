import { http, HttpResponse } from 'msw';
import {
  mockLiveAlerts,
  mockLiveChartData,
  mockRaceDetails,
  mockTrackMap
} from '../fixtures/mockLiveData';

export const liveHandlers = [
  http.get('/api/live/alerts', () => {
    return HttpResponse.json(mockLiveAlerts);
  }),

  http.get('/api/live/chart-data', () => {
    mockLiveChartData.timelineData = mockLiveChartData.timelineData.map((_, i) => ({
      time: new Date(Date.now() - i * 60000).toISOString(),
      incidents: Math.floor(Math.random() * 5),
      responseTime: Math.floor(Math.random() * 60) + 30,
      severity: Math.floor(Math.random() * 4),
      resolved: Math.floor(Math.random() * 3)
    }));
    return HttpResponse.json(mockLiveChartData);
  }),

  http.get('/api/live/race-details', () => {
    mockRaceDetails.currentLap = Math.min(
      mockRaceDetails.currentLap + 1,
      mockRaceDetails.totalLaps
    );
    return HttpResponse.json(mockRaceDetails);
  }),

  http.get('/api/live/track-map', () => {
    mockTrackMap.incidents = mockTrackMap.incidents.map((incident) => ({
      ...incident,
      x: Math.random() * 100,
      y: Math.random() * 100,
      timestamp: new Date()
    }));
    return HttpResponse.json(mockTrackMap);
  })
];
