import translations from "../i18n/translations.json";
import type { Language, TranslationParams } from "../types";

const STORAGE_KEY = "todo-atlas-language";

export function isLanguage(value: string | null): value is Language {
  return value === "tr" || value === "en";
}

export function getInitialLanguage(): Language {
  const routeLanguage = window.location.pathname.split("/")[1];
  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

  if (isLanguage(routeLanguage)) {
    return routeLanguage;
  }

  if (isLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return "tr";
}

export function saveLanguage(language: Language) {
  window.localStorage.setItem(STORAGE_KEY, language);
}

export function translate(
  language: Language,
  key: string,
  params: TranslationParams = {},
) {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, translations[language]);

  if (typeof value !== "string") {
    return key;
  }

  return Object.entries(params).reduce(
    (text, [paramKey, paramValue]) =>
      text.replaceAll(`{${paramKey}}`, String(paramValue)),
    value,
  );
}
