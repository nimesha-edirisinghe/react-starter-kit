'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { useState, useMemo } from 'react';
import { mockIncidents } from '~/mocks/fixtures/mockIncidents';
import { IncidentFilters, IncidentFiltersComponent } from './IncidentFilters';

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

  // Filter incidents based on current filters
  const filteredIncidents = useMemo(() => {
    return mockIncidents.filter((incident) => {
      // Search filter - searches in description, drivers, teams, circuit, and location
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = [
          incident.description,
          incident.circuit,
          incident.location,
          ...incident.drivers,
          ...incident.teams,
          incident.type.replace('_', ' ')
        ]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      // Category filter
      if (filters.category && incident.raceCategory !== filters.category) {
        return false;
      }

      // Type filter
      if (filters.type && incident.type !== filters.type) {
        return false;
      }

      // Severity filter
      if (filters.severity && incident.severity !== filters.severity) {
        return false;
      }

      // Status filter
      if (filters.status && incident.status !== filters.status) {
        return false;
      }

      // Location filter - NEW
      if (filters.location && incident.location !== filters.location) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFiltersChange = (newFilters: IncidentFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      severity: '',
      status: '',
      type: '',
      circuit: '',
      location: ''
    });
  };

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
              Showing {filteredIncidents.length} of {mockIncidents.length} incidents
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredIncidents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-slate-500 mb-2">No incidents found</div>
              <div className="text-sm text-slate-400">
                Try adjusting your filters to see more results
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Drivers</TableHead>
                  <TableHead>Lap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">#{incident.id}</TableCell>
                    <TableCell>
                      {incident.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{incident.raceCategory}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{incident.circuit}</div>
                        <div className="text-sm text-slate-500">{incident.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {incident.drivers.slice(0, 2).map((driver, index) => (
                          <div key={index} className="text-sm">
                            {driver}
                          </div>
                        ))}
                        {incident.drivers.length > 2 && (
                          <div className="text-xs text-slate-500">
                            +{incident.drivers.length - 2} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{incident.lapNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
