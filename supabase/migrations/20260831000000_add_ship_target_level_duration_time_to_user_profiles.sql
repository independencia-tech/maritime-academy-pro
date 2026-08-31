-- ============================================================
-- Adds ship/target/level/duration/time columns to user_profiles,
-- so questionnaire answers survive across devices/sessions (previously
-- only persisted in localStorage/React state, never sent to Supabase).
-- Additive only: nullable columns, no DEFAULT, no existing data touched.
-- Column-level GRANT is extended to match, since PostgREST enforces
-- column-level privileges independently of RLS row policies.
-- ============================================================
ALTER TABLE public.user_profiles
  ADD COLUMN ship TEXT,
  ADD COLUMN target TEXT,
  ADD COLUMN level TEXT,
  ADD COLUMN duration TEXT,
  ADD COLUMN time TEXT;

GRANT INSERT (user_id, name, lang, dept, ship, target, level, duration, time, updated_at)
  ON public.user_profiles TO authenticated;
GRANT UPDATE (name, lang, dept, ship, target, level, duration, time, updated_at)
  ON public.user_profiles TO authenticated;
