'use client';

import { Table, TableBody } from '~/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useState, useMemo, useCallback } from 'react';
import { useIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';
import { IncidentFilters } from '../../types/incident-filters';
import { IncidentFiltersComponent } from '../incident-filters/IncidentFilters';
import { IncidentRow } from './IncidentRow';
import { IncidentTableHeader } from './IncidentTableHeader';

export function IncidentTable() {
  const [filters, setFilters] = useState<IncidentFilters>({
    search: '',
    category: '',
    severity: '',
    status: '',
    type: '',
    circuit: '',
    location: ''
  });

  const { data: incidents = [] } = useIncidentsQuery();

  const searchableIncidents = useMemo(() => {
    return incidents.map((incident) => ({
      ...incident,
      searchableText: [
        incident.description,
        incident.circuit,
        incident.location,
        ...incident.drivers,
        ...incident.teams,
        incident.type.replace('_', ' ')
      ]
        .join(' ')
        .toLowerCase()
    }));
  }, [incidents]);

  const filteredIncidents = useMemo(() => {
    if (!searchableIncidents.length) return [];

    const { search, category, severity, status, type, location } = filters;

    const hasActiveFilters = search || category || severity || status || type || location;
    if (!hasActiveFilters) {
      return searchableIncidents;
    }

    const searchTerm = search.toLowerCase();

    return searchableIncidents.filter((incident) => {
      if (category && incident.raceCategory !== category) return false;
      if (type && incident.type !== type) return false;
      if (severity && incident.severity !== severity) return false;
      if (status && incident.status !== status) return false;
      if (location && incident.location !== location) return false;

      if (search && !incident.searchableText.includes(searchTerm)) return false;

      return true;
    });
  }, [searchableIncidents, filters]);

  const handleFiltersChange = useCallback((newFilters: IncidentFilters) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      severity: '',
      status: '',
      type: '',
      circuit: '',
      location: ''
    });
  }, []);

  const counts = useMemo(
    () => ({
      filtered: filteredIncidents.length,
      total: incidents.length
    }),
    [filteredIncidents.length, incidents.length]
  );

  return (
    <>
      <IncidentFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Incidents</span>
            <div className="text-sm text-slate-600">
              Showing {counts.filtered} of {counts.total} incidents
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {counts.filtered === 0 ? (
            <div className="text-center py-8">
              <div className="text-slate-500 mb-2">No incidents found</div>
              <div className="text-sm text-slate-400">
                Try adjusting your filters to see more results
              </div>
            </div>
          ) : (
            <Table>
              <IncidentTableHeader />
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <IncidentRow key={incident.id} incident={incident} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
