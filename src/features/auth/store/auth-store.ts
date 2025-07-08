import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { UserRole } from '../types/auth';
import { useTimezoneStore, COUNTRIES } from '~/stores/timezone-store';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isHydrated: false,

        login: (user, token) => {
          set({ user, token, isAuthenticated: true }, false, 'auth/login');
          // Set timezone to Sri Lanka
          const sriLanka = COUNTRIES.find((country) => country.code === 'LK');
          if (sriLanka) {
            useTimezoneStore.getState().setSelectedCountry(sriLanka);
          }
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false }, false, 'auth/logout');
          // Reset timezone to Sri Lanka
          const sriLanka = COUNTRIES.find((country) => country.code === 'LK');
          if (sriLanka) {
            useTimezoneStore.getState().setSelectedCountry(sriLanka);
          }
        },

        setHydrated: (state) => {
          set({ isHydrated: state }, false, 'auth/setHydrated');
        }
      }),
      {
        name: 'auth-storage',
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setHydrated(true);
          }
        }
      }
    )
  )
);
