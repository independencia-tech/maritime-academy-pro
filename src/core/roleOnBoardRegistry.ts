// ── roleOnBoardRegistry.ts ──────────────────────────────────────
// This registry is the single source of truth for Role On Board data used by MAP.
//
// Layer 0, like Ships Library and Maritime Lexicon: free, independent of
// user profile, progression, MAP Core or Billing. One card = one complete
// rank (RankId), not one card per rank x phase. 15 cards at completion
// (7 Deck + 8 Engine), indexed by the RankId already defined in
// rankRegistry.ts (not modified here — this file only references it by id).
//
// Schema-only foundation: this file defines the data model and a
// documentary example (see audits/2026-07-24_role-on-board-schema.md), but
// ships with an EMPTY registry. No pedagogical/editorial content is
// authored here. No UI currently reads this file.

import type { RankId } from "./rankRegistry";
import type { LessonId } from "./lessonRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";

// ── I18N ──────────────────────────────────────────────────────
// Content strings accept PARTIAL translations — a card can exist in a
// single language without the other 3 being present, and must not error or
// render an empty block for a missing language. "en" is the recommended
// reference language when resolving a fallback (see resolveLocalizedText
// below). This is distinct from RoleOnBoardShared's own fixed UI chrome
// strings (button labels, section titles), which — like LessonShared.tsx's
// `T` — are authored ahead of time by developers and therefore keep the
// existing required-all-4-languages convention already used across MAP
// (rankRegistry.ts, vesselTypeRegistry.ts). Only user/editorial CONTENT
// uses this partial type.
export type SupportedLanguage = "en" | "fr" | "es" | "pt";
export type LocalizedText = Partial<Record<SupportedLanguage, string>>;

// No pre-existing partial-translation resolver was found elsewhere in the
// repo to reuse (rankRegistry.ts / vesselTypeRegistry.ts both require all 4
// languages inline; lessonRegistry.ts carries no display text at all) — this
// is the single, minimal resolution helper for LocalizedText, not a second
// parallel i18n system.
export function resolveLocalizedText(
  text: LocalizedText | undefined,
  lang: SupportedLanguage
): string | undefined {
  if (!text) return undefined;
  return text[lang] ?? text.en;
}

// Resolves a list of LocalizedText items to display strings for `lang`,
// dropping any item that has neither `lang` nor the "en" fallback — so a
// partially-translated list never renders an empty bullet.
export function resolveLocalizedTextList(
  items: LocalizedText[] | undefined,
  lang: SupportedLanguage
): string[] {
  if (!items) return [];
  const out: string[] = [];
  for (const item of items) {
    const resolved = resolveLocalizedText(item, lang);
    if (resolved) out.push(resolved);
  }
  return out;
}

// ── MAP REFERENCES ───────────────────────────────────────────
// "MAP References" (per operational phase) and "Ressources MAP" (card-level
// section) must be structured, typed references — not free URLs or plain
// text. Reuses LessonId / VesselTypeId where a reference genuinely points
// at existing MAP content. No such registry-backed id exists yet for
// regulatory/external references (e.g. an STCW code), so "external" is a
// small local strict type rather than a bare string embedded directly in a
// reference list.
export type MapReferenceKind = "lesson" | "vesselType" | "external";

export interface MapReference {
  kind: MapReferenceKind;
  /** Required when kind === "lesson". */
  lessonId?: LessonId;
  /** Required when kind === "vesselType". */
  vesselTypeId?: VesselTypeId;
  /** Required when kind === "external" (e.g. a regulatory code such as "STCW III/1") — no MAP registry exists for this yet. */
  externalCode?: string;
  /** Optional author-provided display label — lessonRegistry.ts carries no title text to look up automatically. */
  label?: LocalizedText;
}

// ── OPERATIONAL PHASES ───────────────────────────────────────
// The 8 operational phases share ONE common structure (OperationalPhase),
// stored in a single `operationalPhases` block keyed by phase id — not a
// plain array — so each phase has a stable identifier for links, UI
// anchors, display order and future cross-references.
export type OperationalPhaseId =
  | "pre_departure_preparation"
  | "departure_manoeuvres"
  | "navigation"
  | "anchoring"
  | "port_operations"
  | "ship_to_ship_operations"
  | "maintenance"
  | "emergency_situations";

// Canonical display order for the 8 phases (matches the order they were
// specified in). RoleOnBoardShared iterates this array rather than
// `Object.keys(operationalPhases)`, whose key order is not a reliable
// display-order guarantee.
export const OPERATIONAL_PHASE_ORDER: OperationalPhaseId[] = [
  "pre_departure_preparation",
  "departure_manoeuvres",
  "navigation",
  "anchoring",
  "port_operations",
  "ship_to_ship_operations",
  "maintenance",
  "emergency_situations",
];

export interface OperationalPhase {
  overview?: LocalizedText;
  responsibilities?: LocalizedText[];
  equipment?: LocalizedText[];
  risks?: LocalizedText[];
  bestPractices?: LocalizedText[];
  commonMistakes?: LocalizedText[];
  professionalTips?: LocalizedText[];
  mapReferences?: MapReference[];
  notes?: LocalizedText;
}

// Every field is independently optional — a phase only fills in what's
// relevant to it, the schema itself never changes.
export type OperationalPhases = Partial<Record<OperationalPhaseId, OperationalPhase>>;

// ── ORGANIZATIONAL POSITION ──────────────────────────────────
// The 4 relationship dimensions from the original product vision document
// (Reports to / Works with / Mentors / Supports) — not a flat text list.
export interface OrganizationalPosition {
  reportsTo?: LocalizedText[];
  worksWith?: LocalizedText[];
  mentors?: LocalizedText[];
  supports?: LocalizedText[];
}

// ── PROFESSIONAL SKILLS ──────────────────────────────────────
// Each skill can link to one or more MAP references (e.g. the lessons that
// teach it) — not a flat text list.
export interface ProfessionalSkill {
  label: LocalizedText;
  mapReferences?: MapReference[];
}

// ── AUTHORITY LIMITS ─────────────────────────────────────────
export interface AuthorityLimits {
  youCan?: LocalizedText[];
  youCannot?: LocalizedText[];
}

// ── PROFESSIONAL RESPONSIBILITY MATRIX ───────────────────────
// The 4 responsibility dimensions are NOT repeated per phase — they form a
// single end-of-card summary section.
export interface ProfessionalResponsibilityMatrix {
  iExecute?: LocalizedText[];
  iMonitor?: LocalizedText[];
  iReport?: LocalizedText[];
  iDoNotAuthorize?: LocalizedText[];
}

// ── MEDIA ─────────────────────────────────────────────────────
// No media-asset registry exists elsewhere in the repo, so this is a small
// local strict type (kind + optional caption + optional source), evolving
// as media support grows — not a bare string.
export type RoleOnBoardMediaKind = "image" | "video" | "diagram" | "document";

export interface RoleOnBoardMediaItem {
  kind: RoleOnBoardMediaKind;
  caption?: LocalizedText;
  /** Local asset path or URL. Free-form: no asset-id registry exists to reuse. */
  src?: string;
}

// ── ROLE ON BOARD CARD ────────────────────────────────────────
// One card per RankId. Every section is independently optional
// (block-independence principle): RoleOnBoardShared must render
// conditionally per section and keep working normally when a section is
// absent — never an error, never a default empty block.
export interface RoleOnBoardCard {
  rankId: RankId;

  /** Présentation du métier */
  roleOverview?: LocalizedText[];
  /** Position dans l'organisation */
  organizationalPosition?: OrganizationalPosition;
  /** Compétences professionnelles */
  professionalSkills?: ProfessionalSkill[];
  /** The 8 operational phases, keyed by OperationalPhaseId. */
  operationalPhases?: OperationalPhases;
  /** Practical Scenarios */
  practicalScenarios?: LocalizedText[];
  /** Professional Tips — card-wide, distinct from each phase's own professionalTips. */
  professionalTips?: LocalizedText[];
  /** Professional Mindset */
  professionalMindset?: LocalizedText[];
  /** Documentation professionnelle */
  professionalDocumentation?: LocalizedText[];
  /** Responsabilités environnementales */
  environmentalResponsibilities?: LocalizedText[];
  /** Limites d'autorité (You can / You cannot) */
  authorityLimits?: AuthorityLimits;
  /** Common Mistakes — card-wide, distinct from each phase's own commonMistakes. */
  commonMistakes?: LocalizedText[];
  /** Évolution professionnelle */
  careerProgression?: LocalizedText[];
  /** Ressources MAP */
  mapResources?: MapReference[];
  /** Professional Responsibility Matrix (single end-of-card summary). */
  responsibilityMatrix?: ProfessionalResponsibilityMatrix;
  /** Support multimédia évolutif */
  media?: RoleOnBoardMediaItem[];
}

// ── REGISTRY ──────────────────────────────────────────────────
// Indexed by RankId (rankRegistry.ts is the source of truth for valid ids).
// Partial: not every rank has a card yet — starts empty. No example entries
// are compiled here (see the documentary, non-executed example in
// audits/2026-07-24_role-on-board-schema.md).
export const ROLE_ON_BOARD_REGISTRY: Partial<Record<RankId, RoleOnBoardCard>> = {};

export function getRoleOnBoardCard(rankId: RankId): RoleOnBoardCard | undefined {
  return ROLE_ON_BOARD_REGISTRY[rankId];
}
