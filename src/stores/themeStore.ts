import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: ThemeState['theme']) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        setTheme: (theme) => set({ theme }, false, 'theme/setTheme')
      }),
      {
        name: 'theme-storage'
      }
    ),
    {
      name: 'ThemeStore'
    }
  )
);
