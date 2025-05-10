import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// noinspection SpellCheckingInspection
i18n
    .use(HttpBackend) // load translations via HTTP
    .use(LanguageDetector) // detect user language
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        "supportedLngs": ['en', 'fr', 'hi', 'zh'],
        debug: true,
        interpolation: {
            escapeValue: false, // React already escapes
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        react: {
            useSuspense: true,
        },
    });

export default i18n;
