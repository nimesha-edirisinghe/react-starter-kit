import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { memo } from 'react';

interface FilterSelectProps {
  label?: string;
  value: string;
  placeholder: string;
  options: Array<{ value: string; label: string; color?: string }>;
  onChange: (value: string) => void;
}

const FilterSelect = memo(function FilterSelect({
  label = '',
  value,
  placeholder,
  options,
  onChange
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
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
