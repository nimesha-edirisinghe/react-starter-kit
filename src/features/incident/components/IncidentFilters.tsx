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
import { Search, Filter, RotateCcw, X } from 'lucide-react';

export interface IncidentFilters {
  search: string;
  category: string;
  severity: string;
  status: string;
  type: string;
  circuit: string;
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
  const handleFilterChange = (key: keyof IncidentFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value !== '').length;
  };

  const removeFilter = (key: keyof IncidentFilters) => {
    handleFilterChange(key, '');
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div className="flex flex-row justify-center items-center gap-2">
            <Filter className="h-5 w-5" />
            <span>Filter Incidents</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="w-full flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset All</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Search Field */}
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search incidents..."
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange('search', e.target.value)
              }
              className="pl-10 w-full"
            />
            {filters.search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-6 w-6 p-0"
                onClick={() => removeFilter('search')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Race Category Filter */}
          <Select
            value={filters.category}
            onValueChange={(value: string) => handleFilterChange('category', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Race Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_categories">All Categories</SelectItem>
              <SelectItem value="F1">Formula 1</SelectItem>
              <SelectItem value="Rally">Rally</SelectItem>
              <SelectItem value="MotoGP">MotoGP</SelectItem>
              <SelectItem value="IndyCar">IndyCar</SelectItem>
              <SelectItem value="NASCAR">NASCAR</SelectItem>
            </SelectContent>
          </Select>

          {/* Incident Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value: string) => handleFilterChange('type', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Incident Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_types">All Types</SelectItem>
              <SelectItem value="collision">Collision</SelectItem>
              <SelectItem value="penalty">Penalty</SelectItem>
              <SelectItem value="dnf">DNF</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
              <SelectItem value="unsafe_pit">Unsafe Pit</SelectItem>
              <SelectItem value="track_obstruction">Track Obstruction</SelectItem>
              <SelectItem value="rule_violation">Rule Violation</SelectItem>
            </SelectContent>
          </Select>

          {/* Severity Filter */}
          <Select
            value={filters.severity}
            onValueChange={(value: string) => handleFilterChange('severity', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_severities">All Severities</SelectItem>
              <SelectItem value="low">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Low</span>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Medium</span>
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>High</span>
                </div>
              </SelectItem>
              <SelectItem value="critical">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Critical</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value: string) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_statuses">All Statuses</SelectItem>
              <SelectItem value="investigating">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Investigating</span>
                </div>
              </SelectItem>
              <SelectItem value="resolved">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Resolved</span>
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Pending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-slate-700">Active Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(
                ([key, value]) =>
                  value && (
                    <Badge key={key} variant="secondary" className="flex items-center space-x-1">
                      <span>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value.replace('_', ' ')}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeFilter(key as keyof IncidentFilters)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
