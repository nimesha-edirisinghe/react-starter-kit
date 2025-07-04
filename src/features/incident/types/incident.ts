export interface RacingIncident {
  id: string;
  type:
    | 'collision'
    | 'penalty'
    | 'dnf'
    | 'mechanical'
    | 'unsafe_pit'
    | 'track_obstruction'
    | 'rule_violation';
  raceCategory: 'F1' | 'Rally' | 'MotoGP' | 'IndyCar' | 'NASCAR';
  location: string;
  circuit: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  drivers: string[];
  teams: string[];
  lapNumber: number;
  raceTime: string;
  description: string;
  timestamp: string;
  status: 'investigating' | 'resolved' | 'pending';
  stewardNotes?: string;
}

export interface IncidentFormData {
  type:
    | 'collision'
    | 'penalty'
    | 'dnf'
    | 'mechanical'
    | 'unsafe_pit'
    | 'track_obstruction'
    | 'rule_violation'
    | '';
  raceCategory: 'F1' | 'Rally' | 'MotoGP' | 'IndyCar' | 'NASCAR' | '';
  location: string;
  circuit: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | '';
  drivers: string;
  teams: string;
  lapNumber: string;
  raceTime: string;
  description: string;
  status: 'investigating' | 'resolved' | 'pending' | '';
  stewardNotes: string;
}
