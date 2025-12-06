-- Fix security issues for sensitive user data

-- 1. Add explicit deny policy for anonymous access to newsletter_subscriptions
CREATE POLICY "Deny anonymous read access to newsletter"
ON public.newsletter_subscriptions
FOR SELECT
TO anon
USING (false);

-- 2. Add RLS policies for order_access_tokens
-- Only allow users to view tokens for their own orders
CREATE POLICY "Users can view own order tokens"
ON public.order_access_tokens
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_access_tokens.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Deny anonymous access to order tokens
CREATE POLICY "Deny anonymous access to order tokens"
ON public.order_access_tokens
FOR SELECT
TO anon
USING (false);

-- Only service role can insert/update/delete tokens (via edge functions)
CREATE POLICY "Service role can manage tokens"
ON public.order_access_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Reinforce profiles table - ensure authenticated users cannot access other profiles
-- The existing policies already use auth.uid() = id, but add explicit anon denial
CREATE POLICY "Deny anonymous insert to profiles"
ON public.profiles
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anonymous update to profiles"
ON public.profiles
FOR UPDATE
TO anon
USING (false);

-- 4. Add explicit anonymous denial for addresses table
CREATE POLICY "Deny anonymous access to addresses"
ON public.addresses
FOR SELECT
TO anon
USING (false);

-- 5. Add explicit anonymous denial for orders table (in addition to existing policies)
CREATE POLICY "Deny anonymous insert to orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (false);

-- 6. Add explicit anonymous denial for loyalty data
CREATE POLICY "Deny anonymous access to loyalty points"
ON public.loyalty_points
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anonymous access to loyalty transactions"
ON public.loyalty_transactions
FOR SELECT
TO anon
USING (false);

-- 7. Deny anonymous access to order_items
CREATE POLICY "Deny anonymous access to order items"
ON public.order_items
FOR SELECT
TO anon
USING (false);

-- 8. Deny anonymous access to order_tracking
CREATE POLICY "Deny anonymous access to order tracking"
ON public.order_tracking
FOR SELECT
TO anon
USING (false);