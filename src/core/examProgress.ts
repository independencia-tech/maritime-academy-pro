// @ts-nocheck
// ── examProgress.ts ────────────────────────────────────────────
// First real functional brick of the Exam Center: computing a per-user,
// per-module average score from lesson_scores, for the future 70%
// unlock rule. Deliberately does NOT decide or enforce any unlock
// logic yet — see project memory (project_exams_system_architecture.md)
// for why that's a separate, later step.
//
// @ts-nocheck: the generated Supabase Database type (src/integrations/
// supabase/types.ts) does not yet include the lesson_scores table
// (added via a manual migration, not through the type generator) —
// same reason MaritimeApp.tsx's own lesson_scores calls live in an
// @ts-nocheck file.

import { supabase } from "@/integrations/supabase/client";
import { LESSON_REGISTRY } from "./lessonRegistry";

export interface ModuleAverageResult {
  // Weighted average = sum(score) / sum(max_score) as a %, rounded to the
  // nearest integer. null means "no lesson of this module has been
  // attempted yet" — distinct from 0, which would mean a real 0% average.
  averagePercent: number | null;
  attemptedLessons: number;
  totalLessons: number;
}

export async function getModuleAverageScore(
  userId: string,
  moduleId: string
): Promise<ModuleAverageResult> {
  const moduleLessonIds = Object.values(LESSON_REGISTRY)
    .filter((entry) => entry.moduleId === moduleId)
    .map((entry) => entry.lessonId);
  const totalLessons = moduleLessonIds.length;

  const { data, error } = await supabase
    .from("lesson_scores")
    .select("lesson_id, score, max_score")
    .eq("user_id", userId);

  if (error) {
    console.error("[getModuleAverageScore] lesson_scores fetch failed:", error);
    return { averagePercent: null, attemptedLessons: 0, totalLessons };
  }

  const moduleRows = (data || []).filter((row: any) =>
    moduleLessonIds.includes(row.lesson_id)
  );

  if (moduleRows.length === 0) {
    return { averagePercent: null, attemptedLessons: 0, totalLessons };
  }

  const totalScore = moduleRows.reduce((sum: number, row: any) => sum + row.score, 0);
  const totalMaxScore = moduleRows.reduce((sum: number, row: any) => sum + row.max_score, 0);
  const averagePercent = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : null;

  return { averagePercent, attemptedLessons: moduleRows.length, totalLessons };
}
