export interface RaceDetails {
  status: string;
  raceTime: string;
  currentLap: number;
  totalLaps: number;
  circuit: string;
}

export interface LiveData {
  metrics: {
    incidentRate: number;
    responseTime: number;
    resolutionRate: {
      value: number;
      change: number;
    };
  };
  timelineData: Array<{
    time: string;
    incidents: number;
    responseTime: number;
    severity: number;
    resolved: number;
  }>;
}

export interface TrackIncident {
  id: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  timestamp: Date;
  x: number;
  y: number;
}

export interface TrackMapResponse {
  incidents: TrackIncident[];
  selectedIncident: TrackIncident | null;
  trackInfo: {
    name: string;
    locations: Array<{
      name: string;
      x: number;
      y: number;
    }>;
  };
}

export interface LiveChartData {
  currentMetrics: {
    incidentRate: number;
    responseTime: number;
    resolutionRate: {
      value: number;
      change: number;
    };
  };
  timelineData: {
    time: string;
    incidents: number;
    responseTime: number;
    severity: number;
    resolved: number;
  }[];
}

export interface LiveChartData {
  currentMetrics: {
    incidentRate: number;
    responseTime: number;
    resolutionRate: {
      value: number;
      change: number;
    };
  };
  timelineData: {
    time: string;
    incidents: number;
    responseTime: number;
    severity: number;
    resolved: number;
  }[];
}
