import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "./locales/id/translation.json";
import en from "./locales/en/translation.json";
import ja from "./locales/ja/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    id: { translation: id },
    en: { translation: en },
    ja: { translation: ja }
  },
  lng: "id", // default bahasa
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
