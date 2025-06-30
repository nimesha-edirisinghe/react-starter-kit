'use client';

import { Settings } from 'lucide-react';
import { FilterSelect } from './FilterSelect';
import { IncidentFilters } from '../../types/incident-filters';
import { useIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';
import { useFilterOptions } from '../../hooks/useFilterOptions';

interface AdvancedFiltersProps {
  filters: IncidentFilters;
  onFilterChange: (key: keyof IncidentFilters, value: string) => void;
}

export function AdvancedFilters({ filters, onFilterChange }: AdvancedFiltersProps) {
  const { data: incidents, isLoading } = useIncidentsQuery();
  const { filterOptions } = useFilterOptions(incidents);

  if (isLoading) {
    return (
      <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Advanced Filters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 animate-pulse rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-4">
        <Settings className="h-4 w-4" />
        Advanced Filters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        <FilterSelect
          value={filters.category}
          placeholder="All Categories"
          options={filterOptions.category}
          onChange={(value) => onFilterChange('category', value)}
        />
        <FilterSelect
          value={filters.severity}
          placeholder="All Severities"
          options={filterOptions.severity}
          onChange={(value) => onFilterChange('severity', value)}
        />
        <FilterSelect
          value={filters.type}
          placeholder="All Types"
          options={filterOptions.type}
          onChange={(value) => onFilterChange('type', value)}
        />
        <FilterSelect
          value={filters.status}
          placeholder="All Statuses"
          options={filterOptions.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        <FilterSelect
          value={filters.location}
          placeholder="All Locations"
          options={filterOptions.location}
          onChange={(value) => onFilterChange('location', value)}
        />
      </div>
    </div>
  );
}
