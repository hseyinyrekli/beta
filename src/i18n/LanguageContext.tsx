import { createContext, useContext, useEffect, useState } from "react";
import {
  getInitialLanguage,
  saveLanguage,
  translate,
} from "../services/languageService";
import type {
  Language,
  LanguageContextValue,
  LanguageProviderProps,
  TranslationParams,
} from "../types";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  const t = (key: string, params: TranslationParams = {}) =>
    translate(language, key, params);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
