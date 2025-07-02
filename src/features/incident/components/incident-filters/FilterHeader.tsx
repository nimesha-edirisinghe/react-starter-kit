import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Filter, Settings, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface FilterHeaderProps {
  activeFiltersCount: number;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onReset: () => void;
}

export function FilterHeader({
  activeFiltersCount,
  showAdvanced,
  onToggleAdvanced,
  onReset
}: FilterHeaderProps) {
  const isDisabledResetBtn = activeFiltersCount === 0;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
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
          className="flex items-center gap-2 cursor-pointer"
        >
          <Settings className="h-4 w-4 " />
          <span>Advanced</span>

          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-2 bg-transparent cursor-pointer"
          disabled={isDisabledResetBtn}
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset All</span>
        </Button>
      </div>
    </div>
  );
}
