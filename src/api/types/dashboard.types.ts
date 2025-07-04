export interface DashboardStats {
  totalIncidents: number;
  investigating: number;
  resolved: number;
  pending: number;
}

export interface RecentIncident {
  id: string;
  type: string;
  raceCategory: string;
  location: string;
  circuit: string;
  severity: string;
  drivers: string[];
  teams: string[];
  lapNumber: number;
  raceTime: string;
  description: string;
  timestamp: string;
  status: string;
  stewardNotes?: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface TrendData {
  date: string;
  incidents: number;
  resolved: number;
}

export interface HourlyData {
  hour: string;
  incidents: number;
}

export interface CircuitData {
  circuit: string;
  incidents: number;
  performance: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentIncidents: RecentIncident[];
  severityData: ChartData[];
  trendData: TrendData[];
  hourlyData: HourlyData[];
  circuitData: CircuitData[];
}
