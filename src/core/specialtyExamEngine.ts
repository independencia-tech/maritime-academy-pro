// ── specialtyExamEngine.ts ───────────────────────────────────────
// Scoring engine for Specialty Exams (AHTS pilot). Deliberately NOT an
// extension of examEngine.ts — Specialty content (exercises, interactive
// decision-tree scenarios) is structurally incompatible with Foundation's
// flat {q,opts,correct,expl} MCQ pool, so the scoring logic here is
// genuinely new rather than a parametrized reuse. Foundation's tracking/
// cooldown layer (exam_attempts, useModuleExam) IS reused as-is, keyed by
// shipTypeId in place of moduleId — see project memory,
// project_exams_system_architecture.md, for the full architecture cadrage.
//
// Engine-only, no UI, no persistence — mirrors the exact staging Foundation
// used for its own d1 pilot ("Engine-only validation (no UI)" first).
//
// Method locked 2026-09-07, CPLA-validated before this file was written:
// - error_identification / readiness_checklist: fractional (correct items
//   / total items) — a single miscue shouldn't zero out a whole checklist.
// - sequence_reordering: binary — a partially-correct sequence has no
//   operational meaning; it's either the right order or a fault.
// - interactiveScenario: the path actually taken is scored by averaging
//   each chosen option's quality weight (optimal=1.0 / acceptable=0.5 /
//   poor=0), not the whole tree — only the decisions the learner actually
//   made count.
// - Per operation: 60% scenario / 40% exercises — deliberately NOT equal
//   weight, because the scenario is the exact competency this dedicated
//   architecture exists to preserve (vs. a QCM conversion, explicitly
//   rejected). Diluting it to parity with a checklist would undercut the
//   reason this file exists.
// - Per ship: NO compensation across operations. Every operation must
//   individually clear EXAM_PASS_THRESHOLD; a strong operation can never
//   offset a failed one. AHTS has 2 operations (rig mooring, fire
//   response) of genuinely different stakes — averaging them would let a
//   good mooring score paper over a failed fire response, which is
//   exactly the outcome this rule exists to prevent.

import { EXAM_PASS_THRESHOLD } from "./examEngine";

export type SpecialtyExerciseType = "sequence_reordering" | "error_identification" | "readiness_checklist";

export type OptionQuality = "optimal" | "acceptable" | "poor";

// Mirrors ScenarioOption's isRecommended/quality fields (specializedOperationRegistry.ts)
// without importing that file's full type — keeps this engine decoupled from
// the content schema's exact shape, only the two fields it actually reads.
export interface GradableScenarioOption {
  isRecommended?: boolean;
  quality?: "acceptable" | "poor";
}

/**
 * Derives the 3-tier quality of a chosen option from the content schema's
 * two fields. Fail-safe default is "poor" (zero credit) for an option that
 * is neither recommended nor quality-tagged — content not yet classified
 * (any operation beyond the AHTS pilot, today) must never silently grant
 * credit; the safe failure mode is under-crediting, not over-crediting.
 */
export function optionQuality(opt: GradableScenarioOption): OptionQuality {
  if (opt.isRecommended) return "optimal";
  return opt.quality ?? "poor";
}

const QUALITY_WEIGHT: Record<OptionQuality, number> = {
  optimal: 1,
  acceptable: 0.5,
  poor: 0,
};

/** Score (0–1) of the path actually walked through an interactiveScenario — the average of each chosen option's quality weight, not the whole tree. */
export function scoreScenarioPath(path: OptionQuality[]): number {
  if (path.length === 0) return 0;
  const sum = path.reduce((s, q) => s + QUALITY_WEIGHT[q], 0);
  return sum / path.length;
}

export interface SequenceReorderingResult {
  type: "sequence_reordering";
  correct: boolean;
}
export interface ErrorIdentificationResult {
  type: "error_identification";
  correctChoices: number;
  totalChoices: number;
}
export interface ReadinessChecklistResult {
  type: "readiness_checklist";
  correctItems: number;
  totalItems: number;
}
export type ExerciseResult = SequenceReorderingResult | ErrorIdentificationResult | ReadinessChecklistResult;

/** Score (0–1) of a single exercise attempt, per the locked per-type rule. */
export function scoreExercise(result: ExerciseResult): number {
  if (result.type === "sequence_reordering") return result.correct ? 1 : 0;
  if (result.type === "error_identification") return result.totalChoices > 0 ? result.correctChoices / result.totalChoices : 0;
  return result.totalItems > 0 ? result.correctItems / result.totalItems : 0;
}

export interface OperationAttemptResult {
  operationId: string;
  exerciseResults: ExerciseResult[];
  scenarioPath: OptionQuality[];
}

export interface OperationScore {
  operationId: string;
  exercisesScore: number; // 0-1, average of exerciseResults
  scenarioScore: number; // 0-1
  operationScorePercent: number; // 0-100, 40% exercises + 60% scenario
  passed: boolean;
}

/** Combines an operation's exercises + scenario into one 0-100 score, 40/60 weighted, against the shared EXAM_PASS_THRESHOLD. */
export function scoreOperation(result: OperationAttemptResult): OperationScore {
  const exercisesScore = result.exerciseResults.length > 0
    ? result.exerciseResults.reduce((s, r) => s + scoreExercise(r), 0) / result.exerciseResults.length
    : 0;
  const scenarioScore = scoreScenarioPath(result.scenarioPath);
  const operationScorePercent = Math.round((0.4 * exercisesScore + 0.6 * scenarioScore) * 100);
  return {
    operationId: result.operationId,
    exercisesScore,
    scenarioScore,
    operationScorePercent,
    passed: operationScorePercent >= EXAM_PASS_THRESHOLD,
  };
}

export interface ShipSpecialtyAttemptResult {
  shipTypeId: string;
  operationResults: OperationAttemptResult[];
}

export interface ShipSpecialtyScore {
  shipTypeId: string;
  operations: OperationScore[];
  /** Informational only — never the pass criterion. See passed below. */
  averageScorePercent: number;
  /**
   * True only if EVERY operation individually passed. Deliberately not
   * derived from averageScorePercent — a passing average must never
   * substitute for a failed individual operation (no compensation, see
   * file header).
   */
  passed: boolean;
}

export function scoreShipSpecialty(result: ShipSpecialtyAttemptResult): ShipSpecialtyScore {
  const operations = result.operationResults.map(scoreOperation);
  const averageScorePercent = operations.length > 0
    ? Math.round(operations.reduce((s, o) => s + o.operationScorePercent, 0) / operations.length)
    : 0;
  return {
    shipTypeId: result.shipTypeId,
    operations,
    averageScorePercent,
    passed: operations.length > 0 && operations.every((o) => o.passed),
  };
}
