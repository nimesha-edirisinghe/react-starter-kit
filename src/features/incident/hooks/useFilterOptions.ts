import { RacingIncident } from '../types/incident';
import { FALLBACK_FILTER_OPTIONS, generateFilterOptions } from '../utils/filter-options';

export function useFilterOptions(incidents?: RacingIncident[]) {
  if (!incidents) {
    return {
      filterOptions: FALLBACK_FILTER_OPTIONS,
      isLoading: false,
      error: null
    };
  }

  return {
    filterOptions: generateFilterOptions(incidents),
    isLoading: false,
    error: null
  };
}
