import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { FilterHeader } from './FilterHeader';
import { AdvancedFilters } from './AdvancedFilters';
import { ActiveFilters } from './ActiveFilters';
import { useIncidentFilters } from '../../hooks/useIncidentFilters';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import { IncidentFilters, IncidentFiltersProps } from '../../types/incident-filters';
import { useCallback, memo, useMemo } from 'react';
import { useIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';

const IncidentFiltersComponent = memo(function IncidentFiltersComponent({
  filters,
  onFiltersChange,
  onReset
}: Omit<IncidentFiltersProps, 'onAddIncident'>) {
  const { showAdvanced, setShowAdvanced, formatFilterValue } = useIncidentFilters();
  const { isLoading } = useIncidentsQuery();

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      onFiltersChange({ ...filters, search: searchValue });
    },
    [filters, onFiltersChange]
  );

  const {
    searchValue,
    handleSearchChange: handleLocalSearchChange,
    handleSearchClear
  } = useDebouncedSearch({
    initialValue: filters.search,
    onSearchChange: handleSearchChange,
    delay: 500
  });

  const handleFilterChange = useCallback(
    (key: keyof IncidentFilters, value: string) => {
      if (key === 'search') {
        handleLocalSearchChange(value);
      } else {
        onFiltersChange({ ...filters, [key]: value });
      }
    },
    [filters, onFiltersChange, handleLocalSearchChange]
  );

  const removeFilter = useCallback(
    (key: keyof IncidentFilters) => {
      if (key === 'search') {
        handleSearchClear();
      } else {
        handleFilterChange(key, '');
      }
    },
    [handleFilterChange, handleSearchClear]
  );

  const handleToggleAdvanced = useCallback(() => {
    setShowAdvanced(!showAdvanced);
  }, [showAdvanced, setShowAdvanced]);

  const currentFilters = useMemo(
    () => ({
      ...filters,
      search: searchValue
    }),
    [filters, searchValue]
  );

  const activeFiltersCount = useMemo(() => {
    return Object.values(currentFilters).filter((value) => value !== '').length;
  }, [currentFilters]);

  return (
    <Card className="w-full flex flex-col gap-1">
      <CardHeader className="gap-0">
        <CardTitle>
          <FilterHeader
            activeFiltersCount={activeFiltersCount}
            showAdvanced={showAdvanced}
            onToggleAdvanced={handleToggleAdvanced}
            onReset={onReset}
            searchValue={searchValue}
            onSearchChange={handleLocalSearchChange}
            onSearchClear={handleSearchClear}
            isLoading={isLoading}
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        {showAdvanced && <AdvancedFilters filters={filters} onFilterChange={handleFilterChange} />}

        {activeFiltersCount > 0 && (
          <ActiveFilters
            filters={currentFilters}
            activeFiltersCount={activeFiltersCount}
            onRemoveFilter={removeFilter}
            formatFilterValue={formatFilterValue}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
});

export { IncidentFiltersComponent };
