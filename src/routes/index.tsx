import { createFileRoute } from "@tanstack/react-router";
import MaritimeApp from "@/components/MaritimeApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maritime Academy Pro — Formation maritime IMO/STCW" },
      { name: "description", content: "La première plateforme de formation maritime certifiée IMO/STCW, du cadet au capitaine, dans ta langue." },
      { property: "og:title", content: "Maritime Academy Pro" },
      { property: "og:description", content: "Formation maritime certifiée IMO/STCW — FR · EN · ES · PT" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MaritimeApp />;
}
