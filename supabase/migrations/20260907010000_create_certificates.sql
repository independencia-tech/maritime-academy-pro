-- ============================================================
-- MAP certificates (Foundation modules + Foundation Summary), per the
-- vision validated 2026-08-30 and the scope/model validated 2026-09-07
-- (Option C: one certificate per passed Foundation module, plus one for
-- the 13th exam once passed — shared template, differing subtitle).
--
-- confirmed_name is deliberately its own column, never sourced from
-- user_profiles.name or any localStorage field at read time — the
-- client captures it via an explicit confirm/edit step at generation
-- time and writes it here. This is the fix for the StatusCardS8
-- anti-pattern flagged 2026-09-06 (silent auto-fill from a stale,
-- unconfirmed local registration name).
--
-- One row per (user_id, module_id, category) — upsert semantics, not
-- an append-only log like exam_attempts: a certificate represents the
-- current state of an achievement (and its confirmed name), not a
-- history of generation events. Regenerating with a different name
-- overwrites the row rather than creating a duplicate.
--
-- Integrity: WITH CHECK requires a matching PASSED exam_attempts row
-- for the same user/module — a client can't fabricate a certificate
-- for a module it never actually passed by calling the table directly,
-- same discipline as the 2026-09-07 RLS hardening pass. A
-- foundation_remedial pass counts the same as a foundation pass
-- (confirmed 2026-09-07 — still a genuine pass of the module).
--
-- Grants follow the hardened pattern directly (narrow, explicit,
-- authenticated-only, no anon access) rather than a blanket GRANT ALL
-- later needing cleanup, per the lesson from
-- 20260907000000_harden_rls_grants.sql.
-- ============================================================

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  category TEXT NOT NULL,
  confirmed_name TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id, category)
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;

CREATE POLICY "Users can view their own certificates"
  ON public.certificates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert certificates for their own passed exams"
  ON public.certificates FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.user_id = auth.uid()
        AND exam_attempts.module_id = certificates.module_id
        AND exam_attempts.category IN ('foundation', 'foundation_remedial')
        AND exam_attempts.passed = true
    )
  );

CREATE POLICY "Users can update their own certificates for their own passed exams"
  ON public.certificates FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.user_id = auth.uid()
        AND exam_attempts.module_id = certificates.module_id
        AND exam_attempts.category IN ('foundation', 'foundation_remedial')
        AND exam_attempts.passed = true
    )
  );
