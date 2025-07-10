import { useState, useCallback, useMemo, useRef } from 'react';
import { useFilteredIncidentsQuery } from '~/api/queries/incident/useIncidentsQuery';
import { IncidentSearchParams } from '~/api/services/incidents';
import { IncidentFilters } from '../types/incident-filters';
import { useUrlParams } from './useUrlParams';
import { useIncidentFiltersStore } from '../store/incident-filters-store';

const ITEMS_PER_PAGE = 10;

export function useIncidentTable() {
  const { getUrlParams, updateUrlParams } = useUrlParams();
  const {
    search: urlSearch,
    category,
    severity,
    status,
    type,
    circuit: urlCircuit,
    location,
    page: urlPage
  } = getUrlParams();
  const { filters: persistedFilters } = useIncidentFiltersStore();

  const isUpdatingRef = useRef(false);

  const initialFilters = useMemo(
    () => ({
      search: urlSearch || persistedFilters.search || '',
      category,
      severity,
      status,
      type,
      circuit: urlCircuit || persistedFilters.circuit || '',
      location: location || persistedFilters.location || ''
    }),
    [
      urlSearch,
      persistedFilters.search,
      category,
      severity,
      status,
      type,
      urlCircuit,
      persistedFilters.circuit,
      location,
      persistedFilters.location
    ]
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

  // Convert frontend filters to API search params
  const searchParams: IncidentSearchParams = useMemo(
    () => ({
      search: filters.search || undefined,
      category: category || undefined,
      severity: severity || undefined,
      status: status || undefined,
      type: type || undefined,
      circuit: filters.circuit || undefined,
      location: filters.location || undefined,
      page: urlPage,
      limit: ITEMS_PER_PAGE
    }),
    [filters.search, filters.circuit, filters.location, category, severity, status, type, urlPage]
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

      const hasFilterChanges = Object.keys(newFilters).some(
        (key) => newFilters[key as keyof IncidentFilters] !== filters[key as keyof IncidentFilters]
      );

      if (hasFilterChanges) {
        // Always reset to page 1 when any filter changes
        updateUrlParams(newFilters, 1, true);
      }

      // Reset the updating flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    },
    [filters, updateUrlParams]
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

  return {
    filters,
    response,
    isLoading,
    fetchingError,
    refetch,
    handleFiltersChange,
    handleResetFilters,
    handlePageChange
  };
}
