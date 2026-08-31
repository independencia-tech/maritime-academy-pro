-- ============================================================
-- Adds the `who` column (current rank, RankId) to user_profiles.
--
-- Same gap as the 20260831000000 migration fixed for ship/target/level/
-- duration/time: `who` was captured by the questionnaire and kept in
-- profile/localStorage state, but never sent to Supabase, so it never
-- survived a cross-device/cross-session restore -- unlike `target`
-- (the visé rank), which IS persisted. The entire Core Algorithm
-- trajectory (getRankPath(who, target)) depends on this field; without
-- it, no trajectory can be computed after a session/device change.
--
-- Additive only: nullable column, no DEFAULT, no existing data touched.
-- Column-level GRANT extended to match -- PostgREST enforces
-- column-level privileges independently of RLS row policies, same as
-- the previous migration.
-- ============================================================
ALTER TABLE public.user_profiles
  ADD COLUMN who TEXT;

GRANT INSERT (user_id, name, lang, dept, ship, target, level, duration, time, who, updated_at)
  ON public.user_profiles TO authenticated;
GRANT UPDATE (name, lang, dept, ship, target, level, duration, time, who, updated_at)
  ON public.user_profiles TO authenticated;
