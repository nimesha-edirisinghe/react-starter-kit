'use client';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchFilter({ value, onChange, onClear }: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* <label className="text-sm font-medium text-muted-foreground">Search</label> */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search incidents..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-muted"
            onClick={onClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
