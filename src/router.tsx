import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useLanguage, type Language } from "./i18n/LanguageContext";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate params={{ lang: "tr" }} to="/$lang" />,
});

const languageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$lang",
  component: LanguageLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => languageRoute,
  path: "/",
  component: HomePage,
});

const englishContactRoute = createRoute({
  getParentRoute: () => languageRoute,
  path: "contact",
  component: ContactPage,
});

const turkishContactRoute = createRoute({
  getParentRoute: () => languageRoute,
  path: "iletisim",
  component: ContactPage,
});

function LanguageLayout() {
  const { lang } = languageRoute.useParams();
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  languageRoute.addChildren([homeRoute, englishContactRoute, turkishContactRoute]),
]);

export const router = createRouter({ routeTree });

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
