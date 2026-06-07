import { createFileRoute } from "@tanstack/react-router";
import MaritimeApp from "@/components/MaritimeApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maritime Academy Pro — Formation maritime IMO/STCW" },
      { name: "description", content: "La formation maritime complète — pont et machine. Certifiée IMO/STCW, accessible dans ta langue." },
      { property: "og:title", content: "Maritime Academy Pro" },
      { property: "og:description", content: "Formation maritime certifiée IMO/STCW — FR · EN · ES · PT" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MaritimeApp />;
}
