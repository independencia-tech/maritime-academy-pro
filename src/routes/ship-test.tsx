// TEMPORARY local preview route — isolated render of ContainerShip.tsx for Ships Library dev.
// Not part of the deliverable; remove after local validation.
import { createFileRoute } from "@tanstack/react-router";
import ContainerShip from "@/components/ContainerShip";

export const Route = createFileRoute("/ship-test")({
  component: () => <ContainerShip lang="fr" />,
});
