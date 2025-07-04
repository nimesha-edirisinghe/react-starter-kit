import { useTimezone } from '~/hooks/useTimezone';

interface TimezoneDateProps {
  date: Date | string;
  format?: 'date' | 'time' | 'datetime';
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}

export function TimezoneDate({ date, format = 'datetime', options, className }: TimezoneDateProps) {
  const { formatDate, formatTime, formatDateTime } = useTimezone();

  const getFormattedValue = () => {
    switch (format) {
      case 'date':
        return formatDate(date, options);
      case 'time':
        return formatTime(date, options);
      case 'datetime':
        return formatDateTime(date, options);
      default:
        return formatDateTime(date, options);
    }
  };

  return <span className={className}>{getFormattedValue()}</span>;
}
