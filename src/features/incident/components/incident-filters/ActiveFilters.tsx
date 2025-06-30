'use client';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { IncidentFilters } from '../../types/incident-filters';

interface ActiveFiltersProps {
  filters: IncidentFilters;
  activeFiltersCount: number;
  onRemoveFilter: (key: keyof IncidentFilters) => void;
  formatFilterValue: (value: string) => string;
}

export function ActiveFilters({
  filters,
  activeFiltersCount,
  onRemoveFilter,
  formatFilterValue
}: ActiveFiltersProps) {
  const filterBadges = [
    { key: 'search' as const, label: 'Search', value: filters.search, quoted: true },
    { key: 'category' as const, label: 'Category', value: filters.category },
    { key: 'severity' as const, label: 'Severity', value: filters.severity, format: true },
    { key: 'type' as const, label: 'Type', value: filters.type, format: true },
    { key: 'status' as const, label: 'Status', value: filters.status, format: true },
    { key: 'location' as const, label: 'Location', value: filters.location }
  ];

  return (
    <div className="space-y-2 pt-3 border-t">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Active Filters</span>
        <Badge variant="outline" className="text-xs">
          {activeFiltersCount}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {filterBadges.map(({ key, label, value, quoted, format }) => {
          if (!value) return null;

          const displayValue = format ? formatFilterValue(value) : value;
          const badgeText = quoted ? `${label}: "${displayValue}"` : `${label}: ${displayValue}`;

          return (
            <Badge key={key} variant="secondary" className="flex items-center gap-1 pr-1">
              <span className="text-xs">{badgeText}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-muted-foreground/20 cursor-pointer"
                onClick={() => onRemoveFilter(key)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
