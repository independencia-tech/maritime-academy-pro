// @ts-nocheck
// ── examQuestionPools.ts ───────────────────────────────────────
// Reuses each lesson's existing QUIZ/BANK question data as-is (now
// exported from the lesson files themselves) to build a tagged,
// per-language question pool for module mini-exams. No question content
// is duplicated here — this file only re-exports and tags what already
// exists, so the lesson quiz/bank content stays the single source of
// truth (editing a question in its lesson file is enough, nothing to
// keep in sync here).
//
// @ts-nocheck: mirrors examProgress.ts — this file re-exports objects
// from lesson files that are themselves mostly not strictly typed, and
// the merge logic below deliberately stays loose (plain objects) rather
// than fighting inferred literal types across 10 different files.

import { QUIZ as D1_L1_QUIZ, BANK as D1_L1_BANK } from "../components/LessonNavigation";
import { QUIZ as D1_L2_QUIZ, BANK_NAV2 as D1_L2_BANK } from "../components/LessonNavire";
import { QUIZ as D1_L3_QUIZ, BANK_NAV3 as D1_L3_BANK } from "../components/LessonCoord";
import { QUIZ as D1_L4_QUIZ, BANK as D1_L4_BANK } from "../components/LessonCarteMarine";
import { QUIZ as D1_L5_QUIZ, BANK_ALL as D1_L5_BANK } from "../components/LessonCompas";
import { QUIZ as D1_L6_QUIZ, BANK as D1_L6_BANK } from "../components/LessonNavPratique";
import { QUIZ as D1_L7_QUIZ, BANK as D1_L7_BANK } from "../components/LessonMarees";
import { QUIZ as D1_L8_QUIZ, BANK as D1_L8_BANK } from "../components/LessonCOLREG";
import { BANK as D1_L9_BANK } from "../components/LessonSteering";
import { BANK as D1_L10_BANK } from "../components/LessonWatchOrganization";

const LANGS = ["fr", "en", "es", "pt"];

// Tags each question with a stable questionId (lessonId + its index in the
// lesson's own combined QUIZ+BANK pool) and the lessonId itself — needed by
// exam_attempt_answers (question_id, lesson_id) and by the future remedial
// "review this lesson" suggestion. Index-based, not content-hash-based:
// simple, and stable as long as a lesson's question arrays aren't reordered
// (editing question text in place doesn't shift indices).
function buildLessonPool(lessonId, quizByLang, bankByLang) {
  const pool = {};
  for (const lang of LANGS) {
    const quiz = (quizByLang && quizByLang[lang]) || [];
    const bank = (bankByLang && bankByLang[lang]) || [];
    const combined = [...quiz, ...bank];
    pool[lang] = combined.map((question, idx) => ({
      ...question,
      lessonId,
      questionId: `${lessonId}::q${idx}`,
    }));
  }
  return pool;
}

const LESSON_POOLS = {
  "d1-l1": buildLessonPool("d1-l1", D1_L1_QUIZ, D1_L1_BANK),
  "d1-l2": buildLessonPool("d1-l2", D1_L2_QUIZ, D1_L2_BANK),
  "d1-l3": buildLessonPool("d1-l3", D1_L3_QUIZ, D1_L3_BANK),
  "d1-l4": buildLessonPool("d1-l4", D1_L4_QUIZ, D1_L4_BANK),
  "d1-l5": buildLessonPool("d1-l5", D1_L5_QUIZ, D1_L5_BANK),
  "d1-l6": buildLessonPool("d1-l6", D1_L6_QUIZ, D1_L6_BANK),
  "d1-l7": buildLessonPool("d1-l7", D1_L7_QUIZ, D1_L7_BANK),
  "d1-l8": buildLessonPool("d1-l8", D1_L8_QUIZ, D1_L8_BANK),
  "d1-l9": buildLessonPool("d1-l9", null, D1_L9_BANK),
  "d1-l10": buildLessonPool("d1-l10", null, D1_L10_BANK),
};

// Returns the pooled, tagged questions for a set of lessonIds, in one
// language. Lessons with no pool defined here (anything outside d1 today)
// simply contribute nothing — callers don't need to special-case that.
export function getQuestionPoolForLessons(lessonIds, lang) {
  const safeLang = LANGS.includes(lang) ? lang : "fr";
  const out = [];
  for (const lessonId of lessonIds) {
    const pool = LESSON_POOLS[lessonId];
    if (pool && pool[safeLang]) out.push(...pool[safeLang]);
  }
  return out;
}
