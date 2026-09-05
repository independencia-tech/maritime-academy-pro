// @ts-nocheck
// ── examEngine.ts ───────────────────────────────────────────────
// First real mini-exam mechanism (Foundation Exams doctrine, pilot module
// d1 only — see project memory, project_exams_system_architecture.md).
// Includes the Remedial mechanism (24h cooldown, re-tests exactly the wrong
// questions from the last failed attempt, recorded under a separate
// "foundation_remedial" category so it never consumes the weekly full-exam
// cooldown). Deliberately does NOT build the 13th Foundation Summary exam
// yet — still explicitly out of scope for this pass.
//
// @ts-nocheck: same reason as examProgress.ts — exam_attempts/
// exam_attempt_answers aren't in the generated Supabase Database type
// (added via manual migration, not the type generator).

import { supabase } from "@/integrations/supabase/client";
import { LESSON_REGISTRY } from "./lessonRegistry";
import { RANK_REGISTRY, getRankMeta } from "./rankRegistry";
import { getRecommendedLessonsForTrajectory } from "./coreAlgorithm";
import { getQuestionPoolForLessons } from "./examQuestionPools";
import {
  getTargetTierQuestionPoolForLessons,
  getPrecedingTierQuestionPoolForLessons,
} from "./examSeniorQuestions";

export const EXAM_PASS_THRESHOLD = 70;
export const EXAM_COOLDOWN_DAYS = 7;
export const EXAM_QUESTION_COUNT = 20;

// Remedial retry delay (doctrine, reconfirmed 2026-09-01): 24h, distinct
// from and shorter than the weekly full-exam cooldown above. Only ever
// relevant after a FAILED attempt — see canAttemptRemedial below.
export const EXAM_REMEDIAL_COOLDOWN_HOURS = 24;

// 70/30 dosage (validated 2026-09-01): a mini-exam's situational content is
// majority target-rank-level, minority preceding-rank-level, so the
// difficulty jump between a learner's current level and the exam isn't too
// sharp. See project memory (project_exams_system_architecture.md, "Volet
// 1") for the full rationale.
export const TARGET_TIER_WEIGHT = 0.7;
export const PRECEDING_TIER_WEIGHT = 0.3;

// Size of the situational (senior) subset within one exam draw, before the
// 70/30 split above is applied to it. Pragmatic default, same status as
// EXAM_QUESTION_COUNT — not user-validated, flagged as adjustable. The rest
// of the exam (EXAM_QUESTION_COUNT - this) is filled from the general
// (untagged, factual) pool.
export const SITUATIONAL_QUESTION_COUNT = 6;

// Module's lessons intersected with the user's current->target rank
// trajectory, reusing the exact function "Recommended for You" already
// uses (coreAlgorithm.ts) — not a new filtering mechanism. If either rank
// is missing (incomplete profile), falls back to the module's full lesson
// list rather than silently returning zero questions.
export function getExamEligibleLessonIds(moduleId, currentRankId, targetRankId) {
  const moduleLessonIds = Object.values(LESSON_REGISTRY)
    .filter((entry) => entry.moduleId === moduleId)
    .map((entry) => entry.lessonId);

  if (!currentRankId || !targetRankId) return moduleLessonIds;

  const trajectoryLessonIds = new Set(
    getRecommendedLessonsForTrajectory(currentRankId, targetRankId).map((l) => l.lessonId)
  );
  return moduleLessonIds.filter((id) => trajectoryLessonIds.has(id));
}

// The 12 Foundation modules a Deck+Safety learner must have attempted before
// the 13th ("Foundation Summary") exam unlocks — d5 permanently out of scope
// (see project memory). Single source of truth, reused by
// useFoundationSummaryExam's unlock check in MaritimeApp.tsx so the list
// never drifts out of sync between the count confirmed to the user (12) and
// the actual modules checked.
export const FOUNDATION_MODULE_IDS = ["d1", "d2", "d3", "d4", "d6", "d7", "s1", "s2", "s3", "s4", "s5", "s6"];

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Final rank-differentiation rule (2026-09-01): a mini-exam's rank window is
// the TARGET rank only (profile.target) — no adjacent-rank pairing, no
// staged progression through intermediate ranks. An AB targeting Master
// gets Master-level questions directly, never Bosun/OOW/Chief Officer exams
// one at a time. Returns [] if targetRankId is missing (falls back to the
// general pool only, same safe-default pattern as the trajectory filter).
export function getExamRankWindow(targetRankId) {
  return targetRankId ? [targetRankId] : [];
}

// The rank immediately preceding targetRankId within the same department's
// ladder (by RANK_REGISTRY's `level` field) — e.g. "master" -> "chief_officer".
// Returns null if targetRankId is missing, unknown, or already the lowest
// rank in its department (nothing precedes it).
export function getPrecedingRankId(targetRankId) {
  const targetMeta = getRankMeta(targetRankId);
  if (!targetMeta) return null;
  const preceding = Object.values(RANK_REGISTRY).find(
    (r) => r.department === targetMeta.department && r.level === targetMeta.level - 1
  );
  return preceding ? preceding.id : null;
}

// Weighted draw, no replacement, never errors on a small pool (just returns
// what's available at each step). Two independent draws, not one shuffled
// combined pool: first the situational subset (master-tier + chief_officer-
// tier, split ~70/30 per TARGET_TIER_WEIGHT/PRECEDING_TIER_WEIGHT off of
// SITUATIONAL_QUESTION_COUNT), then the remaining slots filled from the
// general (untagged, factual) pool. This guarantees the 70/30 dosage instead
// of leaving it to chance the way combining every pool into one shuffle did
// (see project memory, "Volet 1", for why that first draft under-delivered
// chief_officer-tier content entirely on some draws).
export function drawExamQuestions(lessonIds, lang, targetRankId, count = EXAM_QUESTION_COUNT) {
  const generalPool = getQuestionPoolForLessons(lessonIds, lang);
  const window = getExamRankWindow(targetRankId);
  const precedingRankId = getPrecedingRankId(targetRankId);

  let masterPool = [];
  let precedingPool = [];
  if (window.length > 0) {
    masterPool = getTargetTierQuestionPoolForLessons(lessonIds, lang).filter((q) =>
      q.relevantRanks.some((r) => window.includes(r))
    );
  }
  if (precedingRankId) {
    precedingPool = getPrecedingTierQuestionPoolForLessons(lessonIds, lang).filter((q) =>
      q.relevantRanks.includes(precedingRankId)
    );
  }

  const situationalTarget = Math.min(SITUATIONAL_QUESTION_COUNT, count);
  const masterTarget = Math.round(situationalTarget * TARGET_TIER_WEIGHT);
  const precedingTarget = situationalTarget - masterTarget;

  const drawnMaster = shuffle(masterPool).slice(0, Math.min(masterTarget, masterPool.length));
  const drawnPreceding = shuffle(precedingPool).slice(0, Math.min(precedingTarget, precedingPool.length));
  const situationalDrawn = [...drawnMaster, ...drawnPreceding];

  const remainingSlots = count - situationalDrawn.length;
  const drawnGeneral = shuffle(generalPool).slice(0, Math.min(remainingSlots, generalPool.length));

  return shuffle([...situationalDrawn, ...drawnGeneral]);
}

// Looks up the exact original question objects for a set of questionIds,
// searching the general + master-tier + preceding-tier pools together (a
// questionId can live in any of the three). Used to rehydrate the Remedial
// exam's content — see drawRemedialQuestions below — without duplicating
// any question text: the pools remain the single source of truth, this
// just re-finds what was already drawn once.
export function getQuestionsByIds(lessonIds, lang, questionIds) {
  const idSet = new Set(questionIds);
  const pool = [
    ...getQuestionPoolForLessons(lessonIds, lang),
    ...getTargetTierQuestionPoolForLessons(lessonIds, lang),
    ...getPrecedingTierQuestionPoolForLessons(lessonIds, lang),
  ];
  return pool.filter((q) => idSet.has(q.questionId));
}

// Remedial exam content (doctrine: "condensed synthesis of missed points,"
// no examId of its own) — re-tests the EXACT questions the learner got
// wrong on their last attempt, not a fresh draw from the same lessons.
// wrongAnswers: [{questionId, lessonId}]. lessonIds passed to
// getQuestionsByIds intentionally ignores trajectory filtering (uses every
// lessonId present in wrongAnswers) since these questions already exist
// from a real prior draw — trajectory eligibility isn't re-checked here.
export function drawRemedialQuestions(wrongAnswers, lang) {
  const lessonIds = [...new Set(wrongAnswers.map((a) => a.lessonId))];
  const questionIds = wrongAnswers.map((a) => a.questionId);
  return shuffle(getQuestionsByIds(lessonIds, lang, questionIds));
}

// Most recent attempt for this user/module/category, or null if none yet.
export async function getLatestExamAttempt(userId, moduleId, category) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .select("id, attempted_at, passed, score, max_score")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .eq("category", category)
    .order("attempted_at", { ascending: false })
    .limit(1);
  if (error) {
    console.error("[getLatestExamAttempt] fetch failed:", error);
    return null;
  }
  return data && data[0] ? data[0] : null;
}

// Weekly cooldown (doctrine: 1 full-module-exam attempt per week, distinct
// from the 24h remedial retry delay below).
export function canAttemptExam(latestAttempt) {
  if (!latestAttempt) return { allowed: true, nextAvailableAt: null };
  const lastDate = new Date(latestAttempt.attempted_at);
  const nextAvailableAt = new Date(lastDate.getTime() + EXAM_COOLDOWN_DAYS * 86400000);
  const allowed = Date.now() >= nextAvailableAt.getTime();
  return { allowed, nextAvailableAt: allowed ? null : nextAvailableAt };
}

// Remedial availability: only ever relevant after a FAILED "foundation"
// attempt (a passed attempt has nothing to remediate — eligible:false,
// distinct from allowed:false, so the caller can tell "not applicable" from
// "applicable but still on cooldown"). The 24h cooldown is a RETRY delay
// between remedial attempts, not a mandatory wait before the first one: a
// learner who just failed the main exam can start the remedial immediately.
// It only kicks in once a remedial attempt already exists for this failure
// cycle (latestRemedialAttempt more recent than the failed foundation
// attempt) — an older remedial from a PREVIOUS failure cycle must not
// wrongly block a fresh one, hence the attempted_at comparison.
export function canAttemptRemedial(latestFoundationAttempt, latestRemedialAttempt) {
  if (!latestFoundationAttempt || latestFoundationAttempt.passed) {
    return { eligible: false, allowed: false, nextAvailableAt: null };
  }
  const foundationDate = new Date(latestFoundationAttempt.attempted_at);
  const remedialIsForThisCycle =
    latestRemedialAttempt && new Date(latestRemedialAttempt.attempted_at) > foundationDate;
  if (!remedialIsForThisCycle) {
    return { eligible: true, allowed: true, nextAvailableAt: null };
  }
  const lastDate = new Date(latestRemedialAttempt.attempted_at);
  const nextAvailableAt = new Date(lastDate.getTime() + EXAM_REMEDIAL_COOLDOWN_HOURS * 3600000);
  const allowed = Date.now() >= nextAvailableAt.getTime();
  return { eligible: true, allowed, nextAvailableAt: allowed ? null : nextAvailableAt };
}

// Wrong answers ({questionId, lessonId}) for one specific attempt — used to
// rehydrate a Remedial exam's content when the learner starts it from the
// module list later, not immediately after finishing (where the caller
// already has this in memory from the just-completed attempt).
export async function getWrongAnswersForAttempt(attemptId) {
  const { data, error } = await supabase
    .from("exam_attempt_answers")
    .select("question_id, lesson_id")
    .eq("attempt_id", attemptId)
    .eq("was_correct", false);
  if (error) {
    console.error("[getWrongAnswersForAttempt] fetch failed:", error);
    return [];
  }
  return (data || []).map((r) => ({ questionId: r.question_id, lessonId: r.lesson_id }));
}

// Records one exam attempt + its per-question answers. answers: array of
// {questionId, lessonId, wasCorrect}.
export async function recordExamAttempt(userId, moduleId, category, score, maxScore, answers) {
  const passed = maxScore > 0 && (score / maxScore) * 100 >= EXAM_PASS_THRESHOLD;

  const { data: attempt, error: attemptError } = await supabase
    .from("exam_attempts")
    .insert({
      user_id: userId,
      module_id: moduleId,
      category,
      score,
      max_score: maxScore,
      passed,
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    console.error("[recordExamAttempt] exam_attempts insert failed:", attemptError);
    return { passed, attemptId: null };
  }

  const answerRows = answers.map((a) => ({
    attempt_id: attempt.id,
    question_id: a.questionId,
    lesson_id: a.lessonId,
    was_correct: a.wasCorrect,
  }));

  if (answerRows.length > 0) {
    const { error: answersError } = await supabase.from("exam_attempt_answers").insert(answerRows);
    if (answersError) {
      console.error("[recordExamAttempt] exam_attempt_answers insert failed:", answersError);
    }
  }

  return { passed, attemptId: attempt.id };
}
