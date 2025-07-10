import { FilterOptions } from '../types/filter-options';
import { RacingIncident } from '../types/incident';
import { IncidentFilters } from '../types/incident-filters';

export const FALLBACK_FILTER_OPTIONS: FilterOptions = {
  category: [
    { value: 'F1', label: 'F1' },
    { value: 'Rally', label: 'Rally' },
    { value: 'MotoGP', label: 'MotoGP' },
    { value: 'IndyCar', label: 'IndyCar' },
    { value: 'NASCAR', label: 'NASCAR' }
  ],
  severity: [
    { value: 'critical', label: 'Critical', color: 'bg-red-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'low', label: 'Low', color: 'bg-green-500' }
  ],
  type: [
    { value: 'collision', label: 'Collision' },
    { value: 'penalty', label: 'Penalty' },
    { value: 'dnf', label: 'DNF' },
    { value: 'mechanical', label: 'Mechanical' },
    { value: 'unsafe_pit', label: 'Unsafe Pit' },
    { value: 'track_obstruction', label: 'Track Obstruction' },
    { value: 'rule_violation', label: 'Rule Violation' }
  ],
  status: [
    { value: 'investigating', label: 'Investigating', color: 'bg-yellow-500' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-500' },
    { value: 'pending', label: 'Pending', color: 'bg-red-500' }
  ],
  location: [],
  circuit: []
};

export function generateFilterOptions(
  incidents: RacingIncident[],
  currentFilters?: IncidentFilters
): FilterOptions {
  if (!incidents || incidents.length === 0) {
    return FALLBACK_FILTER_OPTIONS;
  }

  // Filter incidents based on current filters
  const filteredIncidents = incidents.filter((incident) => {
    if (!currentFilters) return true;

    return (
      (!currentFilters.type || incident.type === currentFilters.type) &&
      (!currentFilters.category || incident.raceCategory === currentFilters.category) &&
      (!currentFilters.severity || incident.severity === currentFilters.severity) &&
      (!currentFilters.status || incident.status === currentFilters.status) &&
      (!currentFilters.location || incident.location === currentFilters.location) &&
      (!currentFilters.circuit || incident.circuit === currentFilters.circuit)
    );
  });

  const categories = [...new Set(filteredIncidents.map((incident) => incident.raceCategory))];
  const severities = [...new Set(filteredIncidents.map((incident) => incident.severity))];
  const types = [...new Set(filteredIncidents.map((incident) => incident.type))];
  const statuses = [...new Set(filteredIncidents.map((incident) => incident.status))];
  const locations = [...new Set(filteredIncidents.map((incident) => incident.location))];
  const circuits = [...new Set(filteredIncidents.map((incident) => incident.circuit))];

  const severityColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const statusColors = {
    investigating: 'bg-yellow-500',
    resolved: 'bg-green-500',
    pending: 'bg-red-500'
  };

  // Sort severities in the specified order
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedSeverities = [...severities].sort(
    (a, b) =>
      (severityOrder[a as keyof typeof severityOrder] ?? 999) -
      (severityOrder[b as keyof typeof severityOrder] ?? 999)
  );

  return {
    category: categories.map((cat) => ({
      value: cat,
      label: cat === 'F1' ? 'F1' : cat
    })),
    severity: sortedSeverities.map((sev) => ({
      value: sev,
      label: sev.charAt(0).toUpperCase() + sev.slice(1),
      color: severityColors[sev as keyof typeof severityColors]
    })),
    type: types.map((type) => ({
      value: type,
      label: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    })),
    status: statuses.map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      color: statusColors[status as keyof typeof statusColors]
    })),
    location: locations.map((location) => ({
      value: location,
      label: location
    })),
    circuit: circuits.map((circuit) => ({
      value: circuit,
      label: circuit
    }))
  };
}
