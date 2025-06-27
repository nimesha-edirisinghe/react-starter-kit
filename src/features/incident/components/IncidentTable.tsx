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
import { Button } from '~/components/ui/button';
import { Eye, Edit, MoreHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { IncidentFiltersComponent, type IncidentFilters } from './IncidentFilters';
import { mockIncidents, RacingIncident } from '~/mocks/fixtures/mockIncidents';
import { ViewIncidentModal } from './ViewIncidentModal';
import { EditIncidentModal } from './EditIncidentModal';
import { getSeverityColor } from '../../../utils/utilsGetSeverityColor';
import { getStatusColor } from '../../../utils/utilsGetStatusColor';

export function IncidentTable() {
  const [selectedIncident, setSelectedIncident] = useState<RacingIncident | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [filters, setFilters] = useState<IncidentFilters>({
    search: '',
    category: '',
    severity: '',
    status: '',
    type: '',
    circuit: ''
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

      return true;
    });
  }, [filters]);

  const handleViewIncident = (incident: RacingIncident) => {
    setSelectedIncident(incident);
    setViewModalOpen(true);
  };

  const handleEditIncident = (incident: RacingIncident) => {
    setSelectedIncident(incident);
    setEditModalOpen(true);
  };

  const handleSaveIncident = (updatedIncident: RacingIncident) => {
    // In a real app, this would update the incident in the database
    console.log('Saving incident:', updatedIncident);
    setEditModalOpen(false);
    setSelectedIncident(null);
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
      circuit: ''
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
                  <TableHead>Actions</TableHead>
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewIncident(incident)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditIncident(incident)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Incident
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ViewIncidentModal
        incident={selectedIncident}
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />

      <EditIncidentModal
        incident={selectedIncident}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSave={handleSaveIncident}
      />
    </>
  );
}
