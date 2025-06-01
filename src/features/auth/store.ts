import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        hasHydrated: false,

        login: (user, token) => {
          localStorage.setItem('auth-token', token);
          set({ user, token, isAuthenticated: true }, false, 'auth/login');
        },

        logout: () => {
          localStorage.removeItem('auth-token');
          set({ user: null, token: null, isAuthenticated: false }, false, 'auth/logout');
        }
      }),
      {
        name: 'auth-storage',
        onRehydrateStorage: () => {
          return () => {
            useAuthStore.setState({ hasHydrated: true });
          };
        }
      }
    )
  )
);
