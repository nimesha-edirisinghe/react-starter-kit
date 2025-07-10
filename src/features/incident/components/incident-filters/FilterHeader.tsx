import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, RotateCcw, Filter } from 'lucide-react';
import { SearchFilter } from './SearchFilter';

interface FilterHeaderProps {
  activeFiltersCount: number;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onReset: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  isLoading?: boolean;
}

export function FilterHeader({
  activeFiltersCount,
  showAdvanced,
  onToggleAdvanced,
  onReset,
  searchValue,
  onSearchChange,
  onSearchClear,
  isLoading = false
}: FilterHeaderProps) {
  const isDisabledResetBtn = activeFiltersCount === 0;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ">
        <div className="flex items-center gap-2 w-xl">
          <SearchFilter
            value={searchValue}
            onChange={onSearchChange}
            onClear={onSearchClear}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleAdvanced}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isLoading}
          >
            <Filter className="h-4 w-4 " />
            <span>Advanced</span>

            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="flex items-center gap-2 bg-transparent cursor-pointer"
            disabled={isDisabledResetBtn || isLoading}
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset All</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
