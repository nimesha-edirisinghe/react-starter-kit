import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir();

    const handleLanguageChanged = () => {
      window.dispatchEvent(new Event('languageChanged'));
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n.language]);

  return <>{children}</>;
}
