-- ============================================================
-- Fixes a root cause found while verifying 20260907010000
-- (create_certificates): a schema-level default-privilege rule —
-- `ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public` —
-- auto-grants TRUNCATE/REFERENCES/TRIGGER/MAINTAIN to anon and
-- authenticated on every NEW table created by the postgres role (the
-- role `supabase db push` migrations run as). This is why the brand
-- new `certificates` table already carried anon TRUNCATE/REFERENCES/
-- TRIGGER immediately at CREATE TABLE time, before its own migration's
-- explicit GRANT statements ever ran — confirmed via pg_default_acl.
--
-- Without fixing the default ACL itself, every future CREATE TABLE
-- migration would silently reacquire the exact class of over-broad
-- grant that 20260907000000_harden_rls_grants.sql just closed —
-- undoing that work one new table at a time. Fixing this once, here,
-- prevents that recurrence going forward.
--
-- 1. Cleans up the certificates table's own stray grants (same
--    REVOKE-then-GRANT pattern as the hardening migration).
-- 2. Alters the standing default-privilege rule for future tables.
--
-- Does not touch the supabase_admin-owned default ACL on the public
-- schema (also present, grants full access to anon/authenticated) —
-- that one is Supabase's own platform bootstrapping role, not
-- something `db push` migrations trigger (confirmed: certificates only
-- inherited the postgres-owned rule's subset, not the supabase_admin
-- one), and altering platform-owned defaults is out of scope here.
-- ============================================================

BEGIN;

-- 1. certificates — remove the auto-granted extras, keep only the
--    explicit grants declared by 20260907010000.
REVOKE ALL PRIVILEGES ON TABLE public.certificates FROM anon, authenticated;
REVOKE ALL (id, user_id, module_id, category, confirmed_name, issued_at)
  ON public.certificates FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON public.certificates TO authenticated;
-- anon : aucun accès (aucune policy RLS ne le concerne).

-- 2. Standing rule for every future table created by the postgres role
--    in the public schema — prevents this from recurring.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE TRUNCATE, REFERENCES, TRIGGER, MAINTAIN ON TABLES FROM anon, authenticated;

COMMIT;
