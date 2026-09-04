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

import { QUIZ as D2_L1_QUIZ, BANK as D2_L1_BANK } from "../components/LessonSOLAS";
import { QUIZ as D2_L2_QUIZ, BANK as D2_L2_BANK } from "../components/LessonMARPOLLegal";
import { QUIZ as D2_L3_QUIZ, BANK as D2_L3_BANK } from "../components/LessonSTCW";
import { QUIZ as D2_L4_QUIZ, BANK as D2_L4_BANK } from "../components/LessonMLC";
import { QUIZ as D2_L5_QUIZ, BANK as D2_L5_BANK } from "../components/LessonCOLREGLegal";
import { QUIZ as D2_L6_QUIZ, BANK as D2_L6_BANK } from "../components/LessonUNCLOS";
import { QUIZ as D2_L7_QUIZ, BANK as D2_L7_BANK } from "../components/LessonLiabilityInsurance";
import { QUIZ as D2_L8_QUIZ, BANK as D2_L8_BANK } from "../components/LessonPortsFlagStates";
import { QUIZ as D2_L9_QUIZ, BANK as D2_L9_BANK } from "../components/LessonPiracy";
import { QUIZ as D2_L10_QUIZ, BANK as D2_L10_BANK } from "../components/LessonArbitration";

import { QUIZ as D3_L1_QUIZ, BANK as D3_L1_BANK } from "../components/LessonIALA";
import { QUIZ as D3_L2_QUIZ, BANK as D3_L2_BANK } from "../components/LessonLightsShapes";
import { QUIZ as D3_L3_QUIZ, BANK as D3_L3_BANK } from "../components/LessonSoundSignals";
import { QUIZ as D3_L4_QUIZ, BANK as D3_L4_BANK } from "../components/LessonFlags";
import { QUIZ as D3_L5_QUIZ, BANK as D3_L5_BANK } from "../components/LessonVHF";
import { QUIZ as D3_L6_QUIZ, BANK as D3_L6_BANK } from "../components/LessonAIS";
import { QUIZ as D3_L7_QUIZ, BANK as D3_L7_BANK } from "../components/LessonGMDSS";

import { QUIZ as D4_L1_QUIZ, BANK as D4_L1_BANK } from "../components/LessonSMCP_L1";
import { QUIZ as D4_L2_QUIZ, BANK as D4_L2_BANK } from "../components/LessonSMCP_L2";
import { QUIZ as D4_L3_QUIZ, BANK as D4_L3_BANK } from "../components/LessonSMCP_L3";
import { QUIZ as D4_L4_QUIZ, BANK as D4_L4_BANK } from "../components/LessonSMCP_L4";
import { QUIZ as D4_L5_QUIZ, BANK as D4_L5_BANK } from "../components/LessonSMCP_L5";
import { QUIZ as D4_L6_QUIZ, BANK as D4_L6_BANK } from "../components/LessonSMCP_L6";
import { QUIZ as D4_L7_QUIZ, BANK_SMCP7 as D4_L7_BANK } from "../components/LessonSMCP_L7";
import { BANK_SMCP8 as D4_L8_BANK } from "../components/LessonSMCP_L8";

import { QUIZ as D6_L1_QUIZ, BANK as D6_L1_BANK } from "../components/LessonSEA_L1";
import { QUIZ as D6_L2_QUIZ, BANK as D6_L2_BANK } from "../components/LessonSEA_L2";
import { QUIZ as D6_L3_QUIZ, BANK as D6_L3_BANK } from "../components/LessonSEA_L3";
import { QUIZ as D6_L4_QUIZ, BANK as D6_L4_BANK } from "../components/LessonSEA_L4";
import { QUIZ as D6_L5_QUIZ, BANK as D6_L5_BANK } from "../components/LessonSEA_L5";
import { QUIZ as D6_L6_QUIZ, BANK as D6_L6_BANK } from "../components/LessonSEA_L6";
import { QUIZ as D6_L7_QUIZ, BANK as D6_L7_BANK } from "../components/LessonSEA_L7";

import { QUIZ as D7_L1_QUIZ, BANK as D7_L1_BANK } from "../components/LessonMETEO_L1";
import { QUIZ as D7_L2_QUIZ, BANK as D7_L2_BANK } from "../components/LessonMETEO_L2";
import { QUIZ as D7_L3_QUIZ, BANK as D7_L3_BANK } from "../components/LessonMETEO_L3";
import { QUIZ as D7_L4_QUIZ, BANK as D7_L4_BANK } from "../components/LessonMETEO_L4";
import { QUIZ as D7_L5_QUIZ, BANK as D7_L5_BANK } from "../components/LessonMETEO_L5";
import { QUIZ as D7_L6_QUIZ, BANK as D7_L6_BANK } from "../components/LessonMETEO_L6";
import { QUIZ as D7_L7_QUIZ, BANK as D7_L7_BANK } from "../components/LessonMETEO_L7";

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
  "d2-l1": buildLessonPool("d2-l1", D2_L1_QUIZ, D2_L1_BANK),
  "d2-l2": buildLessonPool("d2-l2", D2_L2_QUIZ, D2_L2_BANK),
  "d2-l3": buildLessonPool("d2-l3", D2_L3_QUIZ, D2_L3_BANK),
  "d2-l4": buildLessonPool("d2-l4", D2_L4_QUIZ, D2_L4_BANK),
  "d2-l5": buildLessonPool("d2-l5", D2_L5_QUIZ, D2_L5_BANK),
  "d2-l6": buildLessonPool("d2-l6", D2_L6_QUIZ, D2_L6_BANK),
  "d2-l7": buildLessonPool("d2-l7", D2_L7_QUIZ, D2_L7_BANK),
  "d2-l8": buildLessonPool("d2-l8", D2_L8_QUIZ, D2_L8_BANK),
  "d2-l9": buildLessonPool("d2-l9", D2_L9_QUIZ, D2_L9_BANK),
  "d2-l10": buildLessonPool("d2-l10", D2_L10_QUIZ, D2_L10_BANK),
  "d3-l1": buildLessonPool("d3-l1", D3_L1_QUIZ, D3_L1_BANK),
  "d3-l2": buildLessonPool("d3-l2", D3_L2_QUIZ, D3_L2_BANK),
  "d3-l3": buildLessonPool("d3-l3", D3_L3_QUIZ, D3_L3_BANK),
  "d3-l4": buildLessonPool("d3-l4", D3_L4_QUIZ, D3_L4_BANK),
  "d3-l5": buildLessonPool("d3-l5", D3_L5_QUIZ, D3_L5_BANK),
  "d3-l6": buildLessonPool("d3-l6", D3_L6_QUIZ, D3_L6_BANK),
  "d3-l7": buildLessonPool("d3-l7", D3_L7_QUIZ, D3_L7_BANK),
  "d4-l1": buildLessonPool("d4-l1", D4_L1_QUIZ, D4_L1_BANK),
  "d4-l2": buildLessonPool("d4-l2", D4_L2_QUIZ, D4_L2_BANK),
  "d4-l3": buildLessonPool("d4-l3", D4_L3_QUIZ, D4_L3_BANK),
  "d4-l4": buildLessonPool("d4-l4", D4_L4_QUIZ, D4_L4_BANK),
  "d4-l5": buildLessonPool("d4-l5", D4_L5_QUIZ, D4_L5_BANK),
  "d4-l6": buildLessonPool("d4-l6", D4_L6_QUIZ, D4_L6_BANK),
  "d4-l7": buildLessonPool("d4-l7", D4_L7_QUIZ, D4_L7_BANK),
  "d4-l8": buildLessonPool("d4-l8", null, D4_L8_BANK),
  "d6-l1": buildLessonPool("d6-l1", D6_L1_QUIZ, D6_L1_BANK),
  "d6-l2": buildLessonPool("d6-l2", D6_L2_QUIZ, D6_L2_BANK),
  "d6-l3": buildLessonPool("d6-l3", D6_L3_QUIZ, D6_L3_BANK),
  "d6-l4": buildLessonPool("d6-l4", D6_L4_QUIZ, D6_L4_BANK),
  "d6-l5": buildLessonPool("d6-l5", D6_L5_QUIZ, D6_L5_BANK),
  "d6-l6": buildLessonPool("d6-l6", D6_L6_QUIZ, D6_L6_BANK),
  "d6-l7": buildLessonPool("d6-l7", D6_L7_QUIZ, D6_L7_BANK),
  "d7-l1": buildLessonPool("d7-l1", D7_L1_QUIZ, D7_L1_BANK),
  "d7-l2": buildLessonPool("d7-l2", D7_L2_QUIZ, D7_L2_BANK),
  "d7-l3": buildLessonPool("d7-l3", D7_L3_QUIZ, D7_L3_BANK),
  "d7-l4": buildLessonPool("d7-l4", D7_L4_QUIZ, D7_L4_BANK),
  "d7-l5": buildLessonPool("d7-l5", D7_L5_QUIZ, D7_L5_BANK),
  "d7-l6": buildLessonPool("d7-l6", D7_L6_QUIZ, D7_L6_BANK),
  "d7-l7": buildLessonPool("d7-l7", D7_L7_QUIZ, D7_L7_BANK),
};

// Returns the pooled, tagged questions for a set of lessonIds, in one
// language. Lessons with no pool defined here (any module beyond d1/d2/d3/d4)
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
