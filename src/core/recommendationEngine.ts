// ── recommendationEngine.ts ──────────────────────────────────────
// MIS DE CÔTÉ — non utilisé dans le Core Algorithm actuel (redéfini le
// 2026-08-31). Conservé pour réutilisation future éventuelle de la
// logique de dédup/types. Voir project_core_algorithm_architecture.md
// pour la doctrine active.
//
// MAP Core V3.1 — Recommendation Engine pipeline (memory:
// project_core_algorithm_architecture.md, "V3.1 — Recommendation Engine
// Specification", CPLA-validated 2026-08-31). Implements the roadmap's
// Étapes 2+ progressively, one validated step at a time; each stage is
// added to this file rather than spread across new files per step.
//
// coreAlgorithm.ts (Steps 1-23, the SpecOps-branching combined-function
// family) is deliberately not extended for this — this file COMPOSES
// its already-validated per-rank/trajectory functions instead.
//
// Étape 8 (2026-08-31): getRecommendationsForUser(), the single public
// entry point, is now called from Dashboard.tsx — this file is no
// longer inert. Every earlier stage function above stays exported too
// (deterministic/testable per the CPLA's own vocabulary note), but
// Dashboard only ever calls the one entry point at the bottom of this
// file — see that function's own doc comment for the boundary this
// enforces.

import { getRankPath, getRecommendedLessonsForRank, getSpecializedOperationsByRank } from "./coreAlgorithm";
import { LESSON_REGISTRY } from "./lessonRegistry";
import { SPECIALIZED_OPERATION_REGISTRY } from "./specializedOperationRegistry";
import { RECOMMENDATION_WEIGHTS, RECOMMENDATION_CONFIG } from "./recommendationEngine.config";
import type { RankId } from "./rankRegistry";
import type {
  RawCandidateOccurrence,
  DeduplicatedCandidate,
  ScoredCandidate,
  ScoreBreakdown,
  DimensionScore,
  CandidateIdentity,
  RecommendationProfile,
  RecommendationLearningState,
  RecommendationItem,
  RecommendationResult,
} from "./coreAlgorithm.types";

/**
 * Étape 2 — Candidate generation (spec point A). Produces a RAW,
 * unfiltered-beyond-rank-relevance, NOT-YET-DEDUPLICATED list of
 * candidate occurrences. Deliberately not deduplicated here: walking the
 * rank path per-rank (rather than reusing coreAlgorithm.ts's already-
 * deduplicated ...ForTrajectory() union functions) means a lesson/
 * operation relevant to more than one rank on the path legitimately
 * produces one RawCandidateOccurrence per matching rank at this stage —
 * real work for Étape 3 (deduplication) to do, not a step that would
 * otherwise have nothing left to perform.
 *
 * Return type refined at Étape 3's request: each occurrence now carries
 * `matchedRankId` (the single rank on the path that produced it), not
 * just the bare CandidateIdentity. This isn't a change to the
 * generation LOGIC validated at Étape 2 (same ranks read, same
 * registries, same lack of dedup/filters) — it's the minimum shape
 * needed for Étape 3 to preserve multi-rank provenance instead of
 * silently collapsing it, which Étape 2's original CandidateIdentity[]
 * return type structurally could not carry (no field distinguishes
 * which rank produced a given entry).
 *
 * No scoring, no threshold, no diversification, no Safety priority —
 * those are later, separate stages per the validated roadmap.
 *
 * Department (profile.dept) and Dream Vessel (profile.ship) are NOT
 * applied as generation filters — per spec D, both are scoring
 * dimensions, never exclusion criteria at generation time. `profile`
 * carries them anyway for interface stability across the pipeline
 * (scoring, Étape 4, will need them); this function simply doesn't read
 * them yet.
 *
 * `learningState` is accepted (interface stability toward Étape 4's
 * learningProgression dimension) but NOT used here. In particular, the
 * prerequisites hard-filter named in spec point A ("prerequisites non
 * satisfaits → exclu de lessonCandidates") is deliberately NOT applied
 * in this step, kept as a blanket skip for now even though it's no longer
 * accurate for the registry at all: as of 2026-09-01 (meteo/colreg id
 * cleanup — deck_meteo_l1-l7 renamed to d7-l1..d7-l7, the orphan
 * "deck_colreg_l1" deleted outright), all 133 lessonRegistry.ts entries
 * use the same MODULES-format id `completedLessonIds` uses (e.g. "d7-l1")
 * — spec point K's "cross-namespace comparison" concern that justified
 * this blanket skip no longer describes any real entry. A real, narrower
 * fix (apply the gate for real) is possible but NOT done here — out of
 * scope for an id cleanup, flagged for a future step; the K rationale
 * itself needs revisiting, not just its examples patched. Applying the
 * gate blindly today would not "do nothing" for
 * the 9/133 lessons that carry real prerequisites: it would permanently
 * exclude them (every comparison would fail), which is a worse failure
 * mode than the signal being simply absent. Every lesson is still treated
 * as prerequisite-eligible regardless of its `prerequisites` field — not
 * because the id namespaces are still incompatible (they aren't anymore,
 * see above), but because narrowing this gate is a real decision that
 * hasn't been explicitly made yet, not an automatic consequence of the id
 * cleanup. This
 * mirrors spec D's UNAVAILABLE handling for learningProgressionScore —
 * same limitation, same reasoning, applied here to generation instead
 * of scoring. Flagged for explicit confirmation, not silently decided
 * as final.
 */
export function generateCandidates(
  profile: RecommendationProfile,
  learningState: RecommendationLearningState
): RawCandidateOccurrence[] {
  if (!profile.who || !profile.target) return [];

  const path = getRankPath(profile.who, profile.target);
  if (path.length === 0) return [];

  const occurrences: RawCandidateOccurrence[] = [];

  for (const rankId of path) {
    for (const lesson of getRecommendedLessonsForRank(rankId)) {
      occurrences.push({
        identity: {
          contentType: "lesson",
          lessonId: lesson.lessonId,
          moduleId: lesson.moduleId,
          navigable: false,
        },
        matchedRankId: rankId,
      });
    }
    for (const op of getSpecializedOperationsByRank(rankId)) {
      occurrences.push({
        identity: {
          contentType: "specializedOperation",
          operationId: op.operationId,
          vesselTypeId: op.vesselTypeId,
          navigable: true,
        },
        matchedRankId: rankId,
      });
    }
  }

  return occurrences;
}

/**
 * Étape 3 — Deduplication (spec point G). Merges RawCandidateOccurrence
 * entries that represent the same content into one DeduplicatedCandidate
 * per unique id, preserving `matchedRankIds` (every distinct rank on the
 * path that independently produced this candidate) rather than
 * discarding the multiplicity.
 *
 * Two separate Map instances (lessons, SpecOps) rather than one shared
 * map keyed by a combined string — this makes "no cross-type dedup"
 * structural, not just a convention to remember: a lessonId and an
 * operationId can never collide as map keys even in principle, since
 * they're never inserted into the same Map. lessonId is the merge key
 * within lessons, operationId within SpecOps — exactly the two native id
 * spaces spec point G names, never compared against each other.
 *
 * No scoring, no threshold, no diversification — pure merge.
 */
export function deduplicateCandidates(
  rawOccurrences: RawCandidateOccurrence[]
): DeduplicatedCandidate[] {
  const lessonsById = new Map<string, DeduplicatedCandidate>();
  const specOpsById = new Map<string, DeduplicatedCandidate>();

  for (const occurrence of rawOccurrences) {
    const { identity, matchedRankId } = occurrence;
    const byId = identity.contentType === "lesson" ? lessonsById : specOpsById;
    const key = identity.contentType === "lesson" ? identity.lessonId : identity.operationId;

    const existing = byId.get(key);
    if (existing) {
      if (!existing.matchedRankIds.includes(matchedRankId)) {
        existing.matchedRankIds.push(matchedRankId);
      }
    } else {
      byId.set(key, { identity, matchedRankIds: [matchedRankId] });
    }
  }

  return [...lessonsById.values(), ...specOpsById.values()];
}

/**
 * Étape 4 — Scoring (spec point D). Computes a per-dimension score for
 * every deduplicated candidate and a normalized `relevancePct`.
 *
 * Dimensions independently re-derive relevance directly from the
 * registries (LESSON_REGISTRY / SPECIALIZED_OPERATION_REGISTRY) rather
 * than depending on DeduplicatedCandidate.matchedRankIds — a candidate's
 * currentRank/targetRank scores answer "is `who`/`target` specifically
 * tagged on this content," not "was this content reached anywhere on
 * the path," which is a different, broader question matchedRankIds
 * answers. This is the re-verification spec point D itself calls for.
 *
 * A missing/untrustworthy signal is NEVER replaced by a supposed value.
 * Each dimension is either `{ available: true, value, weight,
 * contribution }` or `{ available: false, reason }` — the reason is
 * always a concrete, specific string, not a generic placeholder, so the
 * absence is genuinely documented per spec's explicability requirement.
 * `relevancePct` is computed over only the AVAILABLE dimensions for that
 * candidate (renormalized denominator, spec D) — comparable across
 * candidates even when they don't share the same available signals.
 *
 * No threshold, no diversification, no Safety priority, no topN — those
 * are separate, later stages.
 */
export function scoreCandidates(
  deduplicated: DeduplicatedCandidate[],
  profile: RecommendationProfile,
  // Accepted for interface stability toward a future step where
  // Learning Data becomes trustworthy — NOT read here. See
  // learningProgressionScore below: it is unconditionally UNAVAILABLE
  // in V3.1, for both content types, per spec point K/E. Marked with a
  // leading underscore to make "intentionally unused" visible at the
  // call site, not merely implicit.
  _learningState: RecommendationLearningState
): ScoredCandidate[] {
  return deduplicated.map((candidate) => {
    const scoreBreakdown: ScoreBreakdown = {
      currentRank: currentRankScore(candidate, profile),
      targetRank: targetRankScore(candidate, profile),
      learningProgression: learningProgressionScore(candidate),
      department: departmentScore(candidate, profile),
      dreamVessel: dreamVesselScore(candidate, profile),
    };

    return {
      identity: candidate.identity,
      matchedRankIds: candidate.matchedRankIds,
      relevancePct: computeRelevancePct(scoreBreakdown),
      scoreBreakdown,
    };
  });
}

function computeRelevancePct(scoreBreakdown: ScoreBreakdown): number {
  let maxPossibleScore = 0;
  let rawScore = 0;

  for (const dimension of Object.values(scoreBreakdown)) {
    if (!dimension.available) continue;
    maxPossibleScore += dimension.weight;
    rawScore += dimension.contribution;
  }

  // Degenerate case: every dimension UNAVAILABLE for this candidate
  // (should not occur with real data — department is available
  // whenever profile.dept is set, which is always in practice — but
  // handled explicitly rather than dividing by zero).
  if (maxPossibleScore === 0) return 0;

  return rawScore / maxPossibleScore;
}

function currentRankScore(candidate: DeduplicatedCandidate, profile: RecommendationProfile): DimensionScore {
  if (!profile.who) {
    return { available: false, reason: "profile.who is null — current rank is not persisted to Supabase and was absent for this session/device" };
  }
  const value = candidateHasRank(candidate, profile.who) ? 1 : 0;
  return withWeight("currentRank", value);
}

function targetRankScore(candidate: DeduplicatedCandidate, profile: RecommendationProfile): DimensionScore {
  if (!profile.target) {
    return { available: false, reason: "profile.target is null" };
  }
  const value = candidateHasRank(candidate, profile.target) ? 1 : 0;
  return withWeight("targetRank", value);
}

function learningProgressionScore(candidate: DeduplicatedCandidate): DimensionScore {
  const reason =
    candidate.identity.contentType === "lesson"
      ? "learningProgression kept UNAVAILABLE for all lessons as a blanket rule, even though every one of the 133 lessonRegistry.ts entries now uses the same MODULES-format id as completedLessonIds (e.g. \"d7-l1\") since the 2026-09-01 meteo/colreg id cleanup — the id-namespace justification no longer applies to any entry. Not narrowed to per-lesson accuracy here — that's a real, separate decision, not made as a side effect of an id cleanup."
      : "no completion tracking exists for Specialized Operations at all — no Supabase column, no localStorage key";
  return { available: false, reason };
}

/** Reads a candidate's own `department` tag directly from its registry
 * entry — shared by departmentScore (dimension D) and Étape 5's Safety
 * priority (spec point I), so both read the exact same source. */
function getCandidateDepartment(identity: CandidateIdentity): "deck" | "engine" | "safety" | undefined {
  return identity.contentType === "lesson"
    ? LESSON_REGISTRY[identity.lessonId]?.department
    : SPECIALIZED_OPERATION_REGISTRY[identity.operationId]?.department;
}

function departmentScore(candidate: DeduplicatedCandidate, profile: RecommendationProfile): DimensionScore {
  if (!profile.dept) {
    return { available: false, reason: "profile.dept is null" };
  }
  // A "safety"-department candidate scores 0 here by design, never a
  // fabricated match — profile.dept can only ever be "deck" or
  // "engine" (the questionnaire offers no "safety" option). Safety
  // content is surfaced by the separate Safety priority stage (spec
  // point I, Étape 5), not by this dimension.
  const value = getCandidateDepartment(candidate.identity) === profile.dept ? 1 : 0;
  return withWeight("department", value);
}

function dreamVesselScore(candidate: DeduplicatedCandidate, profile: RecommendationProfile): DimensionScore {
  if (!profile.ship) {
    return { available: false, reason: "profile.ship is null — dream vessel not set (a legitimate, optional questionnaire field, not a persistence gap)" };
  }
  if (candidate.identity.contentType === "lesson") {
    return {
      available: false,
      reason: "lessonRegistry.ts vesselTypes is populated on only 2/136 entries — not yet a reliable signal for this content type (spec point D); dream vessel applies to Specialized Operations only in V3.1",
    };
  }
  const value = candidate.identity.vesselTypeId === profile.ship ? 1 : 0;
  return withWeight("dreamVessel", value);
}

/** True if `rankId` is directly tagged on this candidate's own registry
 * entry — not merely "reachable somewhere on the rank path" (that
 * broader fact is what DeduplicatedCandidate.matchedRankIds already
 * records, independently, from generation). */
function candidateHasRank(candidate: DeduplicatedCandidate, rankId: RankId): boolean {
  if (candidate.identity.contentType === "lesson") {
    return LESSON_REGISTRY[candidate.identity.lessonId]?.targetRanks.includes(rankId) ?? false;
  }
  const op = SPECIALIZED_OPERATION_REGISTRY[candidate.identity.operationId];
  return (op?.roleOnVessel ?? []).some((role) => role.rankId === rankId);
}

function withWeight(dimension: keyof typeof RECOMMENDATION_WEIGHTS, value: 0 | 1): DimensionScore {
  const weight = RECOMMENDATION_WEIGHTS[dimension];
  return { available: true, value, weight, contribution: value * weight };
}

/**
 * Étape 4 — Threshold (spec point F). Filters scored candidates down to
 * those actually eligible for the final recommendation list: navigable
 * (spec B/L — lesson candidates are always `navigable: false` in V3.1,
 * so none pass this filter yet, regardless of score) AND at or above
 * `RECOMMENDATION_CONFIG.minRelevanceThreshold`.
 *
 * No artificial backfill — if only 1 or 2 candidates pass, that's the
 * eligible pool; nothing pads it. topN (Étape 6) and diversification/
 * Safety priority (Étape 5) operate on this filtered pool, not on the
 * full scored set.
 */
export function filterByThreshold(scored: ScoredCandidate[]): ScoredCandidate[] {
  return scored.filter(
    (candidate) => candidate.identity.navigable && candidate.relevancePct >= RECOMMENDATION_CONFIG.minRelevanceThreshold
  );
}

/** Family key for diversification (spec point H): moduleId for lessons,
 * vesselTypeId for Specialized Operations — the two grouping dimensions
 * named in the spec, kept distinct per content type. */
function familyKey(identity: CandidateIdentity): string {
  return identity.contentType === "lesson"
    ? `lesson:${identity.moduleId}`
    : `specializedOperation:${identity.vesselTypeId}`;
}

/**
 * Étape 5a — Diversification (spec point H).
 *
 * Both this function and applySafetyPriority operate on a reference
 * window of size `RECOMMENDATION_CONFIG.topNMax` — the largest the real
 * topN (Étape 6) can ever be. Étape 6 hasn't run yet at this point in
 * the pipeline, so this is the most conservative available proxy: a
 * candidate that doesn't even make the top `topNMax` by relevance won't
 * survive the real (≤topNMax) truncation either way. Candidates beyond
 * the window are left untouched here — Étape 6's concern.
 *
 * Within the window, an over-cap candidate from an over-represented
 * family (`diversificationFamilyCap`, default 2) is swapped for the
 * best available candidate outside the window whose family isn't
 * already at cap — but ONLY when that alternative isn't clearly worse
 * (`comparableRelevanceMargin`). A family with no viable alternative
 * anywhere in the pool is never forced — the over-cap candidate simply
 * stays, per CPLA: "ne jamais forcer artificiellement une catégorie si
 * aucun contenu pertinent n'existe."
 *
 * Walks the window from the weakest candidate upward — the least
 * relevant member of an over-cap family is the one considered for
 * replacement first, never the strongest.
 */
export function applyDiversification(pool: ScoredCandidate[]): ScoredCandidate[] {
  const sorted = [...pool].sort((a, b) => b.relevancePct - a.relevancePct);
  const window = sorted.slice(0, RECOMMENDATION_CONFIG.topNMax);
  const overflow = sorted.slice(RECOMMENDATION_CONFIG.topNMax);

  const familyCounts = new Map<string, number>();
  for (const candidate of window) {
    const key = familyKey(candidate.identity);
    familyCounts.set(key, (familyCounts.get(key) ?? 0) + 1);
  }

  for (let i = window.length - 1; i >= 0; i--) {
    const candidate = window[i];
    const key = familyKey(candidate.identity);
    const count = familyCounts.get(key) ?? 0;
    if (count <= RECOMMENDATION_CONFIG.diversificationFamilyCap) continue;

    const replacementIndex = overflow.findIndex((alt) => {
      const altKey = familyKey(alt.identity);
      return (familyCounts.get(altKey) ?? 0) < RECOMMENDATION_CONFIG.diversificationFamilyCap;
    });

    if (replacementIndex === -1) continue; // no under-represented family available anywhere — cap exceeded, stays

    const replacement = overflow[replacementIndex];
    if (replacement.relevancePct < candidate.relevancePct - RECOMMENDATION_CONFIG.comparableRelevanceMargin) {
      continue; // replacement is clearly less relevant — never displace for diversity alone
    }

    familyCounts.set(key, count - 1);
    const replacementKey = familyKey(replacement.identity);
    familyCounts.set(replacementKey, (familyCounts.get(replacementKey) ?? 0) + 1);

    overflow.splice(replacementIndex, 1, candidate);
    window[i] = replacement;
  }

  return [...window, ...overflow];
}

/** True if this candidate is Safety content genuinely relevant to the
 * user's current or target rank — spec point I's `safetyEligible`
 * condition. Reuses the rank-relevance already computed by scoring
 * (scoreBreakdown), not a fresh registry lookup — the two dimensions
 * already re-verified who/target membership directly against the
 * registries at Étape 4; no need to redo that here. */
function isSafetyRelevant(candidate: ScoredCandidate): boolean {
  if (getCandidateDepartment(candidate.identity) !== "safety") return false;
  const { currentRank, targetRank } = candidate.scoreBreakdown;
  return (currentRank.available && currentRank.value > 0) || (targetRank.available && targetRank.value > 0);
}

/**
 * Shared topN sizing formula (spec point J) — single source of truth
 * used both by applySafetyPriority's injection window (so its "weakest
 * slot" is the position that will actually survive final truncation)
 * and selectTopN's own truncation (Étape 6). Both reads of this formula
 * are applied to the SAME candidate count (the pool size is fixed from
 * Étape 4's threshold filter onward — diversification and Safety
 * priority reorder/substitute, they never add or remove candidates), so
 * there is no risk of the two call sites drifting to different topN
 * values for the same request.
 */
function computeTopN(candidateCount: number): number {
  return candidateCount >= RECOMMENDATION_CONFIG.topNMin
    ? Math.min(RECOMMENDATION_CONFIG.topNMax, candidateCount)
    : candidateCount;
}

/**
 * Étape 5b — Safety priority (spec point I). Contextual, not a fixed
 * slot: 0 Safety if nothing rank-relevant exists, 1 if it does, never
 * forced beyond that in V3.1 (see note below on the multi-slot
 * escalation).
 *
 * Deliberately runs AFTER applyDiversification, not before — a
 * reordering from the pipeline's originally-stated "scoring → Safety
 * priority → diversification" sequence, flagged here rather than
 * silently changed. Reason: a Safety-injected candidate is contextually
 * prioritized, not necessarily maximally relevant — if diversification
 * ran afterward, its family-cap swap could legitimately evict the very
 * candidate Safety priority just injected, silently undoing the
 * guarantee this stage exists to provide. Running Safety priority last
 * makes its injection the final, authoritative step. **This ordering is
 * unchanged by the fix below** — CPLA-confirmed 2026-08-31: the fix
 * targets applySafetyPriority's knowledge of topN, not the stage order.
 *
 * `topN` — FIX (2026-08-31, CPLA-validated): takes the real, final topN
 * as a parameter instead of assuming `RECOMMENDATION_CONFIG.topNMax`.
 * Originally this function always injected at reference-window index
 * `topNMax - 1` (the 5th slot) regardless of the eventual real topN;
 * when real topN < topNMax, `selectTopN`'s later truncation would cut
 * the list before reaching that slot, silently dropping the injected
 * Safety candidate even though this function had already "succeeded."
 * The caller (applySafetyPriorityAndDiversification) now computes the
 * real topN via `computeTopN()` — the exact same formula selectTopN
 * uses — from the pool's own (stable) size, and passes it in. The
 * candidate is now injected at index `topN - 1`, the slot that actually
 * survives `pool.slice(0, topN)`.
 *
 * Verified this does NOT reintroduce "Safety at any cost" — the
 * mechanism itself is unchanged from the originally validated spec I
 * (unconditional replacement of the single weakest slot within the
 * window, no relevance-margin guard — that was always the design;
 * Safety priority is deliberately not another relevance-preserving
 * diversification pass). The fix only corrects WHICH index counts as
 * "the weakest slot that will survive," not whether a slot gets
 * reserved at all — the "0 Safety if nothing relevant exists" and "1,
 * never forced beyond that without a remediation signal" guarantees are
 * exactly as before. One real, worth-noting consequence, surfaced here
 * rather than silently absorbed: at a small topN (e.g. 3), losing 1 of
 * only 3 slots to Safety is proportionally more impactful than at
 * topN=5 — this was already true of the validated design in principle,
 * just not reachable in practice before this fix (Safety could never
 * even land inside a topN<5 result). Not a new decision made here; a
 * pre-existing design property now actually reachable. No margin/guard
 * added — would be a new policy beyond what was asked.
 */
export function applySafetyPriority(pool: ScoredCandidate[], topN: number): ScoredCandidate[] {
  if (topN <= 0) return pool; // nothing to inject into

  const window = pool.slice(0, topN);
  const rest = pool.slice(topN);

  if (window.some(isSafetyRelevant)) return pool; // already earned its place by score — no forcing

  const bestSafety = [...window, ...rest]
    .filter(isSafetyRelevant)
    .sort((a, b) => b.relevancePct - a.relevancePct)[0];

  if (!bestSafety) return pool; // 0 Safety, correct — nothing justifies it

  const newWindow = [...window];
  const weakestIndex = newWindow.length - 1;
  const displaced = newWindow[weakestIndex];
  newWindow[weakestIndex] = bestSafety;

  const newRest = rest.filter((c) => c !== bestSafety);
  newRest.push(displaced);

  return [...newWindow, ...newRest];
}

/**
 * Étape 5 — combined entry point (Safety priority + diversification).
 * Internal order is diversify-then-inject-Safety, per applySafetyPriority's
 * own documented reasoning above — not the literal generation-order
 * name of this function.
 *
 * Computes the real topN once, from `pool.length` (stable across
 * diversification/Safety — neither adds nor removes candidates), and
 * passes it to applySafetyPriority so its injection lands on a slot
 * that survives Étape 6's later truncation with the identical topN
 * value (same `computeTopN()` call, same input count — no drift
 * possible between the two).
 *
 * applyDiversification itself is UNCHANGED — still keyed off
 * `topNMax` (5), not the real topN. Left as-is per the CPLA's explicit
 * scope for this fix (Safety's position awareness only). This is safe,
 * not merely deferred: unlike Safety's injection, a diversification
 * swap that lands in window slots beyond the real topN is simply wasted
 * work when the list is later truncated — it never produces an
 * incorrect final result the way Safety's old fixed-index injection did.
 */
export function applySafetyPriorityAndDiversification(pool: ScoredCandidate[]): ScoredCandidate[] {
  const diversified = applyDiversification(pool);
  const topN = computeTopN(pool.length);
  return applySafetyPriority(diversified, topN);
}

/**
 * Étape 6 — Dynamic topN (spec point J). Truncates the pool produced by
 * applySafetyPriorityAndDiversification down to the final recommendation
 * list: `min(topNMax, count)` when at least `topNMin` candidates exist,
 * otherwise exactly `count` (0, 1, or 2 accepted as-is — never padded to
 * reach `topNMin`). Uses the same `computeTopN()` as
 * applySafetyPriorityAndDiversification, over the same (unchanging)
 * pool size — guaranteed to agree with the topN Safety priority already
 * injected against.
 *
 * Deliberately does NOT re-sort by relevancePct — it trusts the order
 * Étape 5 already established. Re-sorting here would silently undo
 * Étape 5's work, including the now-topN-aware Safety injection.
 */
export function selectTopN(pool: ScoredCandidate[]): ScoredCandidate[] {
  const size = computeTopN(pool.length);
  return pool.slice(0, size);
}

/**
 * Étape 8 — the single public entry point (spec point M). Chains every
 * stage built at Étapes 2-6 in order and assembles the final,
 * UI-ready RecommendationResult. This is the ONLY function Dashboard.tsx
 * (or any other UI) should ever call — the architectural boundary the
 * CPLA validated: "MAP Core est le Recommendation Engine. Le Dashboard
 * n'est pas un deuxième Recommendation Engine." No branching, no
 * filtering, no content-selection logic belongs in the caller; every
 * decision happens inside this pipeline.
 *
 * Title assembly: every item reaching the final result is, by
 * construction, `contentType: "specializedOperation"` — lessons are
 * always `navigable: false` (spec B/K) and are removed by
 * filterByThreshold (Étape 4) long before this point, so there is
 * nothing here that could render a lesson candidate. That invariant is
 * checked defensively (not merely assumed) below: if it were ever
 * violated by a future change upstream, the offending candidate is
 * dropped and logged in dev rather than silently rendered with a
 * fabricated or missing title (LessonRegistryItem has no title field at
 * all — see coreAlgorithm.types.ts's ScoredCandidate doc comment).
 */
export function getRecommendationsForUser(
  profile: RecommendationProfile,
  learningState: RecommendationLearningState
): RecommendationResult {
  const rawOccurrences = generateCandidates(profile, learningState);
  const deduplicated = deduplicateCandidates(rawOccurrences);
  const scored = scoreCandidates(deduplicated, profile, learningState);
  const eligible = filterByThreshold(scored);
  const reordered = applySafetyPriorityAndDiversification(eligible);
  const topN = selectTopN(reordered);

  const items: RecommendationItem[] = [];
  for (const candidate of topN) {
    if (candidate.identity.contentType !== "specializedOperation") {
      if (!import.meta.env.PROD) {
        console.error(
          "[getRecommendationsForUser] unexpected non-navigable candidate reached final assembly — filterByThreshold's navigable gate should have removed this:",
          candidate
        );
      }
      continue;
    }
    const op = SPECIALIZED_OPERATION_REGISTRY[candidate.identity.operationId];
    if (!op) continue; // defensive — id integrity, should not happen with real data

    items.push({
      identity: candidate.identity,
      relevancePct: candidate.relevancePct,
      scoreBreakdown: candidate.scoreBreakdown,
      title: op.title,
    });
  }

  return {
    items,
    meta: {
      totalCandidatesEvaluated: deduplicated.length,
      excludedCount: deduplicated.length - items.length,
    },
  };
}

/**
 * Dev-only explicability helper — CPLA vocabulary note: "on doit pouvoir
 * observer pourquoi chaque candidat a été choisi ou écarté." Formats a
 * RecommendationItem's relevancePct and per-dimension scoreBreakdown as
 * a one-line string, meant for a native `title` tooltip attribute (or
 * console logging) in dev builds only — not a UI feature, just a plain
 * string so Dashboard.tsx doesn't need any formatting logic of its own
 * to surface this.
 */
export function formatScoreBreakdownForDebug(item: RecommendationItem): string {
  const dims = Object.entries(item.scoreBreakdown)
    .map(([dimension, score]) =>
      score.available
        ? `${dimension}: ${score.value}×${score.weight}=${score.contribution}`
        : `${dimension}: unavailable (${score.reason})`
    )
    .join(" | ");
  return `relevance ${(item.relevancePct * 100).toFixed(0)}% — ${dims}`;
}
