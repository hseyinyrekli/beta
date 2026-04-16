import { Outlet, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../types";
import MainLayout from "./MainLayout";

export default function LanguageLayout() {
  const { lang } = useParams({ from: "/$lang" });
  const { setLanguage } = useLanguage();
  const safeLanguage: Language = lang === "en" ? "en" : "tr";

  useEffect(() => {
    setLanguage(safeLanguage);
  }, [safeLanguage, setLanguage]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
