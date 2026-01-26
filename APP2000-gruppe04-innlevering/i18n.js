// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en/translation.json';
import translationNO from './locales/no/translation.json';
import translationRU from './locales/ru/translation.json';

// Initialize i18next
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEN,
            },
            no: {
                translation: translationNO,
            },
            ru: {
                translation: translationRU,
            },
        },
        lng: 'no', // Default language
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;