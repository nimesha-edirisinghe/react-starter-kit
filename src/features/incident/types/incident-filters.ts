export interface IncidentFilters {
  search: string;
  category: string;
  severity: string;
  status: string;
  type: string;
  circuit: string;
  location: string;
}

export interface IncidentFiltersProps {
  filters: IncidentFilters;
  onFiltersChange: (filters: IncidentFilters) => void;
  onReset: () => void;
  onAddIncident?: () => void;
}
