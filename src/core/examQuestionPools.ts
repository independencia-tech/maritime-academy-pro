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

import { QUIZ as S1_L1_QUIZ, BANK as S1_L1_BANK } from "../components/LessonSafetyS1_L1";
import { QUIZ as S1_L2_QUIZ, BANK as S1_L2_BANK } from "../components/LessonSafetyS1_L2";
import { QUIZ as S1_L3_QUIZ, BANK as S1_L3_BANK } from "../components/LessonSafetyS1_L3";
import { QUIZ as S1_L4_QUIZ, BANK as S1_L4_BANK } from "../components/LessonSafetyS1_L4";
import { QUIZ as S1_L5_QUIZ, BANK as S1_L5_BANK } from "../components/LessonSafetyS1_L5";
import { QUIZ as S1_L6_QUIZ, BANK as S1_L6_BANK } from "../components/LessonSafetyS1_L6";
import { QUIZ as S1E_L1_QUIZ, BANK as S1E_L1_BANK } from "../components/LessonSafetyS1E_L1";
import { QUIZ as S1E_L2_QUIZ, BANK as S1E_L2_BANK } from "../components/LessonSafetyS1E_L2";
import { QUIZ as S1E_L3_QUIZ, BANK as S1E_L3_BANK } from "../components/LessonSafetyS1E_L3";
import { QUIZ as S1E_L4_QUIZ, BANK as S1E_L4_BANK } from "../components/LessonSafetyS1E_L4";
import { QUIZ as S1E_L5_QUIZ, BANK as S1E_L5_BANK } from "../components/LessonSafetyS1E_L5";
import { QUIZ as S1E_L6_QUIZ, BANK as S1E_L6_BANK } from "../components/LessonSafetyS1E_L6";

import { QUIZ as S2_L1_QUIZ, BANK as S2_L1_BANK } from "../components/LessonSafetyS2_L1";
import { QUIZ as S2_L2_QUIZ, BANK as S2_L2_BANK } from "../components/LessonSafetyS2_L2";
import { QUIZ as S2_L3_QUIZ, BANK as S2_L3_BANK } from "../components/LessonSafetyS2_L3";
import { QUIZ as S2_L4_QUIZ, BANK as S2_L4_BANK } from "../components/LessonSafetyS2_L4";
import { QUIZ as S2_L5_QUIZ, BANK as S2_L5_BANK } from "../components/LessonSafetyS2_L5";

import { QUIZ as S3_L1_QUIZ, BANK as S3_L1_BANK } from "../components/LessonSafetyS3_L1";
import { QUIZ as S3_L2_QUIZ, BANK as S3_L2_BANK } from "../components/LessonSafetyS3_L2";
import { QUIZ as S3_L3_QUIZ, BANK as S3_L3_BANK } from "../components/LessonSafetyS3_L3";
import { QUIZ as S3_L4_QUIZ, BANK as S3_L4_BANK } from "../components/LessonSafetyS3_L4";
import { QUIZ as S3_L5_QUIZ, BANK as S3_L5_BANK } from "../components/LessonSafetyS3_L5";
import { QUIZ as S3_L6_QUIZ, BANK as S3_L6_BANK } from "../components/LessonSafetyS3_L6";
import { QUIZ as S3_L7_QUIZ, BANK as S3_L7_BANK } from "../components/LessonSafetyS3_L7";
import { QUIZ as S3_L8_QUIZ, BANK as S3_L8_BANK } from "../components/LessonSafetyS3_L8";

import { QUIZ as S4_L1_QUIZ, BANK as S4_L1_BANK } from "../components/LessonSafetyS4_L1";
import { QUIZ as S4_L2_QUIZ, BANK as S4_L2_BANK } from "../components/LessonSafetyS4_L2";
import { QUIZ as S4_L3_QUIZ, BANK as S4_L3_BANK } from "../components/LessonSafetyS4_L3";
import { QUIZ as S4_L4_QUIZ, BANK as S4_L4_BANK } from "../components/LessonSafetyS4_L4";
import { QUIZ as S4_L5_QUIZ, BANK as S4_L5_BANK } from "../components/LessonSafetyS4_L5";
import { QUIZ as S4_L6_QUIZ, BANK as S4_L6_BANK } from "../components/LessonSafetyS4_L6";
import { QUIZ as S4_L7_QUIZ, BANK as S4_L7_BANK } from "../components/LessonSafetyS4_L7";

import { QUIZ as S5_L1_QUIZ, BANK as S5_L1_BANK } from "../components/LessonSafetyS5_L1";
import { QUIZ as S5_L2_QUIZ, BANK as S5_L2_BANK } from "../components/LessonSafetyS5_L2";
import { QUIZ as S5_L3_QUIZ, BANK as S5_L3_BANK } from "../components/LessonSafetyS5_L3";
import { QUIZ as S5_L4_QUIZ, BANK as S5_L4_BANK } from "../components/LessonSafetyS5_L4";

import { QUIZ as S6_L1_QUIZ, BANK as S6_L1_BANK } from "../components/LessonSafetyS6_L1";
import { QUIZ as S6_L2_QUIZ, BANK as S6_L2_BANK } from "../components/LessonSafetyS6_L2";
import { QUIZ as S6_L3_QUIZ, BANK as S6_L3_BANK } from "../components/LessonSafetyS6_L3";
import { QUIZ as S6_L4_QUIZ, BANK as S6_L4_BANK } from "../components/LessonSafetyS6_L4";
import { QUIZ as S6_L5_QUIZ, BANK as S6_L5_BANK } from "../components/LessonSafetyS6_L5";
import { QUIZ as S6_L6_QUIZ, BANK as S6_L6_BANK } from "../components/LessonSafetyS6_L6";

import { QUIZ as E2_L1_QUIZ, BANK as E2_L1_BANK } from "../components/LessonE2_L1";
import { QUIZ as E2_L2_QUIZ, BANK as E2_L2_BANK } from "../components/LessonE2_L2";
import { QUIZ as E2_L3_QUIZ, BANK as E2_L3_BANK } from "../components/LessonE2_L3";
import { QUIZ as E2_L4_QUIZ, BANK as E2_L4_BANK } from "../components/LessonE2_L4";
import { QUIZ as E2_L5_QUIZ, BANK as E2_L5_BANK } from "../components/LessonE2_L5";
import { QUIZ as E2_L6_QUIZ, BANK as E2_L6_BANK } from "../components/LessonE2_L6";
import { QUIZ as E2_L7_QUIZ, BANK as E2_L7_BANK } from "../components/LessonE2_L7";

import { QUIZ as E3_L1_QUIZ, BANK as E3_L1_BANK } from "../components/LessonE3_L1";
import { QUIZ as E3_L2_QUIZ, BANK as E3_L2_BANK } from "../components/LessonE3_L2";
import { QUIZ as E3_L3_QUIZ, BANK as E3_L3_BANK } from "../components/LessonE3_L3";
import { QUIZ as E3_L4_QUIZ, BANK as E3_L4_BANK } from "../components/LessonE3_L4";
import { QUIZ as E3_L5_QUIZ, BANK as E3_L5_BANK } from "../components/LessonE3_L5";
import { QUIZ as E3_L6_QUIZ, BANK as E3_L6_BANK } from "../components/LessonE3_L6";

import { QUIZ as E1_L1_QUIZ, BANK as E1_L1_BANK } from "../components/LessonMoteur";
import { QUIZ as E1_L2_QUIZ, BANK as E1_L2_BANK } from "../components/LessonAuxiliaires";
import { QUIZ as E1_L3_QUIZ, BANK as E1_L3_BANK } from "../components/LessonStabilite";
import { QUIZ as E1_L4_QUIZ, BANK as E1_L4_BANK } from "../components/LessonIncendie";
import { QUIZ as E1_L5_QUIZ, BANK as E1_L5_BANK } from "../components/LessonSauvetage";
import { QUIZ as E1_L6_QUIZ, BANK as E1_L6_BANK } from "../components/LessonMaintenance";
import { QUIZ as E1_L7_QUIZ, BANK as E1_L7_BANK } from "../components/LessonWatchkeeping";
import { QUIZ as E1_L8_QUIZ, BANK as E1_L8_BANK } from "../components/LessonEmergency";

import { QUIZ as E4_L1_QUIZ, BANK as E4_L1_BANK } from "../components/LessonMARPOL";
import { QUIZ as E4_L2_QUIZ, BANK as E4_L2_BANK } from "../components/LessonMARPOL_L2";
import { QUIZ as E4_L3_QUIZ, BANK as E4_L3_BANK } from "../components/LessonMARPOL_L3";
import { QUIZ as E4_L4_QUIZ, BANK as E4_L4_BANK } from "../components/LessonMARPOL_L4";
import { QUIZ as E4_L5_QUIZ, BANK as E4_L5_BANK } from "../components/LessonMARPOL_L5";
import { QUIZ as E4_L6_QUIZ, BANK as E4_L6_BANK } from "../components/LessonMARPOL_L6";

import { QUIZ as E5_L1_QUIZ, BANK as E5_L1_BANK } from "../components/LessonSEEMP_L1";
import { QUIZ as E5_L2_QUIZ, BANK as E5_L2_BANK } from "../components/LessonSEEMP_L2";
import { QUIZ as E5_L3_QUIZ, BANK as E5_L3_BANK } from "../components/LessonSEEMP_L3";
import { QUIZ as E5_L4_QUIZ, BANK as E5_L4_BANK } from "../components/LessonSEEMP_L4";
import { QUIZ as E5_L5_QUIZ, BANK as E5_L5_BANK } from "../components/LessonSEEMP_L5";

import { QUIZ as E6_L1_QUIZ, BANK as E6_L1_BANK } from "../components/LessonE6_L1";
import { QUIZ as E6_L2_QUIZ, BANK as E6_L2_BANK } from "../components/LessonE6_L2";
import { QUIZ as E6_L3_QUIZ, BANK as E6_L3_BANK } from "../components/LessonE6_L3";
import { QUIZ as E6_L4_QUIZ, BANK as E6_L4_BANK } from "../components/LessonE6_L4";
import { QUIZ as E6_L5_QUIZ, BANK as E6_L5_BANK } from "../components/LessonE6_L5";
import { QUIZ as E6_L6_QUIZ, BANK as E6_L6_BANK } from "../components/LessonE6_L6";

import { QUIZ as E7_L1_QUIZ, BANK as E7_L1_BANK } from "../components/LessonE7_L1";
import { QUIZ as E7_L2_QUIZ, BANK as E7_L2_BANK } from "../components/LessonE7_L2";
import { QUIZ as E7_L3_QUIZ, BANK as E7_L3_BANK } from "../components/LessonE7_L3";
import { QUIZ as E7_L4_QUIZ, BANK as E7_L4_BANK } from "../components/LessonE7_L4";
import { QUIZ as E7_L5_QUIZ, BANK as E7_L5_BANK } from "../components/LessonE7_L5";

import { SUMMARY_QUESTIONS } from "./examSummaryQuestions";

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
  "s1-l1": buildLessonPool("s1-l1", S1_L1_QUIZ, S1_L1_BANK),
  "s1-l2": buildLessonPool("s1-l2", S1_L2_QUIZ, S1_L2_BANK),
  "s1-l3": buildLessonPool("s1-l3", S1_L3_QUIZ, S1_L3_BANK),
  "s1-l4": buildLessonPool("s1-l4", S1_L4_QUIZ, S1_L4_BANK),
  "s1-l5": buildLessonPool("s1-l5", S1_L5_QUIZ, S1_L5_BANK),
  "s1-l6": buildLessonPool("s1-l6", S1_L6_QUIZ, S1_L6_BANK),
  "s1e-l1": buildLessonPool("s1e-l1", S1E_L1_QUIZ, S1E_L1_BANK),
  "s1e-l2": buildLessonPool("s1e-l2", S1E_L2_QUIZ, S1E_L2_BANK),
  "s1e-l3": buildLessonPool("s1e-l3", S1E_L3_QUIZ, S1E_L3_BANK),
  "s1e-l4": buildLessonPool("s1e-l4", S1E_L4_QUIZ, S1E_L4_BANK),
  "s1e-l5": buildLessonPool("s1e-l5", S1E_L5_QUIZ, S1E_L5_BANK),
  "s1e-l6": buildLessonPool("s1e-l6", S1E_L6_QUIZ, S1E_L6_BANK),
  "s2-l1": buildLessonPool("s2-l1", S2_L1_QUIZ, S2_L1_BANK),
  "s2-l2": buildLessonPool("s2-l2", S2_L2_QUIZ, S2_L2_BANK),
  "s2-l3": buildLessonPool("s2-l3", S2_L3_QUIZ, S2_L3_BANK),
  "s2-l4": buildLessonPool("s2-l4", S2_L4_QUIZ, S2_L4_BANK),
  "s2-l5": buildLessonPool("s2-l5", S2_L5_QUIZ, S2_L5_BANK),
  "s3-l1": buildLessonPool("s3-l1", S3_L1_QUIZ, S3_L1_BANK),
  "s3-l2": buildLessonPool("s3-l2", S3_L2_QUIZ, S3_L2_BANK),
  "s3-l3": buildLessonPool("s3-l3", S3_L3_QUIZ, S3_L3_BANK),
  "s3-l4": buildLessonPool("s3-l4", S3_L4_QUIZ, S3_L4_BANK),
  "s3-l5": buildLessonPool("s3-l5", S3_L5_QUIZ, S3_L5_BANK),
  "s3-l6": buildLessonPool("s3-l6", S3_L6_QUIZ, S3_L6_BANK),
  "s3-l7": buildLessonPool("s3-l7", S3_L7_QUIZ, S3_L7_BANK),
  "s3-l8": buildLessonPool("s3-l8", S3_L8_QUIZ, S3_L8_BANK),
  "s4-l1": buildLessonPool("s4-l1", S4_L1_QUIZ, S4_L1_BANK),
  "s4-l2": buildLessonPool("s4-l2", S4_L2_QUIZ, S4_L2_BANK),
  "s4-l3": buildLessonPool("s4-l3", S4_L3_QUIZ, S4_L3_BANK),
  "s4-l4": buildLessonPool("s4-l4", S4_L4_QUIZ, S4_L4_BANK),
  "s4-l5": buildLessonPool("s4-l5", S4_L5_QUIZ, S4_L5_BANK),
  "s4-l6": buildLessonPool("s4-l6", S4_L6_QUIZ, S4_L6_BANK),
  "s4-l7": buildLessonPool("s4-l7", S4_L7_QUIZ, S4_L7_BANK),
  "s5-l1": buildLessonPool("s5-l1", S5_L1_QUIZ, S5_L1_BANK),
  "s5-l2": buildLessonPool("s5-l2", S5_L2_QUIZ, S5_L2_BANK),
  "s5-l3": buildLessonPool("s5-l3", S5_L3_QUIZ, S5_L3_BANK),
  "s5-l4": buildLessonPool("s5-l4", S5_L4_QUIZ, S5_L4_BANK),
  "s6-l1": buildLessonPool("s6-l1", S6_L1_QUIZ, S6_L1_BANK),
  "s6-l2": buildLessonPool("s6-l2", S6_L2_QUIZ, S6_L2_BANK),
  "s6-l3": buildLessonPool("s6-l3", S6_L3_QUIZ, S6_L3_BANK),
  "s6-l4": buildLessonPool("s6-l4", S6_L4_QUIZ, S6_L4_BANK),
  "s6-l5": buildLessonPool("s6-l5", S6_L5_QUIZ, S6_L5_BANK),
  "s6-l6": buildLessonPool("s6-l6", S6_L6_QUIZ, S6_L6_BANK),

  "e2-l1": buildLessonPool("e2-l1", E2_L1_QUIZ, E2_L1_BANK),
  "e2-l2": buildLessonPool("e2-l2", E2_L2_QUIZ, E2_L2_BANK),
  "e2-l3": buildLessonPool("e2-l3", E2_L3_QUIZ, E2_L3_BANK),
  "e2-l4": buildLessonPool("e2-l4", E2_L4_QUIZ, E2_L4_BANK),
  "e2-l5": buildLessonPool("e2-l5", E2_L5_QUIZ, E2_L5_BANK),
  "e2-l6": buildLessonPool("e2-l6", E2_L6_QUIZ, E2_L6_BANK),
  "e2-l7": buildLessonPool("e2-l7", E2_L7_QUIZ, E2_L7_BANK),

  "e3-l1": buildLessonPool("e3-l1", E3_L1_QUIZ, E3_L1_BANK),
  "e3-l2": buildLessonPool("e3-l2", E3_L2_QUIZ, E3_L2_BANK),
  "e3-l3": buildLessonPool("e3-l3", E3_L3_QUIZ, E3_L3_BANK),
  "e3-l4": buildLessonPool("e3-l4", E3_L4_QUIZ, E3_L4_BANK),
  "e3-l5": buildLessonPool("e3-l5", E3_L5_QUIZ, E3_L5_BANK),
  "e3-l6": buildLessonPool("e3-l6", E3_L6_QUIZ, E3_L6_BANK),

  "e1-l1": buildLessonPool("e1-l1", E1_L1_QUIZ, E1_L1_BANK),
  "e1-l2": buildLessonPool("e1-l2", E1_L2_QUIZ, E1_L2_BANK),
  "e1-l3": buildLessonPool("e1-l3", E1_L3_QUIZ, E1_L3_BANK),
  "e1-l4": buildLessonPool("e1-l4", E1_L4_QUIZ, E1_L4_BANK),
  "e1-l5": buildLessonPool("e1-l5", E1_L5_QUIZ, E1_L5_BANK),
  "e1-l6": buildLessonPool("e1-l6", E1_L6_QUIZ, E1_L6_BANK),
  "e1-l7": buildLessonPool("e1-l7", E1_L7_QUIZ, E1_L7_BANK),
  "e1-l8": buildLessonPool("e1-l8", E1_L8_QUIZ, E1_L8_BANK),

  "e4-l1": buildLessonPool("e4-l1", E4_L1_QUIZ, E4_L1_BANK),
  "e4-l2": buildLessonPool("e4-l2", E4_L2_QUIZ, E4_L2_BANK),
  "e4-l3": buildLessonPool("e4-l3", E4_L3_QUIZ, E4_L3_BANK),
  "e4-l4": buildLessonPool("e4-l4", E4_L4_QUIZ, E4_L4_BANK),
  "e4-l5": buildLessonPool("e4-l5", E4_L5_QUIZ, E4_L5_BANK),
  "e4-l6": buildLessonPool("e4-l6", E4_L6_QUIZ, E4_L6_BANK),

  "e5-l1": buildLessonPool("e5-l1", E5_L1_QUIZ, E5_L1_BANK),
  "e5-l2": buildLessonPool("e5-l2", E5_L2_QUIZ, E5_L2_BANK),
  "e5-l3": buildLessonPool("e5-l3", E5_L3_QUIZ, E5_L3_BANK),
  "e5-l4": buildLessonPool("e5-l4", E5_L4_QUIZ, E5_L4_BANK),
  "e5-l5": buildLessonPool("e5-l5", E5_L5_QUIZ, E5_L5_BANK),

  "e6-l1": buildLessonPool("e6-l1", E6_L1_QUIZ, E6_L1_BANK),
  "e6-l2": buildLessonPool("e6-l2", E6_L2_QUIZ, E6_L2_BANK),
  "e6-l3": buildLessonPool("e6-l3", E6_L3_QUIZ, E6_L3_BANK),
  "e6-l4": buildLessonPool("e6-l4", E6_L4_QUIZ, E6_L4_BANK),
  "e6-l5": buildLessonPool("e6-l5", E6_L5_QUIZ, E6_L5_BANK),
  "e6-l6": buildLessonPool("e6-l6", E6_L6_QUIZ, E6_L6_BANK),

  "e7-l1": buildLessonPool("e7-l1", E7_L1_QUIZ, E7_L1_BANK),
  "e7-l2": buildLessonPool("e7-l2", E7_L2_QUIZ, E7_L2_BANK),
  "e7-l3": buildLessonPool("e7-l3", E7_L3_QUIZ, E7_L3_BANK),
  "e7-l4": buildLessonPool("e7-l4", E7_L4_QUIZ, E7_L4_BANK),
  "e7-l5": buildLessonPool("e7-l5", E7_L5_QUIZ, E7_L5_BANK),
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

// 13th exam ("Foundation Summary") — flattens the 6 cross-domain themes from
// examSummaryQuestions.ts into one tagged pool per language, same tagging
// scheme as buildLessonPool (questionId + lessonId) except lessonId here is
// the theme id (e.g. "theme1_collision_weather"), not a real lessonId — no
// single lesson maps to a cross-domain scenario question. useFoundationSummaryExam
// draws the full 20-question set (no random subset — the content was written
// to exactly match EXAM_QUESTION_COUNT), so this returns everything rather
// than taking a lessonIds filter like getQuestionPoolForLessons above.
const SUMMARY_POOL = {};
for (const themeId of Object.keys(SUMMARY_QUESTIONS)) {
  SUMMARY_POOL[themeId] = buildLessonPool(themeId, null, SUMMARY_QUESTIONS[themeId]);
}

export function getSummaryExamQuestions(lang) {
  const safeLang = LANGS.includes(lang) ? lang : "fr";
  const out = [];
  for (const themeId of Object.keys(SUMMARY_POOL)) {
    out.push(...SUMMARY_POOL[themeId][safeLang]);
  }
  return out;
}
