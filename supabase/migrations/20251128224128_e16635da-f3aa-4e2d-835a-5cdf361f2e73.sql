-- Add explicit policies to deny anonymous access to sensitive tables
-- This ensures that even if RLS is misconfigured, anonymous users cannot access data

-- Deny anonymous access to profiles table (contains emails and phone numbers)
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Deny anonymous access to orders table (contains shipping addresses and purchase history)
CREATE POLICY "Deny anonymous access to orders"
ON public.orders
FOR SELECT
TO anon
USING (false);

-- Create order access tokens table for secure order tracking without login
CREATE TABLE IF NOT EXISTS public.order_access_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on order_access_tokens
ALTER TABLE public.order_access_tokens ENABLE ROW LEVEL SECURITY;

-- Allow anyone to use a valid token to view order details
CREATE POLICY "Anyone can use valid tokens"
ON public.order_access_tokens
FOR SELECT
USING (expires_at > now());

-- Create index for fast token lookup
CREATE INDEX idx_order_access_tokens_token ON public.order_access_tokens(token);
CREATE INDEX idx_order_access_tokens_expires_at ON public.order_access_tokens(expires_at);