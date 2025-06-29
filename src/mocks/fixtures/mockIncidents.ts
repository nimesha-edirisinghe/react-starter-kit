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
  },
  {
    id: '7',
    type: 'dnf',
    raceCategory: 'NASCAR',
    location: 'Turn 1',
    circuit: 'Monaco Grand Prix',
    severity: 'medium',
    drivers: ['Charles Leclerc'],
    teams: ['McLaren'],
    lapNumber: 9,
    raceTime: '13:52:00',
    description: 'Sample incident description 1',
    timestamp: '2024-01-15T13:52:00Z',
    status: 'pending',
    stewardNotes: 'Notes for incident 1'
  },
  {
    id: '8',
    type: 'collision',
    raceCategory: 'MotoGP',
    location: 'Stage 4',
    circuit: 'Daytona International Speedway',
    severity: 'low',
    drivers: ['George Russell', 'Charles Leclerc'],
    teams: ['Ferrari', 'Alpine'],
    lapNumber: 46,
    raceTime: '15:28:00',
    description: 'Sample incident description 2',
    timestamp: '2024-01-15T15:28:00Z',
    status: 'pending',
    stewardNotes: 'Notes for incident 2'
  },
  {
    id: '9',
    type: 'mechanical',
    raceCategory: 'F1',
    location: 'Turn 4',
    circuit: 'Wales Rally GB',
    severity: 'low',
    drivers: ['Sergio Perez', 'Scott Dixon'],
    teams: ['Ferrari', 'Toyota Gazoo Racing'],
    lapNumber: 15,
    raceTime: '14:47:00',
    description: 'Sample incident description 3',
    timestamp: '2024-01-15T14:47:00Z',
    status: 'investigating'
  },
  {
    id: '10',
    type: 'mechanical',
    raceCategory: 'NASCAR',
    location: 'Stage 4',
    circuit: 'Suzuka Circuit',
    severity: 'critical',
    drivers: ['Kyle Busch'],
    teams: ['Mercedes'],
    lapNumber: 41,
    raceTime: '13:02:00',
    description: 'Sample incident description 4',
    timestamp: '2024-01-15T13:02:00Z',
    status: 'pending'
  },
  {
    id: '11',
    type: 'collision',
    raceCategory: 'F1',
    location: 'Stage 4',
    circuit: 'Suzuka Circuit',
    severity: 'low',
    drivers: ['Charles Leclerc', 'Sebastian Vettel'],
    teams: ['Alpine', 'McLaren'],
    lapNumber: 22,
    raceTime: '13:05:00',
    description: 'Sample incident description 5',
    timestamp: '2024-01-15T13:05:00Z',
    status: 'investigating'
  },
  {
    id: '12',
    type: 'rule_violation',
    raceCategory: 'IndyCar',
    location: 'Pit Lane',
    circuit: 'Indianapolis Motor Speedway',
    severity: 'medium',
    drivers: ['Scott Dixon'],
    teams: ['Chip Ganassi Racing'],
    lapNumber: 33,
    raceTime: '13:45:00',
    description: 'Sample incident description 6',
    timestamp: '2024-01-15T13:45:00Z',
    status: 'resolved',
    stewardNotes: 'Notes for incident 6'
  },
  {
    id: '13',
    type: 'penalty',
    raceCategory: 'MotoGP',
    location: 'Turn 3',
    circuit: 'Silverstone Circuit',
    severity: 'high',
    drivers: ['Fabio Quartararo'],
    teams: ['Monster Energy Yamaha'],
    lapNumber: 18,
    raceTime: '14:00:00',
    description: 'Sample incident description 7',
    timestamp: '2024-01-15T14:00:00Z',
    status: 'resolved',
    stewardNotes: 'Notes for incident 7'
  },
  {
    id: '14',
    type: 'track_obstruction',
    raceCategory: 'Rally',
    location: 'Sector 2',
    circuit: 'Wales Rally GB',
    severity: 'high',
    drivers: ['Sébastien Ogier'],
    teams: ['Toyota Gazoo Racing'],
    lapNumber: 5,
    raceTime: '14:10:00',
    description: 'Sample incident description 8',
    timestamp: '2024-01-15T14:10:00Z',
    status: 'pending',
    stewardNotes: 'Notes for incident 8'
  },
  {
    id: '15',
    type: 'collision',
    raceCategory: 'F1',
    location: 'Turn 1',
    circuit: 'Monaco Grand Prix',
    severity: 'critical',
    drivers: ['Lewis Hamilton', 'George Russell'],
    teams: ['Mercedes', 'Alpine'],
    lapNumber: 12,
    raceTime: '14:55:00',
    description: 'Sample incident description 9',
    timestamp: '2024-01-15T14:55:00Z',
    status: 'investigating',
    stewardNotes: 'Notes for incident 9'
  },
  {
    id: '16',
    type: 'dnf',
    raceCategory: 'NASCAR',
    location: 'Turn 4',
    circuit: 'Daytona International Speedway',
    severity: 'high',
    drivers: ['Joey Logano'],
    teams: ['Team Penske'],
    lapNumber: 60,
    raceTime: '15:30:00',
    description: 'Sample incident description 10',
    timestamp: '2024-01-15T15:30:00Z',
    status: 'resolved',
    stewardNotes: 'Notes for incident 10'
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
