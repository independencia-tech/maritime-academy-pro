import { createFileRoute } from "@tanstack/react-router";
import MaritimeApp from "@/components/MaritimeApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maritime Academy Pro — Formation maritime alignée sur les standards IMO/STCW" },
      { name: "description", content: "La formation maritime complète — pont et machine. Alignée sur les standards IMO, STCW, SOLAS, MARPOL et COLREG, accessible dans ta langue." },
      { property: "og:title", content: "Maritime Academy Pro" },
      { property: "og:description", content: "Formation maritime alignée sur les standards IMO/STCW — FR · EN · ES · PT" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MaritimeApp />;
}
