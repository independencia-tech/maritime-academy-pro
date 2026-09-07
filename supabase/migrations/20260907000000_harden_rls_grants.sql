-- ============================================================
-- Corrige la dette technique RLS identifiée par l'audit du 2026-09-07
-- (audits/2026-09-07-audit-rls-supabase-suivi.md). Uniquement des
-- REVOKE/GRANT — aucune table, colonne ou policy RLS n'est modifiée ;
-- toutes les policies existantes continuent de s'appliquer à l'identique.
--
-- 1. user_profiles : révoque le vieux GRANT hérité (toutes colonnes
--    ouvertes à anon+authenticated, y compris tier) et le remplace
--    par exactement l'état déjà déclaré par les migrations
--    20260802000000 + 20260831000000 + 20260831010000 — c'est-à-dire
--    le grant qui existait déjà en théorie, mais qu'un grant plus
--    ancien et plus large (jamais révoqué) rendait inopérant.
-- 2. profiles / user_progress : retire l'accès anon superflu (aucune
--    policy RLS ne concerne anon sur ces tables, hors le SELECT public
--    intentionnel sur profiles, conservé).
-- 3. lesson_scores / exam_attempts / exam_attempt_answers : retire
--    TRUNCATE/TRIGGER/REFERENCES superflus (non exploitables via
--    l'API REST aujourd'hui, mais aucune raison de les laisser).
-- 4. rls_auto_enable() : retire l'EXECUTE public (event trigger interne
--    "ensure_rls", invoqué par Postgres lui-même sur CREATE TABLE,
--    jamais censé être appelé directement).
--
-- service_role n'est touché nulle part ci-dessous (garde GRANT ALL
-- sur toutes les tables, déjà déclaré par les migrations existantes).
--
-- Rollback (si régression) : voir le script de secours conservé hors
-- dépôt (scratchpad de session) qui restaure l'état exact d'avant.
-- ============================================================

BEGIN;

-- 1. user_profiles — la brèche principale
REVOKE ALL PRIVILEGES ON TABLE public.user_profiles FROM anon, authenticated;
REVOKE ALL (user_id, name, lang, dept, tier, updated_at, ship, target, level, duration, time, who)
  ON public.user_profiles FROM anon, authenticated;

GRANT SELECT ON public.user_profiles TO authenticated;
GRANT INSERT (user_id, name, lang, dept, ship, target, level, duration, time, who, updated_at)
  ON public.user_profiles TO authenticated;
GRANT UPDATE (name, lang, dept, ship, target, level, duration, time, who, updated_at)
  ON public.user_profiles TO authenticated;
-- anon : aucun accès. tier : absent des deux listes → non modifiable
-- par authenticated ni anon, seul service_role peut le changer.

-- 2. profiles — anon ramené au SELECT public déjà voulu, rien d'autre
REVOKE ALL PRIVILEGES ON TABLE public.profiles FROM anon, authenticated;
REVOKE ALL (id, display_name, avatar_url, created_at, updated_at)
  ON public.profiles FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;

-- 3. user_progress — anon retiré entièrement
REVOKE ALL PRIVILEGES ON TABLE public.user_progress FROM anon, authenticated;
REVOKE ALL (user_id, xp, streak, completed_lessons, last_login_date, updated_at)
  ON public.user_progress FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON public.user_progress TO authenticated;

-- 4. lesson_scores / exam_attempts / exam_attempt_answers — hygiène
REVOKE ALL PRIVILEGES ON TABLE public.lesson_scores FROM anon, authenticated;
REVOKE ALL (user_id, lesson_id, score, max_score, attempts, updated_at)
  ON public.lesson_scores FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.lesson_scores TO authenticated;

REVOKE ALL PRIVILEGES ON TABLE public.exam_attempts FROM anon, authenticated;
REVOKE ALL (id, user_id, module_id, category, score, max_score, passed, attempted_at)
  ON public.exam_attempts FROM anon, authenticated;
GRANT SELECT, INSERT ON public.exam_attempts TO authenticated;

REVOKE ALL PRIVILEGES ON TABLE public.exam_attempt_answers FROM anon, authenticated;
REVOKE ALL (id, attempt_id, question_id, lesson_id, was_correct)
  ON public.exam_attempt_answers FROM anon, authenticated;
GRANT SELECT, INSERT ON public.exam_attempt_answers TO authenticated;

-- 5. rls_auto_enable() — retire l'EXECUTE public/anon/authenticated
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

COMMIT;
