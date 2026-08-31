// ── recommendationEngine.config.ts ───────────────────────────────
// MAP Core V3.1 — tunable constants for the Recommendation Engine
// (memory: project_core_algorithm_architecture.md, "V3.1 —
// Recommendation Engine Specification", CPLA-validated 2026-08-31).
//
// Deliberately isolated in its own file — Software Architect requirement
// from the CPLA arbitration: weights must live in a single, clearly
// named object, never as literals scattered across scoring functions,
// so they can be retuned after testing on real profiles without
// touching the engine itself.

/**
 * Baseline scoring weights (spec point D). Explicitly a TUNING BASELINE,
 * not a final product value — CPLA arbitration: "Baseline de tuning,
 * pas vérité définitive." The functional hierarchy that must hold
 * regardless of exact numbers: currentRank > targetRank >
 * learningProgression > department > dreamVessel.
 */
export const RECOMMENDATION_WEIGHTS = {
  currentRank: 30,
  targetRank: 25,
  learningProgression: 20,
  department: 15,
  dreamVessel: 10,
} as const;

/**
 * Pipeline configuration constants. `minRelevanceThreshold` is a
 * PLACEHOLDER — CPLA arbitration: "Valeur exacte = paramètre
 * configurable, à tester sur profils réels." 0.4 is not a validated
 * product value; it exists only so the threshold-filtering logic (Étape
 * 4) has a named constant to reference instead of a hardcoded literal.
 * Expressed as a fraction of relevancePct (itself already normalized to
 * [0,1] over each candidate's available dimensions — spec D), not an
 * absolute score out of 100, so it stays meaningful even when a
 * candidate is missing signals other candidates have.
 */
export const RECOMMENDATION_CONFIG = {
  minRelevanceThreshold: 0.4,

  /**
   * Final recommendation list size bounds (spec point J) — Étape 6 will
   * compute the real, dynamic topN between these bounds. Étape 5 (Safety
   * priority, diversification) doesn't have that real topN yet, so both
   * stages use `topNMax` as the most conservative reference window: a
   * candidate that doesn't make the top `topNMax` by relevance won't
   * survive the real (≤topNMax) truncation either.
   */
  topNMin: 3,
  topNMax: 5,

  /**
   * Diversification (spec point H) — PLACEHOLDER values, not tuned.
   * `diversificationFamilyCap`: max candidates from the same family
   * (moduleId for lessons, vesselTypeId for Specialized Operations)
   * before a swap is considered. `comparableRelevanceMargin`: how close
   * two candidates' relevancePct must be to count as "comparable" —
   * below this margin, diversification may swap them; at or above it,
   * the more relevant candidate is never displaced for diversity alone.
   */
  diversificationFamilyCap: 2,
  comparableRelevanceMargin: 0.1,
} as const;
