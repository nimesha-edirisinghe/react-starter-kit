import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IncidentFilters } from '../types/incident-filters';

interface IncidentFiltersState {
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  filters: IncidentFilters;
  setFilters: (filters: IncidentFilters) => void;
  updateFilter: (key: keyof IncidentFilters, value: string) => void;
  resetFilters: () => void;
  handleNavigation: (newPage: string) => void;
  getActiveFiltersCount: () => number;
  getAdvancedFiltersCount: () => number;
  formatFilterValue: (value: string) => string;
}

const defaultFilters: IncidentFilters = {
  search: '',
  category: '',
  severity: '',
  status: '',
  type: '',
  circuit: '',
  location: ''
};

export const useIncidentFiltersStore = create<IncidentFiltersState>()(
  persist(
    (set, get) => ({
      // Advanced panel state - defaults to closed
      showAdvanced: false,
      setShowAdvanced: (show) => set({ showAdvanced: show }),

      // Current page tracking
      currentPage: '',
      setCurrentPage: (page) => set({ currentPage: page }),

      // Filter state
      filters: defaultFilters,
      setFilters: (filters) => set({ filters }),
      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value }
        })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Navigation handling
      handleNavigation: (newPage) => {
        const { currentPage } = get();

        // If navigating away from incidents page, close advanced panel
        if (currentPage.includes('/incidents') && !newPage.includes('/incidents')) {
          set({ showAdvanced: false, currentPage: newPage });
        } else {
          set({ currentPage: newPage });
        }
      },

      // Helper functions
      getActiveFiltersCount: () => {
        const { filters } = get();
        return Object.values(filters).filter((value) => value !== '').length;
      },

      getAdvancedFiltersCount: () => {
        const { filters } = get();
        const advancedFields = ['category', 'severity', 'status', 'type', 'location', 'circuit'];
        return advancedFields.filter((field) => filters[field as keyof IncidentFilters] !== '')
          .length;
      },

      formatFilterValue: (value) => {
        return value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      }
    }),
    {
      name: 'incident-filters-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        showAdvanced: state.showAdvanced,
        currentPage: state.currentPage,
        filters: {
          search: state.filters.search,
          location: state.filters.location,
          circuit: state.filters.circuit // Also persist circuit filter
        }
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('Error rehydrating incident filters store:', error);
          return;
        }

        // Handle navigation detection on rehydration
        if (state && typeof window !== 'undefined') {
          const currentPage = window.location.pathname;
          const lastPage = state.currentPage;

          // If coming from different module, reset advanced panel
          if (lastPage && !currentPage.includes('/incidents') && lastPage.includes('/incidents')) {
            state.setShowAdvanced(false);
          }

          // If coming to incidents from different module, reset advanced panel
          if (currentPage.includes('/incidents') && lastPage && !lastPage.includes('/incidents')) {
            state.setShowAdvanced(false);
          }

          // Update current page
          state.setCurrentPage(currentPage);
        }
      }
    }
  )
);
