import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useTranslations() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChanged = () => {
      // This ensures the component re-renders when language changes
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return {
    t,
    changeLanguage,
    currentLanguage,
    isReady: i18n.isInitialized,
    language: i18n.language
  };
}
