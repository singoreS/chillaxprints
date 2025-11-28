-- Remove the insecure policy that exposes tokens
DROP POLICY IF EXISTS "Anyone can use valid tokens" ON public.order_access_tokens;

-- Create a secure function to validate tokens and return order data
CREATE OR REPLACE FUNCTION public.validate_order_token(_token TEXT)
RETURNS TABLE (
  order_id UUID,
  order_number TEXT,
  user_id UUID,
  total_amount NUMERIC,
  currency TEXT,
  status TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if token exists and is valid
  IF NOT EXISTS (
    SELECT 1 
    FROM order_access_tokens 
    WHERE token = _token 
      AND expires_at > NOW()
  ) THEN
    RAISE EXCEPTION 'Invalid or expired token';
  END IF;

  -- Return order data without exposing the token
  RETURN QUERY
  SELECT 
    o.id,
    o.order_number,
    o.user_id,
    o.total_amount,
    o.currency,
    o.status,
    o.shipping_address,
    o.created_at
  FROM orders o
  INNER JOIN order_access_tokens t ON t.order_id = o.id
  WHERE t.token = _token
    AND t.expires_at > NOW();
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.validate_order_token(TEXT) TO authenticated, anon;