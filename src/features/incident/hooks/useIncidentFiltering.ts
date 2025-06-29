import { useMemo } from 'react';
import { IncidentFilters } from '../types/incident-filters';
import { createSearchableText } from '../utils/incident-utils';

interface UseIncidentFilteringProps {
  incidents: any[];
  filters: IncidentFilters;
}

export const useIncidentFiltering = ({ incidents, filters }: UseIncidentFilteringProps) => {
  const searchableIncidents = useMemo(() => {
    return incidents.map((incident) => ({
      ...incident,
      searchableText: createSearchableText(incident)
    }));
  }, [incidents]);

  const filteredIncidents = useMemo(() => {
    if (!searchableIncidents.length) return [];

    const { search, category, severity, status, type, location } = filters;
    const hasActiveFilters = search || category || severity || status || type || location;

    if (!hasActiveFilters) {
      return searchableIncidents;
    }

    const searchTerm = search.toLowerCase();

    return searchableIncidents.filter((incident) => {
      if (category && incident.raceCategory !== category) return false;
      if (type && incident.type !== type) return false;
      if (severity && incident.severity !== severity) return false;
      if (status && incident.status !== status) return false;
      if (location && incident.location !== location) return false;
      if (search && !incident.searchableText.includes(searchTerm)) return false;

      return true;
    });
  }, [searchableIncidents, filters]);

  return {
    filteredIncidents,
    counts: {
      filtered: filteredIncidents.length,
      total: incidents.length
    }
  };
};
