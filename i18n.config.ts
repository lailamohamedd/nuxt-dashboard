
import en from "./i18n/locales/en.json";
import ar from "./i18n/locales/ar.json";
export default defineI18nConfig(() => ({
  fallbackLocale: "en",
  legacy: false,
  locale: "en",
  messages: { en, ar },
}));
