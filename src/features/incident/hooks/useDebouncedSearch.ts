import { useState, useEffect, useCallback } from 'react';

interface UseDebouncedSearchProps {
  initialValue: string;
  onSearchChange: (value: string) => void;
  delay?: number;
}

export function useDebouncedSearch({
  initialValue,
  onSearchChange,
  delay = 1000
}: UseDebouncedSearchProps) {
  const [searchValue, setSearchValue] = useState(initialValue);

  // Update local state when initial value changes
  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  // Debounce the search change
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearchChange(searchValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, onSearchChange, delay]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchValue('');
  }, []);

  return {
    searchValue,
    handleSearchChange,
    handleSearchClear
  };
}
