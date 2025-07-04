import { FilterOptions } from '../types/filter-options';
import { RacingIncident } from '../types/incident';

export const FALLBACK_FILTER_OPTIONS: FilterOptions = {
  category: [
    { value: 'F1', label: 'Formula 1' },
    { value: 'Rally', label: 'Rally' },
    { value: 'MotoGP', label: 'MotoGP' },
    { value: 'IndyCar', label: 'IndyCar' },
    { value: 'NASCAR', label: 'NASCAR' }
  ],
  severity: [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' }
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
  location: [
    { value: 'Turn 1', label: 'Turn 1' },
    { value: 'Turn 2', label: 'Turn 2' },
    { value: 'Turn 3', label: 'Turn 3' },
    { value: 'Turn 4', label: 'Turn 4' },
    { value: 'Pit Lane', label: 'Pit Lane' },
    { value: 'Sector 1', label: 'Sector 1' },
    { value: 'Sector 2', label: 'Sector 2' },
    { value: 'Sector 3', label: 'Sector 3' },
    { value: 'Start/Finish', label: 'Start/Finish' },
    { value: 'Chicane', label: 'Chicane' },
    { value: 'Hairpin', label: 'Hairpin' },
    { value: 'Stage 4', label: 'Stage 4' }
  ]
};

export function generateFilterOptions(incidents: RacingIncident[]): FilterOptions {
  if (!incidents || incidents.length === 0) {
    return FALLBACK_FILTER_OPTIONS;
  }

  const categories = [...new Set(incidents.map((incident) => incident.raceCategory))];
  const severities = [...new Set(incidents.map((incident) => incident.severity))];
  const types = [...new Set(incidents.map((incident) => incident.type))];
  const statuses = [...new Set(incidents.map((incident) => incident.status))];
  const locations = [...new Set(incidents.map((incident) => incident.location))];

  const severityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500'
  };

  const statusColors = {
    investigating: 'bg-yellow-500',
    resolved: 'bg-green-500',
    pending: 'bg-red-500'
  };

  return {
    category: categories.map((cat) => ({
      value: cat,
      label: cat === 'F1' ? 'Formula 1' : cat
    })),
    severity: severities.map((sev) => ({
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
    }))
  };
}
