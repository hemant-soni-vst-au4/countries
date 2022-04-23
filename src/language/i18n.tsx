import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'

i18n
  .use(Backend) // load translation  see /public/locales.

  // .use(LanguageDetector) // detect user language

  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    backend: {
      // translations are in the locales assets folder
      loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
      addPath: '/assets/locales/add/{{lng}}/{{ns}}',
      allowMultiLoading: false,
    },
    // defaultNS: 'translation',
    fallbackLng: 'en', // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n;
