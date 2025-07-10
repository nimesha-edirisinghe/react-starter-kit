import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { memo, useMemo } from 'react';

interface FilterOption {
  value: string;
  label: string;
  color?: string;
  isTemporary?: boolean;
}

interface FilterSelectProps {
  label?: string;
  value: string;
  placeholder: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

// Severity order map for custom sorting
const SEVERITY_ORDER = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3
};

const FilterSelect = memo(function FilterSelect({
  label = '',
  value,
  placeholder,
  options,
  onChange,
  disabled = false
}: FilterSelectProps) {
  // If we have a value but it's not in the options, create a temporary option
  const selectedOption: FilterOption | undefined =
    value && !options.find((opt) => opt.value === value)
      ? { value, label: value, isTemporary: true }
      : undefined;

  // Sort options and include the selected option if it exists
  const sortedOptions = useMemo(() => {
    const allOptions = selectedOption ? [...options, selectedOption] : options;

    const isSeverityFilter = allOptions.some((opt) => opt.value in SEVERITY_ORDER);
    if (isSeverityFilter) {
      return [...allOptions].sort((a, b) => {
        const orderA = SEVERITY_ORDER[a.value as keyof typeof SEVERITY_ORDER] ?? 999;
        const orderB = SEVERITY_ORDER[b.value as keyof typeof SEVERITY_ORDER] ?? 999;
        return orderA - orderB;
      });
    }

    // Sort other options alphabetically by label
    return [...allOptions].sort((a, b) => a.label.localeCompare(b.label));
  }, [options, selectedOption]);

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto scroll-smooth snap-y snap-mandatory">
          {sortedOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={`snap-start ${option.isTemporary ? 'italic' : ''}`}
            >
              {option.color ? (
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${option.color} rounded-full`} />
                  <span>{option.label}</span>
                </div>
              ) : (
                <span>{option.label}</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

export { FilterSelect };
