import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { IncidentFiltersComponent } from '../incident-filters/IncidentFilters';
import { ErrorCard } from '~/components/common/ErrorCard';
import { EmptyStatePanel } from './EmptyStatePanel';
import { LoadingTable } from './LoadingTable';
import { IncidentDataTable } from './IncidentDataTable';
import { TableTitle } from './TableTitle';
import { useIncidentTable } from '../../hooks/useIncidentTable';

export function IncidentTable() {
  const {
    filters,
    response,
    isLoading,
    fetchingError,
    refetch,
    handleFiltersChange,
    handleResetFilters,
    handlePageChange
  } = useIncidentTable();

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
          <TableTitle pagination={pagination} counts={counts} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingTable />
          ) : !incidents.length ? (
            <EmptyStatePanel />
          ) : (
            <IncidentDataTable
              incidents={incidents}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
