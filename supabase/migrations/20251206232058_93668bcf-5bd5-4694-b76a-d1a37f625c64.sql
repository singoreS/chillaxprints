-- 1. Force RLS on profiles table to prevent any policy bypasses
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

-- 2. Force RLS on addresses table to prevent any policy bypasses
ALTER TABLE public.addresses FORCE ROW LEVEL SECURITY;

-- 3. Remove the UPDATE policy on loyalty_points to prevent fraud
-- Users should only be able to modify points via secure backend functions
DROP POLICY IF EXISTS "Users can update own loyalty points" ON public.loyalty_points;