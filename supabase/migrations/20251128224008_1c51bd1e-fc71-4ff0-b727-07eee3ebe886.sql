-- Fix critical security vulnerabilities by removing public access policies
-- These policies expose customer personal information to anyone

-- Remove public access to orders table
DROP POLICY IF EXISTS "Anyone can view orders by order number" ON public.orders;

-- Remove public access to order_items table
DROP POLICY IF EXISTS "Anyone can view order items by order" ON public.order_items;

-- Remove public access to order_tracking table
DROP POLICY IF EXISTS "Anyone can view order tracking" ON public.order_tracking;

-- Note: The safe policies remain intact:
-- - "Users can view own orders" on orders table
-- - "Users can view own order items" on order_items table
-- - "Users can view own order tracking" on order_tracking table
-- These ensure authenticated users can only access their own data