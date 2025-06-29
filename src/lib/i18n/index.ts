import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import enTranslations from './locales/en/translation.json';
import svTranslations from './locales/sv/translation.json';
import deTranslations from './locales/de/translation.json';

const resources = {
  en: {
    translation: enTranslations
  },
  sv: {
    translation: svTranslations
  },
  de: {
    translation: deTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }

    // Remove backend configuration since we're importing JSON directly
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // }
  });

export default i18n;
