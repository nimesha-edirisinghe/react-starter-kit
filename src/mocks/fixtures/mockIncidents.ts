import { RacingIncident } from '~/features/incident/types/incident';

export const mockIncidents: RacingIncident[] = [
  {
    id: '1',
    type: 'collision',
    raceCategory: 'F1',
    location: 'Turn 3',
    circuit: 'Monaco Grand Prix',
    severity: 'high',
    drivers: ['Lewis Hamilton', 'Max Verstappen'],
    teams: ['Mercedes', 'Red Bull Racing'],
    lapNumber: 23,
    raceTime: '00:34:12',
    description: 'Contact between cars at Turn 3 chicane, both drivers able to continue',
    timestamp: '2024-01-15T14:34:12Z',
    status: 'investigating',
    stewardNotes: 'Reviewing onboard footage and telemetry data'
  },
  {
    id: '2',
    type: 'penalty',
    raceCategory: 'F1',
    location: 'Pit Lane',
    circuit: 'Monaco Grand Prix',
    severity: 'medium',
    drivers: ['Charles Leclerc'],
    teams: ['Ferrari'],
    lapNumber: 18,
    raceTime: '00:28:45',
    description: 'Unsafe release during pit stop',
    timestamp: '2024-01-15T14:28:45Z',
    status: 'resolved',
    stewardNotes: '5-second time penalty applied'
  },
  {
    id: '3',
    type: 'mechanical',
    raceCategory: 'MotoGP',
    location: 'Sector 2',
    circuit: 'Silverstone Circuit',
    severity: 'critical',
    drivers: ['Fabio Quartararo'],
    teams: ['Monster Energy Yamaha'],
    lapNumber: 12,
    raceTime: '00:18:23',
    description: 'Engine failure, rider safely returned to pits',
    timestamp: '2024-01-15T13:18:23Z',
    status: 'resolved'
  },
  {
    id: '4',
    type: 'track_obstruction',
    raceCategory: 'Rally',
    location: 'Stage 4',
    circuit: 'Wales Rally GB',
    severity: 'high',
    drivers: ['Sébastien Ogier'],
    teams: ['Toyota Gazoo Racing'],
    lapNumber: 1,
    raceTime: '00:12:34',
    description: 'Debris on track from previous competitor',
    timestamp: '2024-01-15T12:12:34Z',
    status: 'resolved'
  },
  {
    id: '5',
    type: 'rule_violation',
    raceCategory: 'IndyCar',
    location: 'Turn 1',
    circuit: 'Indianapolis Motor Speedway',
    severity: 'medium',
    drivers: ['Scott Dixon'],
    teams: ['Chip Ganassi Racing'],
    lapNumber: 45,
    raceTime: '01:02:15',
    description: 'Blocking during qualifying session',
    timestamp: '2024-01-15T15:02:15Z',
    status: 'pending'
  },
  {
    id: '6',
    type: 'dnf',
    raceCategory: 'NASCAR',
    location: 'Turn 4',
    circuit: 'Daytona International Speedway',
    severity: 'high',
    drivers: ['Kyle Busch', 'Joey Logano'],
    teams: ['Joe Gibbs Racing', 'Team Penske'],
    lapNumber: 67,
    raceTime: '01:23:45',
    description: 'Multi-car incident involving 3 vehicles',
    timestamp: '2024-01-15T16:23:45Z',
    status: 'investigating'
  }
];

export const getIncidentsByCategory = () => {
  const categories = mockIncidents.reduce(
    (acc, incident) => {
      acc[incident.raceCategory] = (acc[incident.raceCategory] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getIncidentsBySeverity = () => {
  const severities = mockIncidents.reduce(
    (acc, incident) => {
      acc[incident.severity] = (acc[incident.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(severities).map(([name, value]) => ({ name, value }));
};

export const getIncidentsByType = () => {
  const types = mockIncidents.reduce(
    (acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(types).map(([name, value]) => ({
    name: name.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value
  }));
};
