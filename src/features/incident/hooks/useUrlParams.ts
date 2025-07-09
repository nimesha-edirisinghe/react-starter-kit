import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { IncidentFilters } from '../types/incident-filters';

export function useUrlParams() {
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimeoutRef = useRef<number | null>(null);

  const getUrlParams = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);

    return {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      severity: searchParams.get('severity') || '',
      status: searchParams.get('status') || '',
      type: searchParams.get('type') || '',
      circuit: searchParams.get('circuit') || '',
      location: searchParams.get('location') || '',
      page: parseInt(searchParams.get('page') || '1', 10)
    };
  }, [location.search]);

  const updateUrlParams = useCallback(
    (filters: IncidentFilters, page: number, immediate = false) => {
      const updateUrl = () => {
        const searchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            searchParams.set(key, value);
          }
        });

        if (page > 1) {
          searchParams.set('page', page.toString());
        }

        const search = searchParams.toString();
        const newUrl = search ? `?${search}` : location.pathname;
        navigate({ to: newUrl });
      };

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (immediate) {
        updateUrl();
      } else {
        debounceTimeoutRef.current = window.setTimeout(updateUrl, 500);
      }
    },
    [navigate, location.pathname]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    getUrlParams,
    updateUrlParams
  };
}
