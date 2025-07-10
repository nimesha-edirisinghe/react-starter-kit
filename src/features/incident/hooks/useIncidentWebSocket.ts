import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { webSocketService } from '~/services/websocket.service';
import { RacingIncident } from '../types/incident';
import { incidentQueryKeys, dashboardQueryKeys, liveQueryKeys } from '~/lib/tanstack/queryKeys';
import { IncidentsResponse } from '~/api/services/incidents';
import { useUrlParams } from './useUrlParams';

export const useIncidentWebSocket = () => {
  const queryClient = useQueryClient();
  const { getUrlParams } = useUrlParams();

  const invalidateQueries = () => {
    // Invalidate dashboard queries
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.stats() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.recentIncidents() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.charts.severity() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.charts.trend() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.charts.hourly() });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.charts.circuit() });

    // Invalidate live queries
    queryClient.invalidateQueries({ queryKey: liveQueryKeys.alerts() });
    queryClient.invalidateQueries({ queryKey: liveQueryKeys.chartData() });
    queryClient.invalidateQueries({ queryKey: liveQueryKeys.trackMap() });
    queryClient.invalidateQueries({ queryKey: liveQueryKeys.raceDetails() });
  };

  const handleIncidentCreated = (newIncident: RacingIncident) => {
    // Update unfiltered list
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(incidentQueryKeys.list(), [
        newIncident,
        ...currentIncidents
      ]);
    }

    // Update filtered lists and handle pagination
    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          // Check if the incident matches the current filters
          const { category, severity, status, type, circuit, location } = getUrlParams();
          const matchesFilters =
            (!category || newIncident.raceCategory === category) &&
            (!severity || newIncident.severity === severity) &&
            (!status || newIncident.status === status) &&
            (!type || newIncident.type === type) &&
            (!circuit || newIncident.circuit === circuit) &&
            (!location || newIncident.location === location);

          if (matchesFilters) {
            const newTotal = data.pagination.total + 1;
            const newFiltered = data.pagination.filtered + 1;
            const itemsPerPage = data.pagination.limit;
            const newTotalPages = Math.ceil(newFiltered / itemsPerPage);

            // Add the new incident to the first page only
            const updatedIncidents =
              data.pagination.page === 1
                ? [newIncident, ...data.incidents.slice(0, itemsPerPage - 1)]
                : data.incidents;

            queryClient.setQueryData<IncidentsResponse>(queryKey, {
              ...data,
              incidents: updatedIncidents,
              pagination: {
                ...data.pagination,
                total: newTotal,
                filtered: newFiltered,
                totalPages: newTotalPages
              },
              counts: {
                ...data.counts,
                total: newTotal,
                filtered: newFiltered,
                showing: updatedIncidents.length
              }
            });
          }
        }
      });

    // Invalidate all queries
    invalidateQueries();
  };

  const handleIncidentUpdated = (updatedIncident: RacingIncident) => {
    // Update unfiltered list
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(
        incidentQueryKeys.list(),
        currentIncidents.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident
        )
      );
    }

    // Update filtered lists and handle pagination
    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          // Check if the incident still matches the current filters
          const { category, severity, status, type, circuit, location } = getUrlParams();
          const matchesFilters =
            (!category || updatedIncident.raceCategory === category) &&
            (!severity || updatedIncident.severity === severity) &&
            (!status || updatedIncident.status === status) &&
            (!type || updatedIncident.type === type) &&
            (!circuit || updatedIncident.circuit === circuit) &&
            (!location || updatedIncident.location === location);

          const updatedIncidents = data.incidents
            .map((incident) =>
              incident.id === updatedIncident.id
                ? matchesFilters
                  ? updatedIncident
                  : null
                : incident
            )
            .filter((incident): incident is RacingIncident => incident !== null);

          queryClient.setQueryData<IncidentsResponse>(queryKey, {
            ...data,
            incidents: updatedIncidents,
            pagination: {
              ...data.pagination,
              filtered: matchesFilters ? data.pagination.filtered : data.pagination.filtered - 1
            },
            counts: {
              ...data.counts,
              filtered: matchesFilters ? data.counts.filtered : data.counts.filtered - 1,
              showing: updatedIncidents.length
            }
          });
        }
      });

    // Invalidate all queries
    invalidateQueries();
  };

  const handleIncidentDeleted = (deletedId: string) => {
    // Update unfiltered list
    const currentIncidents = queryClient.getQueryData<RacingIncident[]>(incidentQueryKeys.list());
    if (currentIncidents) {
      queryClient.setQueryData<RacingIncident[]>(
        incidentQueryKeys.list(),
        currentIncidents.filter((incident) => incident.id !== deletedId)
      );
    }

    // Update filtered lists and handle pagination
    queryClient
      .getQueriesData<IncidentsResponse>({
        queryKey: ['incidents', 'filtered']
      })
      .forEach(([queryKey, data]) => {
        if (data) {
          const updatedIncidents = data.incidents.filter((incident) => incident.id !== deletedId);
          const newTotal = data.pagination.total - 1;
          const newFiltered = data.pagination.filtered - 1;

          queryClient.setQueryData<IncidentsResponse>(queryKey, {
            ...data,
            incidents: updatedIncidents,
            pagination: {
              ...data.pagination,
              total: newTotal,
              filtered: newFiltered,
              totalPages: Math.ceil(newFiltered / data.pagination.limit)
            },
            counts: {
              ...data.counts,
              total: newTotal,
              filtered: newFiltered,
              showing: updatedIncidents.length
            }
          });
        }
      });

    // Invalidate all queries
    invalidateQueries();
  };

  useEffect(() => {
    // Connect to WebSocket server
    webSocketService.connect();

    // Add event listeners
    webSocketService.addListener('incidentCreated', handleIncidentCreated);
    webSocketService.addListener('incidentUpdated', handleIncidentUpdated);
    webSocketService.addListener('incidentDeleted', handleIncidentDeleted);

    // Cleanup on unmount
    return () => {
      webSocketService.removeListener('incidentCreated', handleIncidentCreated);
      webSocketService.removeListener('incidentUpdated', handleIncidentUpdated);
      webSocketService.removeListener('incidentDeleted', handleIncidentDeleted);
      webSocketService.disconnect();
    };
  }, []);
};
