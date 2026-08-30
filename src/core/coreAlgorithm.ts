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
// (permanently out of scope for the Core Algorithm). Not imported or called
// from anywhere yet — inert until a future step wires it in.

import type { RankId } from "./rankRegistry";
import { LESSON_REGISTRY, type LessonRegistryItem } from "./lessonRegistry";

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
