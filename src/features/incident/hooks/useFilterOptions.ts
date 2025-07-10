import { RacingIncident } from '../types/incident';
import { FALLBACK_FILTER_OPTIONS, generateFilterOptions } from '../utils/filter-options';
import { IncidentFilters } from '../types/incident-filters';

export function useFilterOptions(incidents?: RacingIncident[], currentFilters?: IncidentFilters) {
  if (!incidents) {
    return {
      filterOptions: FALLBACK_FILTER_OPTIONS,
      isLoading: false,
      error: null
    };
  }

  return {
    filterOptions: generateFilterOptions(incidents, currentFilters),
    isLoading: false,
    error: null
  };
}
