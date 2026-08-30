// ── coreAlgorithm.ts ─────────────────────────────────────────────
// MAP Core Algorithm — the sole decisional component of MAP (see memory:
// project_core_algorithm_architecture.md for the full doctrine). This file
// queries/filters the content registries; it never owns or modifies their
// data, and it never decides access rights.
//
// Step 1 (2026-08-30), scoped and validated before writing any code — the
// smallest possible slice: rank-based lesson filtering only. Deliberately
// excluded from this step: vessel type / Specialized Operations filtering,
// exam relevance, current→target rank trajectory, Learning Data (excluding
// completed lessons), any Dashboard UI wiring, and the Professional Profile
// (permanently out of scope for the Core Algorithm).
//
// Step 2 (2026-08-30), scoped and validated before writing any code — adds
// current→target rank trajectory. Still touches only lessonRegistry.ts +
// rankRegistry.ts — no new data source. Path-walking logic lives here, not
// in rankRegistry.ts, for the same reason Step 1's filter lives here rather
// than in lessonRegistry.ts: the algorithm queries/filters registries, it
// doesn't live inside them.
//
// Step 3 (2026-08-30), scoped and validated before writing any code — brings
// Specialized Operations into the algorithm for the first time, per the
// doctrine's explicit correction: Specialized Operations is a real content
// source to read (specializedOperationRegistry.ts's roleOnVessel arrays),
// not an undifferentiated lesson. specializedOperationRegistry.ts has no
// targetRanks field like lessons do — rank relevance is expressed through
// roleOnVessel, a genuinely different lookup than Steps 1-2's. Deliberately
// scoped narrower than it could be: rank-only (no trajectory, no vessel-type
// narrowing) — each of those would be its own future step if wanted.
//
// Step 4 (2026-08-30), scoped and validated before writing any code — adds
// current→target rank trajectory for Specialized Operations, mirroring
// Step 2's lesson trajectory. Reuses getRankPath() as-is (no new path logic)
// and Step 3's already-validated decisions (any level counts, all vessel
// types, full objects) — nothing new to decide for this step.
//
// Step 5 (2026-08-30), scoped and validated before writing any code — adds
// rank + vessel-type narrowing for Specialized Operations, bringing the
// "dream ship" dimension of User Profile / Status Data into the algorithm
// for the first time (Steps 1-4 only ever used rank). Additive: sits
// alongside getSpecializedOperationsByRank()/...ForTrajectory(), which stay
// untouched. Single-rank only, no trajectory variant yet — same discipline
// as Step 3 shipping rank-only before Step 4 added trajectory. Exact
// vesselTypeId match only, no category fallback if the result is empty —
// user-validated; "what to show when there's nothing" stays a presentation
// concern for a future UI-wiring step, not something this function papers
// over.
//
// Step 6 (2026-08-30), scoped and validated before writing any code — brings
// Learning Data into the algorithm for the first time (Steps 1-5 only ever
// used User Profile/Status Data: rank + vessel type). Excludes already-
// completed lessons from recommendations, using the real, populated
// `completedLessons` app state as the Learning Data source. Additive per
// explicit instruction: new, separate functions; getRecommendedLessonsForRank()
// and getRecommendedLessonsForTrajectory() are untouched. Scoped to lessons
// only — completed-exclusion for Specialized Operations would be its own
// future step if wanted, since Specialized Operations doesn't currently
// track a "completed" concept the way lessons do.
//
// Step 7 (2026-08-30), scoped and validated before writing any code — adds
// prerequisite-aware lesson availability, a new kind of decision (not just
// "relevant" but "currently unlockable") built on the real, if sparse,
// `prerequisites: LessonId[]` field (7/134 lessons populated at scoping
// time) plus Step 6's completedLessonIds input. Exam-relevance filtering
// (requiredForExam/examCategory/certificateCategory/estimatedExamWeight)
// was considered for this step and found currently inert — 0% populated
// across all 134 lessons at scoping time — so it was not built; flagged
// transparently rather than built against non-existent data. Deliberately
// narrower than it could be: prerequisites only (recommendedBefore/
// recommendedAfter are soft ordering hints, not hard gates, and are out of
// scope here to avoid silently turning a suggestion into a requirement),
// completed lessons excluded from the result (an already-completed lesson
// isn't "available to take next"), rank-only (no trajectory variant this
// step — trajectory availability raises its own question, whether a lesson
// is "available" if its prerequisite is later on the path but not yet
// reached, that deserves its own scoping pass).
//
// Step 8 (2026-08-30), scoped and validated before writing any code — adds
// involvement-level filtering for Specialized Operations, using the
// `responsibilityLevels` field (100% populated across all 48 operations,
// full coverage against every roleOnVessel entry: 310/310) that no prior
// step had read. The field's own comment in specializedOperationRegistry.ts
// states it was "deliberately not built to drive anything automatically
// yet... this is only the data itself" — this step is that explicitly
// named future goal. Built as an explicit allow-list
// (`allowedLevels: ResponsibilityLevel[]`), not a "minimum level" threshold
// — the 5 levels ("lead"|"perform"|"supervised"|"support"|"observe") have
// no declared ordering anywhere in the codebase, so a threshold would bake
// in an unconfirmed seniority assumption. Rank-only, additive, separate
// function — no trajectory or vessel-type combination bundled in.
//
// Step 9 (2026-08-30), scoped and validated before writing any code — adds
// current→target rank trajectory combined with vessel-type narrowing for
// Specialized Operations, extending Step 5's rank+vessel-type narrowing to
// the trajectory level exactly as Step 4 extended Step 3's rank-only
// lookup. No new ambiguities — every decision (path symmetry/inclusiveness
// from Step 2, exact vesselTypeId match with no category fallback from
// Step 5, dedup-by-operationId from Step 4) was already validated and
// simply reused, same as Step 4's own "nothing new to decide" case.
//
// Step 10 (2026-08-30), scoped and validated before writing any code — adds
// current→target rank trajectory combined with involvement-level filtering
// for Specialized Operations. Not a clean mirror of Step 9: vesselTypeId is
// a scalar property of the operation itself, but responsibilityLevels is
// keyed per rank, and a trajectory spans multiple ranks — so an operation
// that qualifies via two different ranks on the path may have two different
// levels for the same operation. Flagged and resolved before writing any
// code: OR/union semantics — an operation is included if ANY rank on the
// path has one of the allowedLevels for that operation, not all of them.
// This matches how every trajectory function so far already treats the
// path (a lesson/operation relevant to any rank on the path is included in
// the union, not required to be relevant to every rank on it) — chosen for
// consistency, not asserted as the only valid reading.
//
// Step 11 (2026-08-30), scoped and validated before writing any code —
// closes the gap flagged since Step 7: prerequisite-aware lesson
// availability at the trajectory level. Real data was checked before
// deciding: deck_meteo_l4 (targeted at oow/chief_officer) requires
// deck_meteo_l3 (targeted at deck_cadet/os/ab/bosun, an earlier tier) — a
// genuine cross-rank prerequisite chain, not a hypothetical. This resolves
// the ambiguity rather than complicating it: the strict reading (identical
// logic to getAvailableLessonsForRank(), applied to
// getRecommendedLessonsForTrajectory()'s result — prerequisites checked
// against real completedLessonIds regardless of where either lesson sits
// on the path) produces the pedagogically correct result automatically, and
// keeps faith with the doctrine's Learning Data principle: only real
// completion data drives decisions, never an assumption that an earlier
// path segment is "as good as done." No new semantics — pure reuse.
//
// Step 12 (2026-08-30), scoped and validated before writing any code — adds
// rank + vessel-type + involvement-level filtering for Specialized
// Operations (single-rank triple filter). Simpler than Step 10: single-rank
// means no OR/union ambiguity — there is only one rank's level to check,
// not a path of several. Pure composition of Step 5's exact vesselTypeId
// match and Step 8's explicit allow-list; no new decisions.
//
// Step 13 (2026-08-30), scoped and validated before writing any code —
// closes the SpecOps filter combinatorial space: trajectory + vessel-type +
// involvement-level (the full quadruple). No new decisions — pure
// composition of Step 9's exact vesselTypeId match and Step 10's
// OR/union-across-path level semantics, both already validated.
//
// Step 14 (2026-08-30), scoped and validated before writing any code — the
// first synthesis-type function in this file, not another filter: Steps
// 1-13 built two entirely parallel tracks (lessons, Specialized Operations)
// that had never been combined. Three design points were flagged and
// resolved before writing any code:
// - Output shape: a keyed object ({ lessons, specializedOperations }), not
//   a flat/tagged-union array — the two content types have genuinely
//   different shapes, and forcing a discriminated union for a first
//   combining step would be premature machinery.
// - Composes the plain rank-only basics only (getRecommendedLessonsForRank
//   + getSpecializedOperationsByRank) — not the completedLessonIds/
//   vesselTypeId/allowedLevels-parameterized variants. This sidesteps a
//   real asymmetry question (lessons have a completion concept via
//   getAvailableLessonsForRank; Specialized Operations don't) rather than
//   deciding it as a side effect of this step. A fully-parameterized
//   version is a future step if wanted.
// - Rank-only, no trajectory variant this step — consistent with every
//   prior multi-step buildout here (Step 3→4, Step 5→9, Step 7→11, etc.).
//
// Step 15 (2026-08-30), scoped and validated before writing any code — adds
// the trajectory variant of getRecommendationsForRank(), mirroring it the
// same way every other rank-only function here got a trajectory
// counterpart (Step 1→2, Step 3→4, Step 7→11). No new decisions — same
// plain-basics composition, keyed-object shape, and completion-concept
// asymmetry deferral as Step 14, just over
// getRecommendedLessonsForTrajectory() + getSpecializedOperationsForTrajectory().
//
// Nothing in this file is imported or called from anywhere yet — inert
// until a future step wires it in.

import { RANK_REGISTRY, getRankMeta, type RankId } from "./rankRegistry";
import { LESSON_REGISTRY, type LessonRegistryItem, type LessonId } from "./lessonRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";
import {
  SPECIALIZED_OPERATION_REGISTRY,
  type SpecializedOperation,
  type SpecializedOperationId,
  type ResponsibilityLevel,
} from "./specializedOperationRegistry";

/**
 * Returns the lessons targeted at a given rank.
 *
 * Filters on `targetRanks` only — `status` is ignored for this step (every
 * entry is currently "draft"; filtering on status would return nothing).
 *
 * An empty `targetRanks` array means "not yet tagged," not "universal" —
 * such lessons are excluded, not returned for every rank. Both of these
 * were explicit, user-validated decisions, not assumptions.
 */
export function getRecommendedLessonsForRank(rankId: RankId): LessonRegistryItem[] {
  return Object.values(LESSON_REGISTRY).filter((lesson) =>
    lesson.targetRanks.includes(rankId)
  );
}

/**
 * Returns every rank between two ranks, inclusive, ordered by ascending level.
 *
 * User-validated decisions for this step:
 * - Same department only: if the two ranks belong to different departments
 *   (or either rank id is unknown), returns an empty array rather than
 *   guessing or throwing.
 * - Symmetric: the path is computed from the lower level to the higher one
 *   regardless of which rank is "current" and which is "target" — a target
 *   rank below the current rank does not produce an empty or reversed result.
 * - Inclusive: the current rank itself is part of the path, not just the
 *   ranks strictly ahead of it.
 */
export function getRankPath(currentRankId: RankId, targetRankId: RankId): RankId[] {
  const current = getRankMeta(currentRankId);
  const target = getRankMeta(targetRankId);
  if (!current || !target || current.department !== target.department) return [];

  const minLevel = Math.min(current.level, target.level);
  const maxLevel = Math.max(current.level, target.level);

  return Object.values(RANK_REGISTRY)
    .filter((r) => r.department === current.department && r.level >= minLevel && r.level <= maxLevel)
    .sort((a, b) => a.level - b.level)
    .map((r) => r.id);
}

/**
 * Returns the union of getRecommendedLessonsForRank() across every rank on
 * the path from currentRankId to targetRankId (see getRankPath for the
 * same-department / symmetric / inclusive rules). A lesson tagged for
 * multiple ranks on the path appears once, not once per matching rank.
 */
export function getRecommendedLessonsForTrajectory(
  currentRankId: RankId,
  targetRankId: RankId
): LessonRegistryItem[] {
  const path = getRankPath(currentRankId, targetRankId);
  const seen = new Set<LessonId>();
  const result: LessonRegistryItem[] = [];

  for (const rankId of path) {
    for (const lesson of getRecommendedLessonsForRank(rankId)) {
      if (!seen.has(lesson.lessonId)) {
        seen.add(lesson.lessonId);
        result.push(lesson);
      }
    }
  }

  return result;
}

/**
 * Returns every Specialized Operation, across every vessel type, where the
 * given rank appears in roleOnVessel.
 *
 * User-validated decisions for this step:
 * - Any responsibilityLevel counts as relevant, including "observe" — no
 *   involvement threshold is applied.
 * - All vessel types are scanned; the result is not narrowed to any
 *   particular vessel type (e.g. a user's target/dream ship).
 * - Full SpecializedOperation objects are returned, consistent with
 *   getRecommendedLessonsForRank() returning full LessonRegistryItem
 *   objects rather than a lighter summary.
 */
export function getSpecializedOperationsByRank(rankId: RankId): SpecializedOperation[] {
  return Object.values(SPECIALIZED_OPERATION_REGISTRY).filter((op) =>
    (op.roleOnVessel ?? []).some((role) => role.rankId === rankId)
  );
}

/**
 * Returns the union of getSpecializedOperationsByRank() across every rank on
 * the path from currentRankId to targetRankId (see getRankPath for the
 * same-department / symmetric / inclusive rules). An operation relevant to
 * multiple ranks on the path appears once, not once per matching rank.
 */
export function getSpecializedOperationsForTrajectory(
  currentRankId: RankId,
  targetRankId: RankId
): SpecializedOperation[] {
  const path = getRankPath(currentRankId, targetRankId);
  const seen = new Set<SpecializedOperationId>();
  const result: SpecializedOperation[] = [];

  for (const rankId of path) {
    for (const op of getSpecializedOperationsByRank(rankId)) {
      if (!seen.has(op.operationId)) {
        seen.add(op.operationId);
        result.push(op);
      }
    }
  }

  return result;
}

/**
 * Returns Specialized Operations relevant to both a rank and a specific
 * vessel type — narrower than getSpecializedOperationsByRank().
 *
 * User-validated decisions for this step:
 * - Exact vesselTypeId match only. No fallback to other vessel types in the
 *   same category if the result is empty — that stays a presentation-layer
 *   concern for a later step, not something this function decides.
 * - Additive: getSpecializedOperationsByRank() and
 *   getSpecializedOperationsForTrajectory() are unchanged and still return
 *   all vessel types.
 * - Single-rank only, no trajectory variant in this step.
 */
export function getSpecializedOperationsByRankAndVesselType(
  rankId: RankId,
  vesselTypeId: VesselTypeId
): SpecializedOperation[] {
  return getSpecializedOperationsByRank(rankId).filter(
    (op) => op.vesselTypeId === vesselTypeId
  );
}

/**
 * Returns the lessons targeted at a given rank, excluding any lesson the
 * user has already completed.
 *
 * User-validated decisions for this step:
 * - Separate, additive function — getRecommendedLessonsForRank() is left
 *   untouched, consistent with how Step 5 stayed additive rather than
 *   modifying Steps 3/4.
 * - completedLessonIds is taken as a parameter (Learning Data), not read
 *   from any storage/global here — this file stays a pure query/filter
 *   layer with no side-channel state access.
 */
export function getRecommendedLessonsForRankExcludingCompleted(
  rankId: RankId,
  completedLessonIds: LessonId[]
): LessonRegistryItem[] {
  const completed = new Set(completedLessonIds);
  return getRecommendedLessonsForRank(rankId).filter(
    (lesson) => !completed.has(lesson.lessonId)
  );
}

/**
 * Returns the union of getRecommendedLessonsForTrajectory() across the path
 * from currentRankId to targetRankId, excluding any lesson the user has
 * already completed. Mirrors getRecommendedLessonsForRankExcludingCompleted()
 * at the trajectory level, exactly as getRecommendedLessonsForTrajectory()
 * mirrors getRecommendedLessonsForRank().
 *
 * Separate, additive function — getRecommendedLessonsForTrajectory() is left
 * untouched.
 */
export function getRecommendedLessonsForTrajectoryExcludingCompleted(
  currentRankId: RankId,
  targetRankId: RankId,
  completedLessonIds: LessonId[]
): LessonRegistryItem[] {
  const completed = new Set(completedLessonIds);
  return getRecommendedLessonsForTrajectory(currentRankId, targetRankId).filter(
    (lesson) => !completed.has(lesson.lessonId)
  );
}

/**
 * Returns the lessons targeted at a given rank that are currently available
 * to take: not yet completed, and every entry in `prerequisites` (if any)
 * is already in `completedLessonIds`. A lesson with no prerequisites is
 * always available (subject to not being completed already).
 *
 * User-validated decisions for this step:
 * - `prerequisites` only — `recommendedBefore`/`recommendedAfter` are soft
 *   ordering hints, not hard gates, and are not read here.
 * - All prerequisites must be satisfied (AND-gate), not just one.
 * - Already-completed lessons are excluded from the result.
 * - Rank-only — no trajectory variant in this step.
 */
export function getAvailableLessonsForRank(
  rankId: RankId,
  completedLessonIds: LessonId[]
): LessonRegistryItem[] {
  const completed = new Set(completedLessonIds);
  return getRecommendedLessonsForRank(rankId).filter(
    (lesson) =>
      !completed.has(lesson.lessonId) &&
      lesson.prerequisites.every((prereqId) => completed.has(prereqId))
  );
}

/**
 * Returns Specialized Operations relevant to a rank (via getSpecializedOperationsByRank())
 * whose responsibilityLevels entry for that rank is one of the given allowedLevels.
 *
 * User-validated decisions for this step:
 * - Explicit allow-list, not a "minimum level" threshold — the 5
 *   ResponsibilityLevel values have no declared ordering anywhere in the
 *   codebase, so a threshold would bake in an unconfirmed seniority
 *   assumption. Callers decide which levels count as relevant.
 * - An operation whose responsibilityLevels has no entry for the given rank
 *   is excluded (defensive default; currently moot — every roleOnVessel
 *   entry has a matching responsibilityLevels entry as of this step).
 * - Rank-only, additive: getSpecializedOperationsByRank()/...ForTrajectory()/
 *   ...ByRankAndVesselType() are unchanged. No trajectory or vessel-type
 *   combination in this step.
 */
export function getSpecializedOperationsByRankAndLevels(
  rankId: RankId,
  allowedLevels: ResponsibilityLevel[]
): SpecializedOperation[] {
  const allowed = new Set(allowedLevels);
  return getSpecializedOperationsByRank(rankId).filter((op) => {
    const level = op.responsibilityLevels?.[rankId];
    return level !== undefined && allowed.has(level);
  });
}

/**
 * Returns Specialized Operations relevant to both a current→target rank
 * trajectory and a specific vessel type — extends
 * getSpecializedOperationsByRankAndVesselType() to the trajectory level
 * exactly as getSpecializedOperationsForTrajectory() extends
 * getSpecializedOperationsByRank().
 *
 * No new decisions this step — reuses getRankPath()'s symmetric/inclusive/
 * same-department path (Step 2), the exact vesselTypeId match with no
 * category fallback (Step 5), and dedup by operationId (Step 4).
 * Additive: getSpecializedOperationsForTrajectory() and
 * getSpecializedOperationsByRankAndVesselType() are unchanged.
 */
export function getSpecializedOperationsForTrajectoryAndVesselType(
  currentRankId: RankId,
  targetRankId: RankId,
  vesselTypeId: VesselTypeId
): SpecializedOperation[] {
  return getSpecializedOperationsForTrajectory(currentRankId, targetRankId).filter(
    (op) => op.vesselTypeId === vesselTypeId
  );
}

/**
 * Returns Specialized Operations relevant to a current→target rank
 * trajectory where at least one rank on the path has one of the given
 * allowedLevels for that operation.
 *
 * User-validated decision for this step: OR/union semantics across the
 * path — an operation qualifies if ANY rank on the path has an allowed
 * level for it, not all of them. responsibilityLevels is keyed per rank,
 * unlike vesselTypeId (a scalar property of the operation), so this is not
 * a plain filter on getSpecializedOperationsForTrajectory()'s result the
 * way getSpecializedOperationsForTrajectoryAndVesselType() is — each
 * operation is re-checked against every rank on the path.
 *
 * Additive: getSpecializedOperationsForTrajectory() and
 * getSpecializedOperationsByRankAndLevels() are unchanged.
 */
export function getSpecializedOperationsForTrajectoryAndLevels(
  currentRankId: RankId,
  targetRankId: RankId,
  allowedLevels: ResponsibilityLevel[]
): SpecializedOperation[] {
  const path = getRankPath(currentRankId, targetRankId);
  const allowed = new Set(allowedLevels);
  return getSpecializedOperationsForTrajectory(currentRankId, targetRankId).filter((op) =>
    path.some((rankId) => {
      const level = op.responsibilityLevels?.[rankId];
      return level !== undefined && allowed.has(level);
    })
  );
}

/**
 * Returns the union of getRecommendedLessonsForTrajectory() across the path
 * from currentRankId to targetRankId that are currently available to take:
 * not yet completed, and every entry in `prerequisites` (if any) is already
 * in `completedLessonIds`. Mirrors getAvailableLessonsForRank() exactly,
 * applied to the trajectory's recommended set instead of a single rank's.
 *
 * User-validated: prerequisites are checked against real completedLessonIds
 * regardless of where either lesson sits on the path — no assumption that
 * an earlier path segment is "as good as done." Real data has a genuine
 * cross-rank prerequisite chain (deck_meteo_l4, targeted at oow/chief_officer,
 * requires deck_meteo_l3, targeted at an earlier tier), and this strict
 * reading handles it correctly by construction: deck_meteo_l4 stays
 * unavailable until deck_meteo_l3 is actually completed.
 */
export function getAvailableLessonsForTrajectory(
  currentRankId: RankId,
  targetRankId: RankId,
  completedLessonIds: LessonId[]
): LessonRegistryItem[] {
  const completed = new Set(completedLessonIds);
  return getRecommendedLessonsForTrajectory(currentRankId, targetRankId).filter(
    (lesson) =>
      !completed.has(lesson.lessonId) &&
      lesson.prerequisites.every((prereqId) => completed.has(prereqId))
  );
}

/**
 * Returns Specialized Operations relevant to a rank and a specific vessel
 * type (via getSpecializedOperationsByRankAndVesselType()) whose
 * responsibilityLevels entry for that rank is one of the given
 * allowedLevels — a single-rank triple filter combining Step 5's exact
 * vesselTypeId match and Step 8's explicit allow-list.
 *
 * Simpler than getSpecializedOperationsForTrajectoryAndLevels(): single-rank
 * means there is only one rank's level to check, so no OR/union-across-path
 * decision is needed here.
 *
 * Additive: getSpecializedOperationsByRankAndVesselType() and
 * getSpecializedOperationsByRankAndLevels() are unchanged.
 */
export function getSpecializedOperationsByRankAndVesselTypeAndLevels(
  rankId: RankId,
  vesselTypeId: VesselTypeId,
  allowedLevels: ResponsibilityLevel[]
): SpecializedOperation[] {
  const allowed = new Set(allowedLevels);
  return getSpecializedOperationsByRankAndVesselType(rankId, vesselTypeId).filter((op) => {
    const level = op.responsibilityLevels?.[rankId];
    return level !== undefined && allowed.has(level);
  });
}

/**
 * Returns Specialized Operations relevant to a current→target rank
 * trajectory and a specific vessel type where at least one rank on the
 * path has one of the given allowedLevels for that operation — closes the
 * SpecOps filter combinatorial space (trajectory + vessel-type + level).
 *
 * No new decisions this step — pure composition of
 * getSpecializedOperationsForTrajectoryAndVesselType()'s exact vesselTypeId
 * match (Step 9) and getSpecializedOperationsForTrajectoryAndLevels()'s
 * OR/union-across-path level semantics (Step 10), both already validated.
 *
 * Additive: getSpecializedOperationsForTrajectoryAndVesselType() and
 * getSpecializedOperationsForTrajectoryAndLevels() are unchanged.
 */
export function getSpecializedOperationsForTrajectoryAndVesselTypeAndLevels(
  currentRankId: RankId,
  targetRankId: RankId,
  vesselTypeId: VesselTypeId,
  allowedLevels: ResponsibilityLevel[]
): SpecializedOperation[] {
  const path = getRankPath(currentRankId, targetRankId);
  const allowed = new Set(allowedLevels);
  return getSpecializedOperationsForTrajectoryAndVesselType(
    currentRankId,
    targetRankId,
    vesselTypeId
  ).filter((op) =>
    path.some((rankId) => {
      const level = op.responsibilityLevels?.[rankId];
      return level !== undefined && allowed.has(level);
    })
  );
}

/**
 * Returns the combined recommendation for a rank: the plain rank-only
 * lesson recommendations and the plain rank-only Specialized Operations
 * relevant to that rank, side by side. The first synthesis-type function
 * in this file — Steps 1-13 built lessons and Specialized Operations as
 * two entirely parallel tracks that had never been combined.
 *
 * User-validated decisions for this step:
 * - Keyed object output ({ lessons, specializedOperations }), not a flat or
 *   tagged-union array — the two content types have genuinely different
 *   shapes, and a discriminated union would be premature machinery.
 * - Composes only the plain rank-only basics
 *   (getRecommendedLessonsForRank + getSpecializedOperationsByRank) — not
 *   the completedLessonIds/vesselTypeId/allowedLevels-parameterized
 *   variants. Sidesteps a real asymmetry (lessons have a completion
 *   concept, Specialized Operations don't) rather than deciding it here.
 * - Rank-only — no trajectory variant in this step.
 */
export interface CombinedRecommendationForRank {
  lessons: LessonRegistryItem[];
  specializedOperations: SpecializedOperation[];
}

export function getRecommendationsForRank(rankId: RankId): CombinedRecommendationForRank {
  return {
    lessons: getRecommendedLessonsForRank(rankId),
    specializedOperations: getSpecializedOperationsByRank(rankId),
  };
}

/**
 * Returns the combined recommendation for a current→target rank
 * trajectory: the plain trajectory lesson recommendations and the plain
 * trajectory Specialized Operations, side by side. Mirrors
 * getRecommendationsForRank() exactly, the same way every other rank-only
 * function here got a trajectory counterpart (Step 1→2, Step 3→4, Step
 * 7→11).
 *
 * No new decisions this step — same keyed-object shape, plain-basics
 * composition, and completion-concept asymmetry deferral as
 * getRecommendationsForRank().
 */
export interface CombinedRecommendationForTrajectory {
  lessons: LessonRegistryItem[];
  specializedOperations: SpecializedOperation[];
}

export function getRecommendationsForTrajectory(
  currentRankId: RankId,
  targetRankId: RankId
): CombinedRecommendationForTrajectory {
  return {
    lessons: getRecommendedLessonsForTrajectory(currentRankId, targetRankId),
    specializedOperations: getSpecializedOperationsForTrajectory(currentRankId, targetRankId),
  };
}
