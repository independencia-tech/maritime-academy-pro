// @ts-nocheck
// ── specialtyExamPersistence.ts ──────────────────────────────────
// Supabase I/O for Specialty Exam attempts, kept separate from
// specialtyExamEngine.ts (pure scoring logic, fully typed, no @ts-nocheck)
// for the same reason examEngine.ts/examProgress.ts carry @ts-nocheck: the
// generated Supabase Database type doesn't include exam_attempts'
// specialty-era columns or specialty_attempt_items (added via manual
// migration, not the type generator). Isolating the untyped I/O here keeps
// the engine file's own type-checking meaningful.
//
// Reuses examEngine.ts's getLatestExamAttempt/canAttemptExam AS-IS for the
// cooldown mechanism — module_id holds the operationId, category is
// "specialty" instead of "foundation". No new cooldown logic needed.

import { supabase } from "@/integrations/supabase/client";
import type { OperationScore } from "./specialtyExamEngine";

export interface SpecialtyItemRecord {
  itemType: "exercise" | "scenario_node";
  itemId: string;
  scoreEarned: number;
  scorePossible: number;
}

/**
 * Persists one operation attempt: one exam_attempts row (module_id =
 * operationId, category = "specialty", rank_id = attempt-time metadata
 * only per the locked schema decision) + one specialty_attempt_items row
 * per exercise/scenario decision. Mirrors examEngine.ts's
 * recordExamAttempt exactly (sequential inserts, same error handling
 * shape) rather than inventing a new persistence pattern.
 */
export async function recordSpecialtyAttempt(userId, operationId, rankId, operationScore, items) {
  const { data: attempt, error: attemptError } = await supabase
    .from("exam_attempts")
    .insert({
      user_id: userId,
      module_id: operationId,
      category: "specialty",
      score: operationScore.operationScorePercent,
      max_score: 100,
      passed: operationScore.passed,
      rank_id: rankId ?? null,
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    console.error("[recordSpecialtyAttempt] exam_attempts insert failed:", attemptError);
    return { passed: operationScore.passed, attemptId: null };
  }

  const itemRows = items.map((it) => ({
    attempt_id: attempt.id,
    item_type: it.itemType,
    item_id: it.itemId,
    score_earned: it.scoreEarned,
    score_possible: it.scorePossible,
  }));

  if (itemRows.length > 0) {
    const { error: itemsError } = await supabase.from("specialty_attempt_items").insert(itemRows);
    if (itemsError) {
      console.error("[recordSpecialtyAttempt] specialty_attempt_items insert failed:", itemsError);
    }
  }

  return { passed: operationScore.passed, attemptId: attempt.id };
}

/**
 * Re-derives an OperationScore from the latest persisted "specialty"
 * attempt for this operationId — the combined score/passed come straight
 * from exam_attempts (single source of truth, never recomputed client-
 * side), the exercises/scenario sub-scores shown on SpecialtyResultScreen
 * are reconstructed from specialty_attempt_items purely for display.
 * Returns undefined if the operation hasn't been attempted yet.
 */
export async function getPersistedOperationScore(userId, operationId) {
  const { data: attempts, error } = await supabase
    .from("exam_attempts")
    .select("id, score, passed")
    .eq("user_id", userId)
    .eq("module_id", operationId)
    .eq("category", "specialty")
    .order("attempted_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("[getPersistedOperationScore] exam_attempts fetch failed:", error);
    return undefined;
  }
  const attempt = attempts && attempts[0];
  if (!attempt) return undefined;

  const { data: items, error: itemsError } = await supabase
    .from("specialty_attempt_items")
    .select("item_type, score_earned, score_possible")
    .eq("attempt_id", attempt.id);

  if (itemsError) {
    console.error("[getPersistedOperationScore] specialty_attempt_items fetch failed:", itemsError);
  }

  const exerciseItems = (items ?? []).filter((i) => i.item_type === "exercise");
  const scenarioItems = (items ?? []).filter((i) => i.item_type === "scenario_node");
  const avgFraction = (rows) =>
    rows.length > 0 ? rows.reduce((s, r) => s + (r.score_possible > 0 ? r.score_earned / r.score_possible : 0), 0) / rows.length : 0;

  return {
    operationId,
    exercisesScore: avgFraction(exerciseItems),
    scenarioScore: avgFraction(scenarioItems),
    operationScorePercent: attempt.score,
    passed: attempt.passed,
  };
}

/** Fetches persisted scores for every operation of a ship in one batch — used to populate SpecialtyResultScreen's `scores` map. */
export async function getShipOperationScores(userId, operationIds) {
  const results = {};
  for (const operationId of operationIds) {
    results[operationId] = await getPersistedOperationScore(userId, operationId);
  }
  return results;
}
