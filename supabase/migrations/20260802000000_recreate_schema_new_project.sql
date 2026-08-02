-- ============================================================
-- Recreate full schema on new project (maritime-academy-pro-prod)
-- Replaces: awtxugfakdarzvgwxwvw (deleted 2026-08-01, test users only)
-- Tables: profiles, user_profiles, user_progress
-- ============================================================

-- ------------------------------------------------------------
-- Shared trigger function (updated_at auto-touch on every UPDATE)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- TABLE: profiles
-- Reproduced identically from 20260617125705_6cd3531f-...sql
-- Public-readable (display_name/avatar_url), self-writable only.
-- ============================================================
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- ============================================================
-- TABLE: user_profiles
-- Schema deduced from src/components/AdminPanel.tsx (375,403,412)
-- and src/components/MaritimeApp.tsx (2275-2311).
--
-- name, lang, dept: read/written by the user themselves
--   (MaritimeApp.tsx persistProfile: upserts user_id, name, lang, dept, updated_at)
-- tier: read by the user, but INERT for client writes on purpose —
--   AdminPanel.tsx's grantPremium/revokePremium (401-416) update `tier`,
--   but AdminPanel is confirmed mock/unwired to any real admin auth
--   (product decision, Billing/Pricing chantier future). No policy or
--   grant below allows any client role to change `tier` — it is
--   deliberately excluded from the INSERT/UPDATE column grants, so no
--   RLS policy could accidentally expose it even by mistake later.
--   Only service_role (bypasses RLS and column grants) can set it.
-- ============================================================
CREATE TABLE public.user_profiles (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  lang TEXT NOT NULL DEFAULT 'fr',
  dept TEXT NOT NULL DEFAULT 'deck',
  tier TEXT NOT NULL DEFAULT 'free',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.user_profiles TO authenticated;
GRANT INSERT (user_id, name, lang, dept, updated_at) ON public.user_profiles TO authenticated;
GRANT UPDATE (name, lang, dept, updated_at) ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_profiles TO service_role;

CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- TABLE: user_progress
-- Schema deduced from src/components/MaritimeApp.tsx (2214-2237, 2262-2272).
-- markLessonCompleted() upserts (user_id, completed_lessons, xp, streak,
-- last_login_date, updated_at) onConflict "user_id" — fully user-writable,
-- no inert columns here (unlike user_profiles.tier).
-- ============================================================
CREATE TABLE public.user_progress (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 1,
  completed_lessons TEXT[] NOT NULL DEFAULT '{}',
  last_login_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;

CREATE POLICY "Users can view their own progress"
  ON public.user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
