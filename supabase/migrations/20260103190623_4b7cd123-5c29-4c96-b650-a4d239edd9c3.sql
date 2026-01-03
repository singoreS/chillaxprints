-- Create table for customer reviews
CREATE TABLE public.customer_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  product_id TEXT, -- Shopify product ID (optional, for product-specific reviews)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false, -- Admin approval before display
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for UGC photos
CREATE TABLE public.customer_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  review_id UUID REFERENCES public.customer_reviews(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_instagram TEXT, -- Instagram handle for attribution
  photo_url TEXT NOT NULL,
  caption TEXT,
  is_approved BOOLEAN DEFAULT false, -- Admin approval before display
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_photos ENABLE ROW LEVEL SECURITY;

-- Policies for customer_reviews
-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.customer_reviews
FOR SELECT
USING (is_approved = true);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
ON public.customer_reviews
FOR INSERT
WITH CHECK (true); -- Allow anyone to submit (will be moderated)

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
ON public.customer_reviews
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
ON public.customer_reviews
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Policies for customer_photos
-- Anyone can view approved photos
CREATE POLICY "Anyone can view approved photos"
ON public.customer_photos
FOR SELECT
USING (is_approved = true);

-- Anyone can submit photos
CREATE POLICY "Anyone can submit photos"
ON public.customer_photos
FOR INSERT
WITH CHECK (true);

-- Admins can manage all photos
CREATE POLICY "Admins can manage all photos"
ON public.customer_photos
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for customer photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'customer-photos',
  'customer-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for customer-photos bucket
CREATE POLICY "Anyone can view customer photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'customer-photos');

CREATE POLICY "Authenticated users can upload customer photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'customer-photos');

-- Trigger for updated_at
CREATE TRIGGER update_customer_reviews_updated_at
BEFORE UPDATE ON public.customer_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();