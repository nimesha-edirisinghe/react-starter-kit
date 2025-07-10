import { FilterSelect } from './FilterSelect';
import { IncidentFilters } from '../../types/incident-filters';
import { useIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';
import { useFilterOptions } from '../../hooks/useFilterOptions';
import { memo } from 'react';

interface AdvancedFiltersProps {
  filters: IncidentFilters;
  onFilterChange: (key: keyof IncidentFilters, value: string) => void;
}

const AdvancedFilters = memo(function AdvancedFilters({
  filters,
  onFilterChange
}: AdvancedFiltersProps) {
  const { data: incidents, isLoading } = useIncidentsQuery();
  const { filterOptions } = useFilterOptions(Array.isArray(incidents) ? incidents : []);

  return (
    <div className="space-y-2 animate-in slide-in-from-top-2 duration-200 mt-2">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-4">
        Advanced Filters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-3">
        <FilterSelect
          value={filters.type}
          placeholder="All Types"
          options={filterOptions.type}
          onChange={(value) => onFilterChange('type', value)}
          disabled={isLoading}
        />

        <FilterSelect
          value={filters.category}
          placeholder="All Categories"
          options={filterOptions.category}
          onChange={(value) => onFilterChange('category', value)}
          disabled={isLoading}
        />

        <FilterSelect
          value={filters.circuit}
          placeholder="All Circuits"
          options={filterOptions.circuit}
          onChange={(value) => onFilterChange('circuit', value)}
          disabled={isLoading}
        />

        <FilterSelect
          value={filters.location}
          placeholder="All Locations"
          options={filterOptions.location}
          onChange={(value) => onFilterChange('location', value)}
          disabled={isLoading}
        />

        <FilterSelect
          value={filters.severity}
          placeholder="All Severities"
          options={filterOptions.severity}
          onChange={(value) => onFilterChange('severity', value)}
          disabled={isLoading}
        />

        <FilterSelect
          value={filters.status}
          placeholder="All Statuses"
          options={filterOptions.status}
          onChange={(value) => onFilterChange('status', value)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
});

export { AdvancedFilters };
