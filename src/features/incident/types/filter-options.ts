export interface FilterOption {
  value: string;
  label: string;
  color?: string;
}

export interface FilterOptions {
  category: FilterOption[];
  severity: FilterOption[];
  type: FilterOption[];
  status: FilterOption[];
  location: FilterOption[];
  circuit: FilterOption[];
}
