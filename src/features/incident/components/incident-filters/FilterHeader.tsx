'use client';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Filter, Settings, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface FilterHeaderProps {
  activeFiltersCount: number;
  advancedFiltersCount: number;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onReset: () => void;
}

export function FilterHeader({
  activeFiltersCount,
  advancedFiltersCount,
  showAdvanced,
  onToggleAdvanced,
  onReset
}: FilterHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <span className="text-lg font-semibold">Filter Incidents</span>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="text-xs">
            {activeFiltersCount} active
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleAdvanced}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          <span>Advanced</span>
          {advancedFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs ml-1">
              {advancedFiltersCount}
            </Badge>
          )}
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-2 bg-transparent"
          disabled={activeFiltersCount === 0}
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset All</span>
        </Button>
      </div>
    </div>
  );
}
