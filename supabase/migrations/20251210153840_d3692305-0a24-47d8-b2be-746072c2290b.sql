-- Fix affiliate_referrals: Only allow inserts via service role (edge functions)
-- Drop existing permissive policy if exists
DROP POLICY IF EXISTS "Anyone can create referrals" ON public.affiliate_referrals;
DROP POLICY IF EXISTS "Affiliates can view their own referrals" ON public.affiliate_referrals;

-- Create restrictive RLS policies
-- Only affiliates can view their own referrals
CREATE POLICY "Affiliates can view their own referrals"
ON public.affiliate_referrals
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.affiliates
    WHERE affiliates.id = affiliate_referrals.affiliate_id
    AND affiliates.user_id = auth.uid()
  )
);

-- No direct INSERT allowed - must go through edge function with service role
-- This prevents fake referral creation

-- Fix affiliates table: Ensure PayPal email is only visible to owner
DROP POLICY IF EXISTS "Users can view their own affiliate profile" ON public.affiliates;
DROP POLICY IF EXISTS "Users can update their own affiliate profile" ON public.affiliates;

-- Affiliates can only see their own profile (including PayPal email)
CREATE POLICY "Users can view their own affiliate profile"
ON public.affiliates
FOR SELECT
USING (auth.uid() = user_id);

-- Affiliates can only update their own profile
CREATE POLICY "Users can update their own affiliate profile"
ON public.affiliates
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);