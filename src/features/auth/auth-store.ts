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
          set({ user, token, isAuthenticated: true }, false, 'auth/login');
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false }, false, 'auth/logout');
        }
      }),
      {
        name: 'auth-storage',
        onRehydrateStorage: () => {
          return (state) => {
            if (state?.token && state?.user) {
              useAuthStore.setState({
                isAuthenticated: true,
                hasHydrated: true,
                token: state.token,
                user: state.user
              });
            } else {
              useAuthStore.setState({ hasHydrated: true });
            }
          };
        }
      }
    )
  )
);
