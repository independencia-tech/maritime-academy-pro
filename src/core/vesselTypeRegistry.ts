// ── vesselTypeRegistry.ts ──────────────────────────────────────
// Fondation V2/V3 de MAP. Registre central des types de navires.
// IMPORTANT : `category` regroupe uniquement pour l'affichage/filtrage.
// Chaque `vesselType` reste précis et distinct - aucune fusion de types
// proches (ex: Oil Tanker / Chemical Tanker / LNG / LPG restent 4 IDs
// séparés) car ils serviront individuellement aux futurs modules
// Specialized Operations, examens, badges, Career Advisor et MarineVerify.
// Ne pas importer ce fichier dans les leçons existantes ni dans l'UI en V1.

export type VesselCategory = "all" | "commercial" | "offshore" | "passenger" | "fishing" | "special";

export type VesselTypeId =
  | "all"
  // Commercial
  | "general_cargo" | "container_ship" | "bulk_carrier"
  | "oil_tanker" | "chemical_tanker" | "lng_carrier" | "lpg_carrier"
  // Offshore
  | "ahts" | "psv" | "tugboat" | "osv" | "surfer"
  // Passenger
  | "passenger_ship" | "roro_passenger" | "cruise_ship"
  // Fishing
  | "fishing_vessel"
  // Special
  | "yacht" | "research_vessel" | "dredger" | "cable_layer"
  | "heavy_lift" | "jackup" | "drillship" | "fpso" | "fso";

export interface VesselTypeDefinition {
  id: VesselTypeId;
  category: VesselCategory;
  label: { fr: string; en: string; es: string; pt: string };
}

// This registry is the single source of truth for all vessel type metadata used by MAP.
export const VESSEL_TYPE_REGISTRY: Record<VesselTypeId, VesselTypeDefinition> = {
  all: { id: "all", category: "all", label: { fr: "Tous types", en: "All types", es: "Todos los tipos", pt: "Todos os tipos" } },

  // ── COMMERCIAL ────────────────────────────────────────────
  general_cargo: { id: "general_cargo", category: "commercial", label: { fr: "Cargo Général", en: "General Cargo", es: "Carga General", pt: "Carga Geral" } },
  container_ship: { id: "container_ship", category: "commercial", label: { fr: "Porte-Conteneurs", en: "Container Ship", es: "Portacontenedores", pt: "Porta-Contentores" } },
  bulk_carrier: { id: "bulk_carrier", category: "commercial", label: { fr: "Vraquier", en: "Bulk Carrier", es: "Granelero", pt: "Graneleiro" } },
  oil_tanker: { id: "oil_tanker", category: "commercial", label: { fr: "Pétrolier", en: "Oil Tanker", es: "Petrolero", pt: "Petroleiro" } },
  chemical_tanker: { id: "chemical_tanker", category: "commercial", label: { fr: "Chimiquier", en: "Chemical Tanker", es: "Quimiquero", pt: "Quimiqueiro" } },
  lng_carrier: { id: "lng_carrier", category: "commercial", label: { fr: "Méthanier (GNL)", en: "LNG Carrier", es: "Metanero (GNL)", pt: "Metaneiro (GNL)" } },
  lpg_carrier: { id: "lpg_carrier", category: "commercial", label: { fr: "Gazier (GPL)", en: "LPG Carrier", es: "Gasero (GLP)", pt: "Gaseiro (GLP)" } },

  // ── OFFSHORE ──────────────────────────────────────────────
  ahts: { id: "ahts", category: "offshore", label: { fr: "Remorqueur de Soutien (AHTS)", en: "Anchor Handling Tug Supply (AHTS)", es: "Remolcador de Manejo de Anclas (AHTS)", pt: "Rebocador de Manuseio de Âncoras (AHTS)" } },
  psv: { id: "psv", category: "offshore", label: { fr: "Navire Ravitailleur (PSV)", en: "Platform Supply Vessel (PSV)", es: "Buque de Suministro (PSV)", pt: "Navio de Abastecimento (PSV)" } },
  tugboat: { id: "tugboat", category: "offshore", label: { fr: "Remorqueur", en: "Tugboat", es: "Remolcador", pt: "Rebocador" } },
  osv: { id: "osv", category: "offshore", label: { fr: "Navire de Soutien Offshore (OSV)", en: "Offshore Support Vessel (OSV)", es: "Buque de Apoyo Offshore (OSV)", pt: "Navio de Apoio Offshore (OSV)" } },
  surfer: { id: "surfer", category: "offshore", label: { fr: "Vedette de Franchissement de Barre (Surfer)", en: "Surf Boat (Surfer)", es: "Lancha de Cruce de Rompientes (Surfer)", pt: "Lancha de Transposição de Arrebentação (Surfer)" } },

  // ── PASSENGER ─────────────────────────────────────────────
  passenger_ship: { id: "passenger_ship", category: "passenger", label: { fr: "Navire à Passagers", en: "Passenger Ship", es: "Buque de Pasajeros", pt: "Navio de Passageiros" } },
  roro_passenger: { id: "roro_passenger", category: "passenger", label: { fr: "Ferry Ro-Ro Passagers", en: "Ro-Ro Passenger Ferry", es: "Ferry Ro-Ro de Pasajeros", pt: "Ferry Ro-Ro de Passageiros" } },
  cruise_ship: { id: "cruise_ship", category: "passenger", label: { fr: "Navire de Croisière", en: "Cruise Ship", es: "Buque de Crucero", pt: "Navio de Cruzeiro" } },

  // ── FISHING ───────────────────────────────────────────────
  fishing_vessel: { id: "fishing_vessel", category: "fishing", label: { fr: "Navire de Pêche", en: "Fishing Vessel", es: "Buque Pesquero", pt: "Navio de Pesca" } },

  // ── SPECIAL ───────────────────────────────────────────────
  yacht: { id: "yacht", category: "special", label: { fr: "Yacht", en: "Yacht", es: "Yate", pt: "Iate" } },
  research_vessel: { id: "research_vessel", category: "special", label: { fr: "Navire de Recherche", en: "Research Vessel", es: "Buque de Investigación", pt: "Navio de Pesquisa" } },
  dredger: { id: "dredger", category: "special", label: { fr: "Drague", en: "Dredger", es: "Draga", pt: "Draga" } },
  cable_layer: { id: "cable_layer", category: "special", label: { fr: "Câblier", en: "Cable Layer", es: "Cablero", pt: "Navio Lança-Cabos" } },
  heavy_lift: { id: "heavy_lift", category: "special", label: { fr: "Navire de Levage Lourd", en: "Heavy Lift Vessel", es: "Buque de Carga Pesada", pt: "Navio de Carga Pesada" } },
  jackup: { id: "jackup", category: "special", label: { fr: "Plateforme Auto-élévatrice (Jack-up)", en: "Jack-up Rig", es: "Plataforma Autoelevable (Jack-up)", pt: "Plataforma Autoelevatória (Jack-up)" } },
  drillship: { id: "drillship", category: "special", label: { fr: "Navire de Forage", en: "Drillship", es: "Buque Perforador", pt: "Navio-Sonda" } },
  fpso: { id: "fpso", category: "special", label: { fr: "Unité Flottante de Production (FPSO)", en: "Floating Production Storage and Offloading (FPSO)", es: "Unidad Flotante de Producción (FPSO)", pt: "Unidade Flutuante de Produção (FPSO)" } },
  fso: { id: "fso", category: "special", label: { fr: "Unité Flottante de Stockage (FSO)", en: "Floating Storage and Offloading (FSO)", es: "Unidad Flotante de Almacenamiento (FSO)", pt: "Unidade Flutuante de Armazenamento (FSO)" } },
};

export function getVesselTypesByCategory(category: VesselCategory): VesselTypeDefinition[] {
  return Object.values(VESSEL_TYPE_REGISTRY).filter((v) => v.category === category);
}

export function getVesselTypeMeta(id: VesselTypeId): VesselTypeDefinition | undefined {
  return VESSEL_TYPE_REGISTRY[id];
}
