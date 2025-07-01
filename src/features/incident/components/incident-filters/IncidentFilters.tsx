'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { SearchFilter } from './SearchFilter';
import { FilterHeader } from './FilterHeader';
import { AdvancedFilters } from './AdvancedFilters';
import { ActiveFilters } from './ActiveFilters';
import { useIncidentFilters } from '../../hooks/useIncidentFilters';
import { IncidentFilters, IncidentFiltersProps } from '../../types/incident-filters';

export function IncidentFiltersComponent({
  filters,
  onFiltersChange,
  onReset
}: Omit<IncidentFiltersProps, 'onAddIncident'>) {
  const { showAdvanced, setShowAdvanced, getActiveFiltersCount, formatFilterValue } =
    useIncidentFilters();

  const handleFilterChange = (key: keyof IncidentFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof IncidentFilters) => {
    handleFilterChange(key, '');
  };

  const activeFiltersCount = getActiveFiltersCount(filters);

  return (
    <Card className="w-full flex flex-col gap-1">
      <CardHeader>
        <CardTitle>
          <FilterHeader
            activeFiltersCount={activeFiltersCount}
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            onReset={onReset}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SearchFilter
          value={filters.search}
          onChange={(value) => handleFilterChange('search', value)}
          onClear={() => removeFilter('search')}
        />

        {showAdvanced && <AdvancedFilters filters={filters} onFilterChange={handleFilterChange} />}

        {activeFiltersCount > 0 && (
          <ActiveFilters
            filters={filters}
            activeFiltersCount={activeFiltersCount}
            onRemoveFilter={removeFilter}
            formatFilterValue={formatFilterValue}
          />
        )}
      </CardContent>
    </Card>
  );
}
