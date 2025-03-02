
import en from "./locales/en.json";
import ar from "./locales/ar.json";
export default defineI18nConfig(() => ({
  fallbackLocale: "en",
  legacy: false,
  locale: "en",
  messages: { en, ar },
}));
