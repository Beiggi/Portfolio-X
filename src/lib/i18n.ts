// /src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '@/locales/en/translation.json';
import translationES from '@/locales/es/translation.json';
import translationIT from '@/locales/it/translation.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  it: { translation: translationIT },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
  });

export default i18n;
