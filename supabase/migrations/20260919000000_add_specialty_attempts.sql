-- Specialty Exams (AHTS pilot): reuses exam_attempts as-is for the attempt
-- record itself — module_id holds the operationId (e.g.
-- "ahts_anchor_handling_rig_mooring"), category = "specialty". The
-- attempt's unit is the OPERATION, not the ship and not the rank — see
-- project memory (project_exams_system_architecture.md) for why: Specialty
-- content carries no per-rank dosage (unlike Foundation's trajectory-
-- filtered draw), so shipTypeId is too coarse (one ship groups several
-- independently-gated operations, no-compensation already implemented in
-- scoreShipSpecialty/SpecialtyResultScreen depends on per-operation
-- granularity) and rankId reflects no actual content variation — it would
-- only fragment identical-content attempts across ranks and across a
-- user's own promotions.
--
-- shipTypeId is deliberately NOT stored anywhere here — it's fully
-- derivable from module_id via SPECIALIZED_OPERATION_REGISTRY[operationId]
-- .vesselTypeId at query time, same as Foundation never stores "department"
-- redundantly alongside module_id.
--
-- rank_id IS stored, as attempt-time metadata only (which rank this
-- attempt was taken under) — informational/analytics, never part of the
-- attempt's identity and never read back to gate or filter content.
-- Nullable, additive: existing Foundation rows are unaffected (stay NULL).
ALTER TABLE public.exam_attempts ADD COLUMN rank_id TEXT;

-- Per-item detail for a Specialty attempt. Separate table, not reusing
-- exam_attempt_answers — that table's shape (question_id/lesson_id/
-- was_correct) is a flat MCQ answer, which doesn't fit multi-type,
-- partially-weighted items (an exercise scores 0-1 fractionally except
-- sequence_reordering which is binary; a scenario_node's score is one
-- decision's quality weight, not a correct/incorrect boolean). Same
-- ownership pattern as exam_attempt_answers: no direct user_id column,
-- ownership expressed through a join on exam_attempts.user_id.
CREATE TABLE public.specialty_attempt_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('exercise', 'scenario_node')),
  item_id TEXT NOT NULL,
  score_earned NUMERIC NOT NULL,
  score_possible NUMERIC NOT NULL
);
CREATE INDEX specialty_attempt_items_attempt_idx
  ON public.specialty_attempt_items (attempt_id);

ALTER TABLE public.specialty_attempt_items ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.specialty_attempt_items TO authenticated;
GRANT ALL ON public.specialty_attempt_items TO service_role;

CREATE POLICY "Users can view items of their own specialty attempts" ON public.specialty_attempt_items
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.id = specialty_attempt_items.attempt_id
        AND exam_attempts.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert items for their own specialty attempts" ON public.specialty_attempt_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.id = specialty_attempt_items.attempt_id
        AND exam_attempts.user_id = auth.uid()
    )
  );
