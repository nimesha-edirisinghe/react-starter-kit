import { useTimezoneStore } from '~/stores/timezone-store';

export function useTimezone() {
  const { selectedCountry, formatDate, formatTime, formatDateTime, getTimezoneDate } =
    useTimezoneStore();

  return {
    selectedCountry,
    formatDate,
    formatTime,
    formatDateTime,
    getTimezoneDate,
    timezone: selectedCountry.timezone
  };
}
