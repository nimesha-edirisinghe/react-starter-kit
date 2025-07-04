import { Table, TableBody } from '~/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';
import { IncidentFilters } from '../../types/incident-filters';
import { IncidentFiltersComponent } from '../incident-filters/IncidentFilters';
import { IncidentRow } from './IncidentRow';
import { IncidentTableHeader } from './IncidentTableHeader';
import { TableFooter } from './table-footer/TableFooter';
import { ErrorCard } from '~/components/common/ErrorCard';
import { LoadingCard } from '~/components/common/LoadingCard';

const ITEMS_PER_PAGE = 10;

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

  const [currentPage, setCurrentPage] = useState(1);

  const { data: incidents = [], error: fetchingError, isLoading, refetch } = useIncidentsQuery();

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

  const totalPages = Math.ceil(filteredIncidents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedIncidents = filteredIncidents.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const counts = useMemo(
    () => ({
      filtered: filteredIncidents.length,
      total: incidents.length,
      showing: paginatedIncidents.length,
      start: startIndex + 1,
      end: Math.min(endIndex, filteredIncidents.length)
    }),
    [filteredIncidents.length, incidents.length, paginatedIncidents.length, startIndex, endIndex]
  );

  if (fetchingError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ErrorCard
          title="Failed to Load Dashboard Stats"
          message={
            fetchingError?.message ||
            'Unable to fetch dashboard statistics. Please check your connection and try again.'
          }
          onRetry={() => refetch()}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LoadingCard />
      </div>
    );
  }

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
              Showing {counts.start}-{counts.end} of {counts.filtered} incidents
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
            <>
              <div className="overflow-x-auto min-w-full">
                <div className="inline-block min-w-full align-middle">
                  <Table>
                    <IncidentTableHeader />
                    <TableBody>
                      {paginatedIncidents.map((incident) => (
                        <IncidentRow key={incident.id} incident={incident} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {totalPages > 1 && (
                <TableFooter
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
