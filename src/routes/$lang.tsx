import { createFileRoute } from "@tanstack/react-router";
import LanguageLayout from "../layouts/LanguageLayout";

export const Route = createFileRoute("/$lang")({
  component: LanguageLayout,
});
