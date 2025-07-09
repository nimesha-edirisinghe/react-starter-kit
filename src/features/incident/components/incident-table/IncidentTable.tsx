import { Table, TableBody } from '~/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useState, useCallback, useMemo, useRef } from 'react';
import { useFilteredIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';
import { IncidentSearchParams } from '~/api/services/incidents';
import { IncidentFilters } from '../../types/incident-filters';
import { IncidentFiltersComponent } from '../incident-filters/IncidentFilters';
import { IncidentRow } from './IncidentRow';
import { IncidentTableHeader } from './IncidentTableHeader';
import { TableFooter } from './table-footer/TableFooter';
import { ErrorCard } from '~/components/common/ErrorCard';
import { useUrlParams } from '../../hooks/useUrlParams';

const ITEMS_PER_PAGE = 10;

export function IncidentTable() {
  const { getUrlParams, updateUrlParams } = useUrlParams();
  const { search, category, severity, status, type, location, page: urlPage } = getUrlParams();

  // Use ref to track if we're in the middle of a filter update
  const isUpdatingRef = useRef(false);

  const initialFilters = useMemo(
    () => ({
      search,
      category,
      severity,
      status,
      type,
      circuit: '',
      location
    }),
    [search, category, severity, status, type, location]
  );

  const [filters, setFilters] = useState<IncidentFilters>(initialFilters);

  // Update local filters when URL params change (e.g., browser back/forward)
  const prevUrlParamsRef = useRef(initialFilters);
  if (
    JSON.stringify(prevUrlParamsRef.current) !== JSON.stringify(initialFilters) &&
    !isUpdatingRef.current
  ) {
    setFilters(initialFilters);
    prevUrlParamsRef.current = initialFilters;
  }

  // Convert frontend filters to API search params (use actual search from URL for API call)
  const searchParams: IncidentSearchParams = useMemo(
    () => ({
      search: search || undefined,
      category: category || undefined,
      severity: severity || undefined,
      status: status || undefined,
      type: type || undefined,
      location: location || undefined,
      page: urlPage,
      limit: ITEMS_PER_PAGE
    }),
    [search, category, severity, status, type, location, urlPage]
  );

  // Use the filtered query hook
  const {
    data: response,
    error: fetchingError,
    isLoading,
    refetch
  } = useFilteredIncidentsQuery(searchParams);

  // Update URL when filters change
  const handleFiltersChange = useCallback(
    (newFilters: IncidentFilters) => {
      isUpdatingRef.current = true;
      setFilters(newFilters);

      const isSearchChange = newFilters.search !== filters.search;
      const isOtherFilterChange = Object.keys(newFilters).some(
        (key) =>
          key !== 'search' &&
          newFilters[key as keyof IncidentFilters] !== filters[key as keyof IncidentFilters]
      );

      if (isSearchChange) {
        updateUrlParams(newFilters, 1, false);
      } else if (isOtherFilterChange) {
        updateUrlParams(newFilters, urlPage, true);
      }

      // Reset the updating flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    },
    [filters, updateUrlParams, urlPage]
  );

  const handleResetFilters = useCallback(() => {
    const emptyFilters: IncidentFilters = {
      search: '',
      category: '',
      severity: '',
      status: '',
      type: '',
      circuit: '',
      location: ''
    };
    isUpdatingRef.current = true;
    setFilters(emptyFilters);
    updateUrlParams(emptyFilters, 1, true);
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  }, [updateUrlParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlParams(filters, page, true);
    },
    [filters, updateUrlParams]
  );

  if (fetchingError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ErrorCard
          title="Failed to Load Incidents"
          message={
            fetchingError?.message ||
            'Unable to fetch incidents. Please check your connection and try again.'
          }
          onRetry={() => refetch()}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Handle the response data
  const incidents = response?.incidents || [];
  const pagination = response?.pagination;
  const counts = response?.counts;

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
              {pagination && counts && (
                <>
                  Showing {(pagination.page - 1) * pagination.limit + 1}-
                  {Math.min(pagination.page * pagination.limit, counts.filtered)} of{' '}
                  {counts.filtered} incidents
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!incidents.length ? (
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
                      {incidents.map((incident) => (
                        <IncidentRow key={incident.id} incident={incident} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {pagination && pagination.totalPages > 1 && (
                <TableFooter
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
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
