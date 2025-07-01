import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { useTimezoneStore, COUNTRIES, type Country } from '~/stores/timezone-store';
import { Badge } from '~/components/ui/badge';

interface CountrySelectorProps {
  variant?: 'default' | 'compact';
  showLabel?: boolean;
}

export function CountrySelector({ variant = 'default', showLabel = true }: CountrySelectorProps) {
  const { selectedCountry, setSelectedCountry } = useTimezoneStore();
  const [currentTime, setCurrentTime] = useState('');

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const updateTime = () => {
    const time = new Date().toLocaleTimeString('en-US', {
      timeZone: selectedCountry.timezone,
      hour: '2-digit',
      minute: '2-digit'
    });
    setCurrentTime(time);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [selectedCountry.timezone]);

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 gap-2 cursor-pointer">
            <span className="text-base">{selectedCountry.flag}</span>
            <span className="text-xs font-mono">{currentTime}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Select Country & Timezone
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {COUNTRIES.map((country) => (
            <DropdownMenuItem
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{country.flag}</span>
                <span className="text-sm">{country.name}</span>
              </div>
              {selectedCountry.code === country.code && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <Globe className="h-4 w-4" />
          <div className="flex items-center gap-2">
            <span className="text-base">{selectedCountry.flag}</span>
            <div className="flex flex-col items-start">
              {showLabel && <span className="text-xs text-muted-foreground">Country</span>}
              <span className="text-sm font-medium">{selectedCountry.name}</span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Select Country & Timezone
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COUNTRIES.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => handleCountrySelect(country)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{country.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{country.name}</span>
                <span className="text-xs text-muted-foreground">{country.timezone}</span>
              </div>
            </div>
            {selectedCountry.code === country.code && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
