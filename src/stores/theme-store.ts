import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        updateDocumentClass(theme);
      }
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        updateDocumentClass(state?.theme ?? 'system');
      }
    }
  )
);

function updateDocumentClass(theme: Theme) {
  const root = window.document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', isDark);
}
