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
