import { http, HttpResponse } from 'msw';
import { incidentsData } from '../fixtures/mockIncidents';
import type { IncidentFormData, RacingIncident } from '~/features/incident/types/incident';

export const incidentHandlers = [
  http.get('/api/incidents', () => {
    return HttpResponse.json(incidentsData);
  }),

  http.post('/api/incidents', async ({ request }) => {
    try {
      const formData = (await request.json()) as IncidentFormData;

      const newIncident: RacingIncident = {
        id: `incident-${Date.now()}`,
        type: formData.type as RacingIncident['type'],
        raceCategory: formData.raceCategory as RacingIncident['raceCategory'],
        location: formData.location,
        circuit: formData.circuit || formData.location,
        severity: formData.severity as RacingIncident['severity'],
        drivers: formData.drivers ? formData.drivers.split(',').map((d) => d.trim()) : [],
        teams: formData.teams ? formData.teams.split(',').map((t) => t.trim()) : [],
        lapNumber: parseInt(formData.lapNumber) || 0,
        raceTime: formData.raceTime || '00:00:00',
        description: formData.description,
        timestamp: new Date().toISOString(),
        status: formData.status as RacingIncident['status'],
        stewardNotes: formData.stewardNotes
      };

      incidentsData.unshift(newIncident);

      await new Promise((resolve) => setTimeout(resolve, 500));

      return HttpResponse.json(newIncident, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: `Failed to create incident ${error}` }, { status: 400 });
    }
  }),

  http.put('/api/incidents/:id', async ({ request, params }) => {
    try {
      const { id } = params;
      const formData = (await request.json()) as any;

      const index = incidentsData.findIndex((incident) => incident.id === id);
      if (index === -1) {
        return new HttpResponse('Incident not found', { status: 404 });
      }

      const processArrayOrString = (value: string | string[]): string[] => {
        if (Array.isArray(value)) {
          return value.filter(Boolean);
        }
        return value
          ? value
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
          : [];
      };

      const updatedIncident: RacingIncident = {
        ...incidentsData[index],
        type: formData.type as RacingIncident['type'],
        raceCategory: formData.raceCategory as RacingIncident['raceCategory'],
        location: formData.location,
        circuit: formData.circuit || formData.location,
        severity: formData.severity as RacingIncident['severity'],
        drivers: processArrayOrString(formData.drivers),
        teams: processArrayOrString(formData.teams),
        lapNumber:
          typeof formData.lapNumber === 'number'
            ? formData.lapNumber
            : parseInt(formData.lapNumber) || 0,
        raceTime: formData.raceTime || '00:00:00',
        description: formData.description,
        status: formData.status as RacingIncident['status'],
        stewardNotes: formData.stewardNotes
      };

      incidentsData[index] = updatedIncident;

      await new Promise((resolve) => setTimeout(resolve, 500));

      return HttpResponse.json(updatedIncident);
    } catch (error) {
      console.error('Edit incident error:', error);
      return HttpResponse.json({ error: `Failed to update incident ${error}` }, { status: 400 });
    }
  }),

  http.delete('/api/incidents/:id', ({ params }) => {
    try {
      const { id } = params;
      const index = incidentsData.findIndex((incident) => incident.id === id);

      if (index === -1) {
        return new HttpResponse('Incident not found', { status: 404 });
      }

      incidentsData.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      return HttpResponse.json({ error: `Failed to delete incident ${error}` }, { status: 400 });
    }
  })
];
