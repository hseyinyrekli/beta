import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import translations from "./translations.json";

export type Language = "tr" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "todo-atlas-language";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const routeLanguage = window.location.pathname.split("/")[1];

    if (routeLanguage === "tr" || routeLanguage === "en") {
      return routeLanguage;
    }

    return "tr";
  });

  useEffect(() => {
    const routeLanguage = window.location.pathname.split("/")[1];

    if (routeLanguage === "tr" || routeLanguage === "en") {
      setLanguage(routeLanguage);
      return;
    }

    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (storedLanguage === "tr" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = (key: string, params: Record<string, string | number> = {}) => {
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
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
