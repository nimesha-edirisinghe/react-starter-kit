import { useState, useCallback } from 'react';
import { IncidentFilters } from '../types/incident-filters';

export function useIncidentFilters() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const getActiveFiltersCount = useCallback((filters: IncidentFilters) => {
    return Object.values(filters).filter((value) => value !== '').length;
  }, []);

  const getAdvancedFiltersCount = useCallback((filters: IncidentFilters) => {
    const advancedFields = ['category', 'severity', 'status', 'type', 'location'];
    return advancedFields.filter((field) => filters[field as keyof IncidentFilters] !== '').length;
  }, []);

  const formatFilterValue = useCallback((value: string) => {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }, []);

  return {
    showAdvanced,
    setShowAdvanced,
    getActiveFiltersCount,
    getAdvancedFiltersCount,
    formatFilterValue
  };
}
