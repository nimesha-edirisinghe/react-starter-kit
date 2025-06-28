'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Search, Filter, RotateCcw, X, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { useState } from 'react';

export interface IncidentFilters {
  search: string;
  category: string;
  severity: string;
  status: string;
  type: string;
  circuit: string;
  location: string;
}

interface IncidentFiltersProps {
  filters: IncidentFilters;
  onFiltersChange: (filters: IncidentFilters) => void;
  onReset: () => void;
}

export function IncidentFiltersComponent({
  filters,
  onFiltersChange,
  onReset
}: IncidentFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof IncidentFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value !== '').length;
  };

  const getAdvancedFiltersCount = () => {
    const advancedFields = ['category', 'severity', 'status', 'type', 'location'];
    return advancedFields.filter((field) => filters[field as keyof IncidentFilters] !== '').length;
  };

  const removeFilter = (key: keyof IncidentFilters) => {
    handleFilterChange(key, '');
  };

  const activeFiltersCount = getActiveFiltersCount();
  const advancedFiltersCount = getAdvancedFiltersCount();

  const formatFilterValue = (value: string) => {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Card className="w-full flex flex-col gap-1">
      <CardHeader className="">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>Advanced</span>
              {advancedFiltersCount > 0 && (
                <Badge variant="secondary" className="text-xs ml-1">
                  {advancedFiltersCount}
                </Badge>
              )}
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
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
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 ">
        {/* Search Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Search</label>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search incidents..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 pr-10"
            />
            {filters.search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-muted"
                onClick={() => removeFilter('search')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Advanced Filters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {/* Race Category Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value: string) => handleFilterChange('category', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="F1">Formula 1</SelectItem>
                    <SelectItem value="Rally">Rally</SelectItem>
                    <SelectItem value="MotoGP">MotoGP</SelectItem>
                    <SelectItem value="IndyCar">IndyCar</SelectItem>
                    <SelectItem value="NASCAR">NASCAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Severity Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">Severity</label>
                <Select
                  value={filters.severity}
                  onValueChange={(value: string) => handleFilterChange('severity', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Low</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <span>Medium</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span>High</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="critical">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Critical</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Incident Type Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">Type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value: string) => handleFilterChange('type', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collision">Collision</SelectItem>
                    <SelectItem value="penalty">Penalty</SelectItem>
                    <SelectItem value="dnf">DNF</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="unsafe_pit">Unsafe Pit</SelectItem>
                    <SelectItem value="track_obstruction">Track Obstruction</SelectItem>
                    <SelectItem value="rule_violation">Rule Violation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investigating">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <span>Investigating</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="resolved">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Resolved</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Pending</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">Location</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => handleFilterChange('location', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Turn 1">Turn 1</SelectItem>
                    <SelectItem value="Turn 2">Turn 2</SelectItem>
                    <SelectItem value="Turn 3">Turn 3</SelectItem>
                    <SelectItem value="Turn 4">Turn 4</SelectItem>
                    <SelectItem value="Pit Lane">Pit Lane</SelectItem>
                    <SelectItem value="Sector 1">Sector 1</SelectItem>
                    <SelectItem value="Sector 2">Sector 2</SelectItem>
                    <SelectItem value="Sector 3">Sector 3</SelectItem>
                    <SelectItem value="Start/Finish">Start/Finish</SelectItem>
                    <SelectItem value="Chicane">Chicane</SelectItem>
                    <SelectItem value="Hairpin">Hairpin</SelectItem>
                    <SelectItem value="Stage 4">Stage 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2 pt-3 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Active Filters</span>
              <Badge variant="outline" className="text-xs">
                {activeFiltersCount}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                  <span className="text-xs">Search: "{filters.search}"</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                    onClick={() => removeFilter('search')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                  <span className="text-xs">Category: {filters.category}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                    onClick={() => removeFilter('category')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.severity && (
                <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                  <span className="text-xs">Severity: {formatFilterValue(filters.severity)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                    onClick={() => removeFilter('severity')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.type && (
                <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                  <span className="text-xs">Type: {formatFilterValue(filters.type)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                    onClick={() => removeFilter('type')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.status && (
                <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                  <span className="text-xs">Status: {formatFilterValue(filters.status)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                    onClick={() => removeFilter('status')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1 pr-1">
                  <span className="text-xs">Location: {filters.location}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                    onClick={() => removeFilter('location')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
