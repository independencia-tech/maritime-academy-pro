-- Persists a quiz result per (user, lesson): the strict minimum needed to later
-- compute a per-module average for the Exam Center's 70% unlock threshold.
-- Purely additive — does not touch user_progress.completed_lessons or the
-- "Lessons" counter derived from it (Dashboard.tsx / StatusCardS8.tsx).
--
-- One row per (user_id, lesson_id): the latest/best-known quiz result, not a
-- full attempt-history log. `attempts` is incremented on each retry via
-- upsert; `score`/`max_score` are stored separately (not a precomputed
-- percentage) so a per-module average can be recomputed accurately even if
-- a lesson's quiz size changes later.
CREATE TABLE public.lesson_scores (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);

ALTER TABLE public.lesson_scores ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON public.lesson_scores TO authenticated;
GRANT ALL ON public.lesson_scores TO service_role;

CREATE POLICY "Users can view their own lesson scores"
  ON public.lesson_scores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson scores"
  ON public.lesson_scores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson scores"
  ON public.lesson_scores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_lesson_scores_updated_at
  BEFORE UPDATE ON public.lesson_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
