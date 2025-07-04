import type { LiveAlert } from '~/api/types/alerts.types';
import type { LiveChartData, RaceDetails, TrackMapResponse } from '~/api/types/live.types';

export const mockLiveAlerts: LiveAlert[] = [
  {
    id: '1',
    type: 'critical',
    message: 'Safety car deployed',
    timestamp: new Date(),
    location: 'Turn 3'
  },
  {
    id: '2',
    type: 'warning',
    message: 'Yellow flag in sector 2',
    timestamp: new Date(),
    location: 'Sector 2'
  }
];

export const mockLiveChartData: LiveChartData = {
  currentMetrics: {
    incidentRate: 2.5,
    responseTime: 45,
    resolutionRate: {
      value: 85,
      change: 5
    }
  },
  timelineData: Array.from({ length: 20 }, (_, i) => ({
    time: new Date(Date.now() - i * 60000).toISOString(),
    incidents: Math.floor(Math.random() * 5),
    responseTime: Math.floor(Math.random() * 60) + 30,
    severity: Math.floor(Math.random() * 4),
    resolved: Math.floor(Math.random() * 3)
  }))
};

export const mockRaceDetails: RaceDetails = {
  status: 'racing',
  raceTime: '01:23:45',
  currentLap: 45,
  totalLaps: 78,
  circuit: 'Monaco'
};

export const mockTrackMap: TrackMapResponse = {
  incidents: [
    {
      id: '1',
      location: 'Turn 3',
      severity: 'high',
      type: 'collision',
      timestamp: new Date(),
      x: 30,
      y: 45
    }
  ],
  selectedIncident: null,
  trackInfo: {
    name: 'Monaco Grand Prix Circuit',
    locations: [
      { name: 'Turn 1', x: 10, y: 20 },
      { name: 'Turn 2', x: 30, y: 40 },
      { name: 'Turn 3', x: 50, y: 60 }
    ]
  }
};
