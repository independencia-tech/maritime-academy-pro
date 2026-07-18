// ── lessonRegistry.ts ──────────────────────────────────────────
// This registry is the single source of truth for all lesson metadata used by MAP.
//
// Fondation V2/V3 : ce fichier ne contient qu'un modèle de données et deux
// exemples de compilation. Il n'est importé nulle part ailleurs dans MAP en V1.
// Aucune leçon existante n'est modifiée, aucune UI n'affiche ces données,
// aucun comportement actuel de MAP ne dépend de ce fichier.
//
// Vocation future (non implémentée aujourd'hui) : Exam Center, Certificates MAP,
// Badges, Learning Roadmap, Career Advisor, Progress Analytics, STCW Mapping,
// recommandations IA. Le futur Maritime Lexicon utilisera aussi les IDs de ce
// registre (lessonIds, moduleIds) plutôt que des chaînes de caractères libres -
// mais LexiqueMaritime.tsx n'est pas modifié aujourd'hui.

import type { RankId } from "./rankRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";

export type LessonId = string;

export interface LessonRegistryItem {
  lessonId: LessonId;
  department: "deck" | "engine" | "safety";
  moduleId: string;

  difficulty: "foundation" | "intermediate" | "advanced";

  targetRanks: RankId[];
  vesselTypes: VesselTypeId[];

  stcwReference: string[];

  requiredForExam: boolean;
  recommendedForPromotion: boolean;

  examCategory: string[];
  badgeCategory: string[];
  certificateCategory: string[];

  estimatedStudyMinutes?: number;
  estimatedExamWeight?: number;

  prerequisites: LessonId[];
  recommendedBefore: LessonId[];
  recommendedAfter: LessonId[];

  status: "draft" | "active" | "deprecated";
}

// Registre indexé par lessonId - vide en V1 hormis les deux exemples ci-dessous,
// nécessaires uniquement pour valider que la structure compile.
export const LESSON_REGISTRY: Record<LessonId, LessonRegistryItem> = {
  deck_colreg_l1: {
    lessonId: "deck_colreg_l1",
    department: "deck",
    moduleId: "colreg",
    difficulty: "foundation",
    targetRanks: [],
    vesselTypes: [],
    stcwReference: [],
    requiredForExam: false,
    recommendedForPromotion: false,
    examCategory: [],
    badgeCategory: [],
    certificateCategory: [],
    prerequisites: [],
    recommendedBefore: [],
    recommendedAfter: [],
    status: "draft",
  },
  deck_meteo_l1: {
    lessonId: "deck_meteo_l1",
    department: "deck",
    moduleId: "d7",
    difficulty: "foundation",
    targetRanks: ["deck_cadet", "os", "ab", "bosun"],
    vesselTypes: [],
    stcwReference: [],
    requiredForExam: false,
    recommendedForPromotion: false,
    examCategory: [],
    badgeCategory: [],
    certificateCategory: [],
    prerequisites: [],
    recommendedBefore: [],
    recommendedAfter: [],
    status: "draft",
  },
  deck_meteo_l2: {
    lessonId: "deck_meteo_l2",
    department: "deck",
    moduleId: "d7",
    difficulty: "foundation",
    targetRanks: ["deck_cadet", "os", "ab", "bosun"],
    vesselTypes: [],
    stcwReference: [],
    requiredForExam: false,
    recommendedForPromotion: false,
    examCategory: [],
    badgeCategory: [],
    certificateCategory: [],
    prerequisites: ["deck_meteo_l1"],
    recommendedBefore: [],
    recommendedAfter: [],
    status: "draft",
  },
  deck_meteo_l3: {
    lessonId: "deck_meteo_l3",
    department: "deck",
    moduleId: "d7",
    difficulty: "foundation",
    targetRanks: ["deck_cadet", "os", "ab", "bosun"],
    vesselTypes: [],
    stcwReference: [],
    requiredForExam: false,
    recommendedForPromotion: false,
    examCategory: [],
    badgeCategory: [],
    certificateCategory: [],
    prerequisites: ["deck_meteo_l2"],
    recommendedBefore: [],
    recommendedAfter: [],
    status: "draft",
  },
  e3_l1_boiler_types: {
    lessonId: "e3_l1_boiler_types",
    department: "engine",
    moduleId: "boilers_steam_systems",
    difficulty: "foundation",
    targetRanks: [],
    vesselTypes: [],
    stcwReference: [],
    requiredForExam: false,
    recommendedForPromotion: false,
    examCategory: [],
    badgeCategory: [],
    certificateCategory: [],
    prerequisites: [],
    recommendedBefore: [],
    recommendedAfter: [],
    status: "draft",
  },
};

export function getLessonMeta(lessonId: LessonId): LessonRegistryItem | undefined {
  return LESSON_REGISTRY[lessonId];
}

// Stub - retourne toujours [] en V1. Logique réelle à implémenter lors de la
// construction d'Exam Center / Learning Roadmap / Career Advisor.
export function getLessonsForRank(_rankId: RankId): LessonRegistryItem[] {
  return [];
}

// Stub - retourne toujours [] en V1. Logique réelle à implémenter lors de la
// construction des modules Specialized Operations / Career Advisor.
export function getLessonsForVessel(_vesselTypeId: VesselTypeId): LessonRegistryItem[] {
  return [];
}
