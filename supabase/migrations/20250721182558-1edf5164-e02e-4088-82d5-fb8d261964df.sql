-- ÉTAPE 1 : SÉCURISATION DES FONCTIONS DATABASE
-- Correction de toutes les fonctions avec SET search_path = ''

-- 1. Fonction award_loyalty_points avec sécurisation
CREATE OR REPLACE FUNCTION public.award_loyalty_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Award 1 point per euro spent (rounded down)
  INSERT INTO public.loyalty_points (
    user_id,
    points,
    earned_from,
    reference_id,
    description
  ) VALUES (
    NEW.user_id,
    FLOOR(NEW.total_amount)::INTEGER,
    'purchase',
    NEW.id,
    'Points earned from order #' || NEW.order_number
  );
  
  RETURN NEW;
END;
$$;

-- 2. Fonction calculate_commission avec sécurisation
CREATE OR REPLACE FUNCTION public.calculate_commission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  seller_uuid UUID;
  commission_rate_value DECIMAL(5,4) := 0.12; -- 12% default
BEGIN
  -- Get seller_id from the product
  SELECT seller_id INTO seller_uuid 
  FROM public.products 
  WHERE id = NEW.product_id;
  
  -- Insert commission record
  INSERT INTO public.commissions (
    seller_id,
    order_id,
    order_item_id,
    commission_rate,
    base_amount,
    commission_amount,
    status
  ) VALUES (
    seller_uuid,
    NEW.order_id,
    NEW.id,
    commission_rate_value,
    NEW.total_price,
    NEW.total_price * commission_rate_value,
    'pending'
  );
  
  RETURN NEW;
END;
$$;

-- 3. Fonction is_admin avec sécurisation
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$;

-- 4. Fonction handle_new_user avec sécurisation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$;

-- 5. Fonction validate_order_data avec sécurisation
CREATE OR REPLACE FUNCTION public.validate_order_data(order_data JSONB)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  total_amount NUMERIC;
  delivery_fee NUMERIC;
BEGIN
  -- Extract values from order data
  total_amount := (order_data->>'total_amount')::NUMERIC;
  delivery_fee := COALESCE((order_data->>'delivery_fee')::NUMERIC, 0);
  
  -- Basic validation
  IF total_amount <= 0 THEN
    RAISE EXCEPTION 'Total amount must be positive';
  END IF;
  
  IF delivery_fee < 0 THEN
    RAISE EXCEPTION 'Delivery fee cannot be negative';
  END IF;
  
  RETURN TRUE;
END;
$$;

-- 6. Fonction get_seller_commission_summary avec sécurisation
CREATE OR REPLACE FUNCTION public.get_seller_commission_summary(seller_uuid UUID)
RETURNS TABLE(
  total_pending NUMERIC, 
  total_approved NUMERIC, 
  total_paid NUMERIC, 
  total_earnings NUMERIC, 
  commission_count INTEGER, 
  last_payment_date TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(CASE WHEN c.status = 'pending' THEN c.commission_amount END), 0) as total_pending,
    COALESCE(SUM(CASE WHEN c.status = 'approved' THEN c.commission_amount END), 0) as total_approved,
    COALESCE(SUM(CASE WHEN c.status = 'paid' THEN c.commission_amount END), 0) as total_paid,
    COALESCE(SUM(c.commission_amount), 0) as total_earnings,
    COUNT(*)::INTEGER as commission_count,
    MAX(cp.payment_date) as last_payment_date
  FROM public.commissions c
  LEFT JOIN public.commission_payments cp ON cp.seller_id = c.seller_id
  WHERE c.seller_id = seller_uuid;
END;
$$;

-- 7. Fonction create_default_notification_preferences avec sécurisation
CREATE OR REPLACE FUNCTION public.create_default_notification_preferences()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- 8. Fonction ensure_single_default_payment_method avec sécurisation
CREATE OR REPLACE FUNCTION public.ensure_single_default_payment_method()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE public.payment_methods 
    SET is_default = false 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

-- 9. Fonction generate_order_number avec sécurisation
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.order_number := 'MT' || to_char(NOW(), 'YYYY') || '-' || 
                        lpad(nextval('order_number_seq')::text, 3, '0');
  RETURN NEW;
END;
$$;

-- 10. Fonction get_user_loyalty_balance avec sécurisation
CREATE OR REPLACE FUNCTION public.get_user_loyalty_balance(user_uuid UUID)
RETURNS TABLE(
  total_points INTEGER, 
  points_expiring_soon INTEGER, 
  points_earned_this_month INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(lp.points), 0)::INTEGER as total_points,
    COALESCE(SUM(CASE WHEN lp.expires_at <= NOW() + INTERVAL '30 days' THEN lp.points END), 0)::INTEGER as points_expiring_soon,
    COALESCE(SUM(CASE WHEN lp.created_at >= date_trunc('month', NOW()) THEN lp.points END), 0)::INTEGER as points_earned_this_month
  FROM public.loyalty_points lp
  WHERE lp.user_id = user_uuid
    AND (lp.expires_at IS NULL OR lp.expires_at > NOW());
END;
$$;

-- 11. Fonction search_products avec sécurisation
CREATE OR REPLACE FUNCTION public.search_products(
  search_term TEXT DEFAULT '',
  category_filter UUID DEFAULT NULL,
  min_price NUMERIC DEFAULT NULL,
  max_price NUMERIC DEFAULT NULL,
  sort_by TEXT DEFAULT 'created_at',
  sort_order TEXT DEFAULT 'DESC',
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  price NUMERIC,
  original_price NUMERIC,
  images JSONB,
  category_id UUID,
  seller_id UUID,
  status TEXT,
  stock INTEGER,
  is_featured BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.original_price,
    p.images,
    p.category_id,
    p.seller_id,
    p.status,
    p.stock,
    p.is_featured,
    p.created_at,
    p.updated_at
  FROM public.products p
  WHERE 
    (p.status = 'published') -- Only show published products
    AND (
      search_term = '' 
      OR to_tsvector('french', p.name || ' ' || COALESCE(p.description, '')) @@ plainto_tsquery('french', search_term)
    )
    AND (category_filter IS NULL OR p.category_id = category_filter)
    AND (min_price IS NULL OR p.price >= min_price)
    AND (max_price IS NULL OR p.price <= max_price)
  ORDER BY
    CASE 
      WHEN sort_by = 'price' AND sort_order = 'ASC' THEN p.price
      WHEN sort_by = 'price' AND sort_order = 'DESC' THEN -p.price
      WHEN sort_by = 'name' AND sort_order = 'ASC' THEN NULL
      WHEN sort_by = 'name' AND sort_order = 'DESC' THEN NULL
      WHEN sort_by = 'created_at' AND sort_order = 'ASC' THEN NULL
      ELSE NULL
    END ASC NULLS LAST,
    CASE 
      WHEN sort_by = 'name' AND sort_order = 'ASC' THEN p.name
      WHEN sort_by = 'name' AND sort_order = 'DESC' THEN p.name
      ELSE NULL
    END ASC,
    CASE 
      WHEN sort_by = 'created_at' AND sort_order = 'ASC' THEN p.created_at
      WHEN sort_by = 'created_at' AND sort_order = 'DESC' THEN p.created_at
      ELSE p.created_at
    END DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;