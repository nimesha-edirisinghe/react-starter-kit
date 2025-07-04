import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Country {
  code: string;
  name: string;
  timezone: string;
  flag: string;
}

// Popular countries with their timezones - you can expand this list
export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { code: 'FR', name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { code: 'AU', name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
  { code: 'IN', name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { code: 'CN', name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { code: 'RU', name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { code: 'IT', name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
  { code: 'LK', name: 'Sri Lanka', timezone: 'Asia/Colombo', flag: '🇱🇰' }
];

interface TimezoneState {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  getTimezoneDate: (date: Date | string) => Date;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatDateTime: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
}

export const useTimezoneStore = create<TimezoneState>()(
  persist(
    (set, get) => ({
      selectedCountry: COUNTRIES[0], // Default to US

      setSelectedCountry: (country) => {
        set({ selectedCountry: country });
      },

      getTimezoneDate: (date) => {
        const { selectedCountry } = get();
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return new Date(dateObj.toLocaleString('en-US', { timeZone: selectedCountry.timezone }));
      },

      formatDate: (date, options = {}) => {
        const { selectedCountry } = get();
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const defaultOptions: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: selectedCountry.timezone,
          ...options
        };
        return dateObj.toLocaleDateString('en-US', defaultOptions);
      },

      formatTime: (date, options = {}) => {
        const { selectedCountry } = get();
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const defaultOptions: Intl.DateTimeFormatOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: selectedCountry.timezone,
          hour12: false,
          ...options
        };
        return dateObj.toLocaleTimeString('en-US', defaultOptions);
      },

      formatDateTime: (date, options = {}) => {
        const { selectedCountry } = get();
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const defaultOptions: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: selectedCountry.timezone,
          hour12: false,
          ...options
        };
        return dateObj.toLocaleString('en-US', defaultOptions);
      }
    }),
    {
      name: 'timezone-storage'
    }
  )
);
