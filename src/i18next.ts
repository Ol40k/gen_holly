import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import EnglishTranslations from './locales/en/en.json';
import FrenchTranslations from './locales/fr/fr.json';
import GermanTranslations from './locales/de/de.json';
import SpanishTranslations from './locales/es/es.json';

const resources = {
  en: {
    translation: EnglishTranslations,
  },
  fr: {
    translation: FrenchTranslations,
  },
  de: {
    translation: GermanTranslations,
  },
  es: {
    translation: SpanishTranslations,
  },
};

export const initTranslations = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};
