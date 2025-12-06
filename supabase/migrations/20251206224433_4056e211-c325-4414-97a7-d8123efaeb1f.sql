-- Create loyalty points table
CREATE TABLE public.loyalty_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points_balance integer NOT NULL DEFAULT 0,
  total_earned integer NOT NULL DEFAULT 0,
  total_spent integer NOT NULL DEFAULT 0,
  tier text NOT NULL DEFAULT 'bronze',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id),
  CONSTRAINT positive_balance CHECK (points_balance >= 0),
  CONSTRAINT valid_tier CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum'))
);

-- Create loyalty transactions table for history
CREATE TABLE public.loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points integer NOT NULL,
  transaction_type text NOT NULL,
  description text NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT valid_transaction_type CHECK (transaction_type IN ('earn', 'spend', 'bonus', 'expire', 'adjustment'))
);

-- Enable RLS
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loyalty_points
CREATE POLICY "Users can view own loyalty points"
ON public.loyalty_points
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own loyalty points"
ON public.loyalty_points
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own loyalty points"
ON public.loyalty_points
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for loyalty_transactions
CREATE POLICY "Users can view own transactions"
ON public.loyalty_transactions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
ON public.loyalty_transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Function to calculate tier based on total earned
CREATE OR REPLACE FUNCTION public.calculate_loyalty_tier(total_points integer)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF total_points >= 5000 THEN
    RETURN 'platinum';
  ELSIF total_points >= 2000 THEN
    RETURN 'gold';
  ELSIF total_points >= 500 THEN
    RETURN 'silver';
  ELSE
    RETURN 'bronze';
  END IF;
END;
$$;

-- Function to add points and update tier
CREATE OR REPLACE FUNCTION public.add_loyalty_points(
  _user_id uuid,
  _points integer,
  _type text,
  _description text,
  _order_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_balance integer;
  new_total_earned integer;
  new_tier text;
BEGIN
  -- Insert or update loyalty points
  INSERT INTO public.loyalty_points (user_id, points_balance, total_earned)
  VALUES (_user_id, _points, _points)
  ON CONFLICT (user_id) DO UPDATE SET
    points_balance = loyalty_points.points_balance + _points,
    total_earned = loyalty_points.total_earned + _points,
    updated_at = now();

  -- Get new totals
  SELECT points_balance, total_earned INTO new_balance, new_total_earned
  FROM public.loyalty_points WHERE user_id = _user_id;

  -- Update tier
  new_tier := public.calculate_loyalty_tier(new_total_earned);
  UPDATE public.loyalty_points SET tier = new_tier WHERE user_id = _user_id;

  -- Record transaction
  INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, description, order_id)
  VALUES (_user_id, _points, _type, _description, _order_id);
END;
$$;

-- Function to spend points
CREATE OR REPLACE FUNCTION public.spend_loyalty_points(
  _user_id uuid,
  _points integer,
  _description text,
  _order_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_balance integer;
BEGIN
  -- Check current balance
  SELECT points_balance INTO current_balance
  FROM public.loyalty_points WHERE user_id = _user_id;

  IF current_balance IS NULL OR current_balance < _points THEN
    RETURN false;
  END IF;

  -- Deduct points
  UPDATE public.loyalty_points SET
    points_balance = points_balance - _points,
    total_spent = total_spent + _points,
    updated_at = now()
  WHERE user_id = _user_id;

  -- Record transaction
  INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, description, order_id)
  VALUES (_user_id, -_points, 'spend', _description, _order_id);

  RETURN true;
END;
$$;

-- Trigger to update updated_at
CREATE TRIGGER update_loyalty_points_updated_at
BEFORE UPDATE ON public.loyalty_points
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Create index for faster lookups
CREATE INDEX idx_loyalty_transactions_user_id ON public.loyalty_transactions(user_id);
CREATE INDEX idx_loyalty_transactions_created_at ON public.loyalty_transactions(created_at DESC);