// ── shipsLibraryIndex.ts ──────────────────────────────────────
// Maps each vesselTypeId (from vesselTypeRegistry.ts) to its Ships Library
// card component. Used only by ShipsPage to render the real card content.
// Lazy-loaded like the lesson components in MaritimeApp.tsx.
import { lazy } from "react";
import type { VesselTypeId } from "./vesselTypeRegistry";

export const SHIPS_LIBRARY_INDEX: Partial<Record<VesselTypeId, ReturnType<typeof lazy>>> = {
  container_ship: lazy(() => import("@/components/ContainerShip")),
  oil_tanker: lazy(() => import("@/components/OilTanker")),
  cruise_ship: lazy(() => import("@/components/CruiseShip")),
  lng_carrier: lazy(() => import("@/components/LngCarrier")),
  lpg_carrier: lazy(() => import("@/components/LpgCarrier")),
  chemical_tanker: lazy(() => import("@/components/ChemicalTanker")),
  passenger_ship: lazy(() => import("@/components/PassengerShip")),
  roro_passenger: lazy(() => import("@/components/RoroPassenger")),
  general_cargo: lazy(() => import("@/components/GeneralCargo")),
  bulk_carrier: lazy(() => import("@/components/BulkCarrier")),
  osv: lazy(() => import("@/components/OffshoreSupportVessel")),
  surfer: lazy(() => import("@/components/Surfer")),
  ahts: lazy(() => import("@/components/Ahts")),
  psv: lazy(() => import("@/components/Psv")),
  tugboat: lazy(() => import("@/components/Tugboat")),
  yacht: lazy(() => import("@/components/Yacht")),
  research_vessel: lazy(() => import("@/components/ResearchVessel")),
  fishing_vessel: lazy(() => import("@/components/FishingVessel")),
  dredger: lazy(() => import("@/components/Dredger")),
  cable_layer: lazy(() => import("@/components/CableLayer")),
  heavy_lift: lazy(() => import("@/components/HeavyLift")),
  jackup: lazy(() => import("@/components/Jackup")),
  drillship: lazy(() => import("@/components/Drillship")),
  fpso: lazy(() => import("@/components/Fpso")),
  fso: lazy(() => import("@/components/Fso")),
};
