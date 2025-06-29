import { http, HttpResponse } from 'msw';
import { mockIncidents } from '../fixtures/mockIncidents';

export const incidentHandlers = [
  http.get('/api/incidents', () => {
    return HttpResponse.json(mockIncidents);
  })
];
