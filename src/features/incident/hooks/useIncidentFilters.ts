import { useEffect } from 'react';
import { useIncidentFiltersStore } from '../store/incident-filters-store';

export function useIncidentFilters() {
  const {
    showAdvanced,
    setShowAdvanced,
    currentPage,
    handleNavigation,
    getActiveFiltersCount,
    getAdvancedFiltersCount,
    formatFilterValue
  } = useIncidentFiltersStore();

  // Track current page and handle navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getCurrentPage = () => window.location.pathname;
      const newPage = getCurrentPage();

      if (newPage !== currentPage) {
        handleNavigation(newPage);
      }

      const handlePopState = () => {
        const page = getCurrentPage();
        handleNavigation(page);
      };

      // Handle programmatic navigation (clicking links)
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args);
        setTimeout(() => {
          const page = getCurrentPage();
          handleNavigation(page);
        }, 0);
      };

      window.history.replaceState = function (...args) {
        originalReplaceState.apply(window.history, args);
        setTimeout(() => {
          const page = getCurrentPage();
          handleNavigation(page);
        }, 0);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, [currentPage, handleNavigation]);

  return {
    showAdvanced,
    setShowAdvanced,
    getActiveFiltersCount,
    getAdvancedFiltersCount,
    formatFilterValue
  };
}
