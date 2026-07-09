// ── rankRegistry.ts ────────────────────────────────────────────
// Fondation V2/V3 de MAP. Registre central des rangs (grades) Deck et Engine.
// Ne pas importer ce fichier dans les leçons existantes ni dans l'UI en V1.
// Aucun comportement actuel de MAP ne doit dépendre de ce fichier.

export type CareerLevel = "cadet" | "rating" | "officer" | "management";

export type RankId =
  // Deck
  | "deck_cadet" | "os" | "ab" | "bosun" | "oow" | "chief_officer" | "master"
  // Engine
  | "engine_cadet" | "wiper" | "motorman" | "oiler"
  | "fourth_engineer" | "third_engineer" | "second_engineer" | "chief_engineer";

export interface RankDefinition {
  id: RankId;
  department: "deck" | "engine";
  careerLevel: CareerLevel;
  label: { fr: string; en: string; es: string; pt: string };
  /** Position ordinale dans la progression du département (1 = niveau d'entrée). */
  level: number;
}

// This registry is the single source of truth for all rank metadata used by MAP.
export const RANK_REGISTRY: Record<RankId, RankDefinition> = {
  // ── DECK ──────────────────────────────────────────────────
  deck_cadet: {
    id: "deck_cadet", department: "deck", careerLevel: "cadet", level: 1,
    label: { fr: "Cadet Pont", en: "Deck Cadet", es: "Cadete de Puente", pt: "Cadete de Convés" },
  },
  os: {
    id: "os", department: "deck", careerLevel: "rating", level: 2,
    label: { fr: "Matelot Léger (OS)", en: "Ordinary Seaman (OS)", es: "Marinero Ordinario (OS)", pt: "Marinheiro Ordinário (OS)" },
  },
  ab: {
    id: "ab", department: "deck", careerLevel: "rating", level: 3,
    label: { fr: "Matelot Qualifié (AB)", en: "Able Seaman (AB)", es: "Marinero Calificado (AB)", pt: "Marinheiro Qualificado (AB)" },
  },
  bosun: {
    id: "bosun", department: "deck", careerLevel: "rating", level: 4,
    label: { fr: "Maître d'Équipage (Bosun)", en: "Bosun", es: "Contramaestre (Bosun)", pt: "Contramestre (Bosun)" },
  },
  oow: {
    id: "oow", department: "deck", careerLevel: "officer", level: 5,
    label: { fr: "Officier Chef de Quart (OOW)", en: "Officer of the Watch (OOW)", es: "Oficial de Guardia (OOW)", pt: "Oficial de Quarto (OOW)" },
  },
  chief_officer: {
    id: "chief_officer", department: "deck", careerLevel: "officer", level: 6,
    label: { fr: "Second Capitaine", en: "Chief Officer", es: "Primer Oficial", pt: "Imediato" },
  },
  master: {
    id: "master", department: "deck", careerLevel: "management", level: 7,
    label: { fr: "Capitaine", en: "Master", es: "Capitán", pt: "Comandante" },
  },

  // ── ENGINE ────────────────────────────────────────────────
  engine_cadet: {
    id: "engine_cadet", department: "engine", careerLevel: "cadet", level: 1,
    label: { fr: "Cadet Machine", en: "Engine Cadet", es: "Cadete de Máquinas", pt: "Cadete de Máquinas" },
  },
  wiper: {
    id: "wiper", department: "engine", careerLevel: "rating", level: 2,
    label: { fr: "Nettoyeur (Wiper)", en: "Wiper", es: "Limpiador (Wiper)", pt: "Limpador (Wiper)" },
  },
  motorman: {
    id: "motorman", department: "engine", careerLevel: "rating", level: 3,
    label: { fr: "Motoriste", en: "Motorman", es: "Motorista", pt: "Motorista" },
  },
  oiler: {
    id: "oiler", department: "engine", careerLevel: "rating", level: 4,
    label: { fr: "Graisseur (Oiler)", en: "Oiler", es: "Engrasador (Oiler)", pt: "Lubrificador (Oiler)" },
  },
  fourth_engineer: {
    id: "fourth_engineer", department: "engine", careerLevel: "officer", level: 5,
    label: { fr: "Quatrième Mécanicien", en: "Fourth Engineer", es: "Cuarto Maquinista", pt: "Quarto Maquinista" },
  },
  third_engineer: {
    id: "third_engineer", department: "engine", careerLevel: "officer", level: 6,
    label: { fr: "Troisième Mécanicien", en: "Third Engineer", es: "Tercer Maquinista", pt: "Terceiro Maquinista" },
  },
  second_engineer: {
    id: "second_engineer", department: "engine", careerLevel: "officer", level: 7,
    label: { fr: "Second Mécanicien", en: "Second Engineer", es: "Segundo Maquinista", pt: "Segundo Maquinista" },
  },
  chief_engineer: {
    id: "chief_engineer", department: "engine", careerLevel: "management", level: 8,
    label: { fr: "Chef Mécanicien", en: "Chief Engineer", es: "Jefe de Máquinas", pt: "Chefe de Máquinas" },
  },
};

export function getRanksByDepartment(dept: "deck" | "engine"): RankDefinition[] {
  return Object.values(RANK_REGISTRY)
    .filter((r) => r.department === dept)
    .sort((a, b) => a.level - b.level);
}

export function getRankMeta(id: RankId): RankDefinition | undefined {
  return RANK_REGISTRY[id];
}
