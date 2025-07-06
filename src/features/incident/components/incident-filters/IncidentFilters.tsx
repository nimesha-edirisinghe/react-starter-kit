import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
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
      <CardHeader className="gap-0">
        <CardTitle>
          <FilterHeader
            activeFiltersCount={activeFiltersCount}
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            onReset={onReset}
            searchValue={filters.search}
            onSearchChange={(value) => handleFilterChange('search', value)}
            onSearchClear={() => removeFilter('search')}
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
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
