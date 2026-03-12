import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en/translation.json"
import al from "./locales/al/translation.json"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    al: { translation: al }
  },
  lng: localStorage.getItem("lang") || "al",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
})

export default i18n