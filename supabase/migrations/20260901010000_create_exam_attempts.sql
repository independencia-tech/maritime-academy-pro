-- Foundation Exams: first real exam-attempt persistence (pilot module d1
-- only, wired in examEngine.ts). Append-only attempt log (one row per
-- attempt), distinct from lesson_scores' upsert-per-key shape — needed for
-- remedial-exam derivation, certificate linkage, and progress analytics.
-- See project memory (project_exams_system_architecture.md, "Foundation
-- Exams system") for the full doctrine this implements.
CREATE TABLE public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  category TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX exam_attempts_user_module_category_idx
  ON public.exam_attempts (user_id, module_id, category, attempted_at DESC);

ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.exam_attempts TO authenticated;
GRANT ALL ON public.exam_attempts TO service_role;
CREATE POLICY "Users can view their own exam attempts" ON public.exam_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own exam attempts" ON public.exam_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Per-question answers for an attempt. Separate table (not JSON embedded in
-- exam_attempts) to stay cleanly queryable for per-question analytics and
-- the future remedial "review this lesson" suggestion. No direct user_id
-- column here (avoids duplicating exam_attempts.user_id) — ownership is
-- always expressed through a join/subquery on exam_attempts.user_id.
CREATE TABLE public.exam_attempt_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  was_correct BOOLEAN NOT NULL
);
CREATE INDEX exam_attempt_answers_attempt_idx
  ON public.exam_attempt_answers (attempt_id);

ALTER TABLE public.exam_attempt_answers ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.exam_attempt_answers TO authenticated;
GRANT ALL ON public.exam_attempt_answers TO service_role;
CREATE POLICY "Users can view answers of their own attempts" ON public.exam_attempt_answers
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.id = exam_attempt_answers.attempt_id
        AND exam_attempts.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert answers for their own attempts" ON public.exam_attempt_answers
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.id = exam_attempt_answers.attempt_id
        AND exam_attempts.user_id = auth.uid()
    )
  );
