import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Navigate params={{ lang: "tr" }} to="/$lang" />,
});
