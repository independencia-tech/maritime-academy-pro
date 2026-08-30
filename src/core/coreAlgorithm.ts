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
// Nothing in this file is imported or called from anywhere yet — inert
// until a future step wires it in.

import { RANK_REGISTRY, getRankMeta, type RankId } from "./rankRegistry";
import { LESSON_REGISTRY, type LessonRegistryItem, type LessonId } from "./lessonRegistry";

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
