import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { memo } from 'react';

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

  const allOptions = selectedOption ? [...options, selectedOption] : options;

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {allOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={option.isTemporary ? 'italic' : ''}
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
