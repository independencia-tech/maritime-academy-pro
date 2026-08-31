// ── coreAlgorithm.types.ts ───────────────────────────────────────
// MIS DE CÔTÉ — non utilisé dans le Core Algorithm actuel (redéfini le
// 2026-08-31). Conservé pour réutilisation future éventuelle de la
// logique de dédup/types. Voir project_core_algorithm_architecture.md
// pour la doctrine active.
//
// MAP Core V3.1 — Recommendation Engine data contract (spec points A, B,
// D, M in memory: project_core_algorithm_architecture.md, "V3.1 —
// Recommendation Engine Specification", CPLA-validated 2026-08-31).
//
// Étape 1 (types only) + Étape 2 addition (RecommendationProfile /
// RecommendationLearningState — the pipeline's input shapes, needed now
// that candidate generation in recommendationEngine.ts actually reads
// the registries). Still no scoring, deduplication, or UI wiring here.
//
// CandidateIdentity/RecommendationItem/RecommendationResult (Étape 1)
// are untouched below — this edit only adds new types, per the
// "additive, don't reopen a validated step" discipline held throughout
// this project.
//
// RecommendationProfile/RecommendationLearningState import RankId/
// VesselTypeId from their registries (type-only) — the coupling Étape 1
// explicitly deferred to this step. CandidateIdentity's own id fields
// stay `string` as validated at Étape 1, not upgraded here.

import type { RankId } from "./rankRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";

/** Which registry a recommendation candidate originates from. */
export type CandidateContentType = "lesson" | "specializedOperation";

/**
 * Identity of a lesson candidate — spec point B.
 *
 * `navigable` is fixed to `false` in V3.1: no working navigation target
 * exists for lessonRegistry.ts content yet (the lessonRegistry.ts ↔
 * Dashboard.tsx MODULES id mismatch — spec point K). This is a
 * structural fact of the type, not a runtime decision to compute later.
 */
export interface LessonCandidateIdentity {
  contentType: "lesson";
  /** Matches LessonId from lessonRegistry.ts (e.g. "e1-l1") — as of the
   * 2026-09-01 id cleanup, every entry uses this MODULES-format id; the
   * last holdout ("deck_colreg_l1", an orphan with no real MODULES
   * correspondence) was deleted, not renamed. */
  lessonId: string;
  /** Matches LessonRegistryItem.moduleId. */
  moduleId: string;
  navigable: false;
}

/**
 * Identity of a Specialized Operation candidate — spec point B.
 *
 * Carries both `operationId` and `vesselTypeId` — spec point L is
 * explicit that `vesselTypeId` alone is not sufficient for exact-content
 * navigation (it would only open the Ships Library's vessel view, not
 * the specific operation within it).
 */
export interface SpecOpsCandidateIdentity {
  contentType: "specializedOperation";
  /** Matches SpecializedOperationId from specializedOperationRegistry.ts. */
  operationId: string;
  /** Matches VesselTypeId from vesselTypeRegistry.ts. */
  vesselTypeId: string;
  navigable: true;
}

/**
 * Discriminated union — spec point B. Deduplication (spec point G) uses
 * `lessonId` within lesson candidates and `operationId` within
 * SpecOps candidates; the two id spaces are never compared against
 * each other.
 */
export type CandidateIdentity = LessonCandidateIdentity | SpecOpsCandidateIdentity;

/** The five scoring dimensions defined in spec point D. */
export type RecommendationDimension =
  | "currentRank"
  | "targetRank"
  | "learningProgression"
  | "department"
  | "dreamVessel";

/**
 * Per-dimension score — encodes spec point D's UNAVAILABLE handling. A
 * missing signal is never replaced by a supposed value: the
 * `available: false` branch carries the reason instead of a fabricated
 * numeric score. Dimensions in that branch are excluded from
 * relevancePct's denominator (renormalized over available dimensions
 * only), never treated as a zero match.
 */
export type DimensionScore =
  | { available: true; value: number; weight: number; contribution: number }
  | { available: false; reason: string };

/**
 * One entry per RecommendationDimension — spec point D's scoreBreakdown,
 * required for explicability ("on doit pouvoir observer pourquoi chaque
 * candidat a été choisi ou écarté").
 */
export type ScoreBreakdown = Record<RecommendationDimension, DimensionScore>;

/**
 * Localized display text. CORRECTED at Étape 8 (2026-08-31), when this
 * type was first actually assigned real registry data: originally
 * declared here as `{fr,en,es,pt}` with every field required, matching
 * this project's rankRegistry.ts/vesselTypeRegistry.ts label shape —
 * but `SpecializedOperation.title` (`specializedOperationRegistry.ts`)
 * actually reuses `roleOnBoardRegistry.ts`'s own `LocalizedText`, which
 * is `Partial<Record<SupportedLanguage, string>>` — every language
 * optional. Matches that real shape now (not the assumed one) — a
 * required-fields version would have been structurally incompatible
 * with real op.title values and produced a tsc error the moment
 * getRecommendationsForUser() assigned one. Consumers must handle a
 * missing language the same way Dashboard.tsx's existing render already
 * does elsewhere: `title[lang] ?? title.en ?? ...`, never assume every
 * key is present.
 */
export type LocalizedText = Partial<Record<"fr" | "en" | "es" | "pt", string>>;

/**
 * A single scored, ranked recommendation — spec point M.
 *
 * `relevancePct` is rawScore / maxPossibleScore computed over only the
 * available dimensions (spec point D) — always in [0,1], comparable
 * across candidates even when they don't share the same available
 * dimensions.
 */
export interface RecommendationItem {
  identity: CandidateIdentity;
  relevancePct: number;
  scoreBreakdown: ScoreBreakdown;
  title: LocalizedText;
}

/**
 * Pipeline-observability counts for a single getRecommendationsForUser()
 * call — spec point M. Deliberately minimal at Étape 1: only the two
 * fields the spec itself named. Further meta fields (e.g. a
 * safety-priority-injected flag, per-stage exclusion counts) are added
 * incrementally as the stages that produce them (spec points F, H, I)
 * are actually implemented, not pre-declared speculatively here.
 */
export interface RecommendationResultMeta {
  /** Candidates produced by candidate generation (spec point A), before any filtering. */
  totalCandidatesEvaluated: number;
  /** Candidates removed at any pipeline stage before the final top-N. */
  excludedCount: number;
}

/** Top-level return shape of the future getRecommendationsForUser() — spec point M. */
export interface RecommendationResult {
  items: RecommendationItem[];
  meta: RecommendationResultMeta;
}

// ── Étape 2 additions — pipeline input shapes ─────────────────────

/**
 * The User Profile / Status Data signals the engine consumes — spec
 * points A/C. `who` and `target` are nullable: `who` is never persisted
 * to Supabase today (localStorage-only), so it can legitimately be
 * absent even for a returning user. `dept` is never null in practice
 * (`user_profiles.dept` is `NOT NULL DEFAULT 'deck'`) but typed nullable
 * for defensive honesty rather than assumed. `ship` is optional by
 * design in the questionnaire itself, independent of any persistence gap.
 */
export interface RecommendationProfile {
  who: RankId | null;
  target: RankId | null;
  dept: "deck" | "engine" | null;
  ship: VesselTypeId | null;
}

/**
 * Learning Data available to the engine — spec point C/K.
 * `completedLessonIds` is carried here for interface stability across
 * future steps (scoring's learningProgression dimension, spec D) but is
 * NOT consumed by candidate generation (Étape 2) or any step yet: its
 * real values are MODULES-format ids (e.g. "s1-l1"), not LessonId-format
 * — comparing it against lessonRegistry.ts content today would be
 * exactly the unsafe cross-namespace comparison spec point K forbids.
 */
export interface RecommendationLearningState {
  completedLessonIds?: string[];
}

// ── Étape 3 additions — deduplication contract ────────────────────

/**
 * One raw, not-yet-deduplicated candidate occurrence — this is what
 * generateCandidates() (Étape 2) actually produces per rank on the path,
 * before Étape 3 merges duplicates. Carries `matchedRankId`: the single
 * rank on the path whose per-rank lookup produced this occurrence. A
 * content item tagged for multiple ranks on the path legitimately
 * appears as multiple RawCandidateOccurrence entries (same identity,
 * different matchedRankId) — that multiplicity is exactly what Étape 3
 * must preserve rather than silently collapse.
 */
export interface RawCandidateOccurrence {
  identity: CandidateIdentity;
  matchedRankId: RankId;
}

/**
 * A deduplicated candidate — Étape 3's output (spec point G). One entry
 * per unique `lessonId`/`operationId`, never merged across the two
 * content types. `matchedRankIds` lists every distinct rank on the path
 * whose per-rank generation independently produced this candidate —
 * preserved, not discarded, so this multi-signal provenance remains
 * observable even though Étape 4's scoring dimensions (spec D)
 * separately re-derive who/target relevance directly from the
 * registries rather than depending on this field.
 */
export interface DeduplicatedCandidate {
  identity: CandidateIdentity;
  matchedRankIds: RankId[];
}

// ── Étape 4 additions — scoring + threshold contract ──────────────

/**
 * A deduplicated candidate after scoring (spec point D) — Étape 4's
 * output. Deliberately WITHOUT `title`: unlike SpecializedOperation,
 * LessonRegistryItem carries no display-title field at all today (its
 * schema is `lessonId, department, moduleId, difficulty, targetRanks,
 * vesselTypes, stcwReference, requiredForExam, ..., status` — no
 * `title`/`label`). Fabricating one for lesson candidates would violate
 * the "never invent data" discipline held throughout this project.
 * `title` is therefore NOT part of the scoring stage's contract — it
 * belongs to whichever future step first assembles a UI-facing
 * RecommendationItem (title display only matters for `navigable: true`
 * content in V3.1 anyway, i.e. SpecOps, which does have `title`). This
 * is flagged, not silently resolved: the lessonRegistry.ts title gap
 * needs an explicit decision before any step needs to display a lesson
 * candidate's name.
 */
export interface ScoredCandidate {
  identity: CandidateIdentity;
  matchedRankIds: RankId[];
  relevancePct: number;
  scoreBreakdown: ScoreBreakdown;
}
