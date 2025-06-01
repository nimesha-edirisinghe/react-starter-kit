import { Moon, Sun } from 'lucide-react';
import { Toggle } from '~/components/ui/toggle';
import { useThemeStore } from '~/stores/themeStore';

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={handleToggle}
      aria-label="Toggle theme"
      className="rounded-full cursor-pointer"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-800 dark:text-white" />
      )}
    </Toggle>
  );
};
