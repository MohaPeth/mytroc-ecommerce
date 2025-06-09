
-- Create commissions table to track earnings for sellers
CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  commission_rate DECIMAL(5,4) NOT NULL DEFAULT 0.12, -- 12% default commission
  base_amount NUMERIC NOT NULL, -- Product price
  commission_amount NUMERIC NOT NULL, -- Calculated commission
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
  payment_date TIMESTAMPTZ NULL,
  payment_reference TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(order_item_id) -- One commission per order item
);

-- Create commission payments table to track bulk payments to sellers
CREATE TABLE public.commission_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount NUMERIC NOT NULL,
  commission_count INTEGER NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
  payment_reference TEXT NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create loyalty points table
CREATE TABLE public.loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  earned_from TEXT, -- 'purchase', 'review', 'referral', etc.
  reference_id UUID, -- order_id, review_id, etc.
  description TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create analytics events table for tracking
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'page_view', 'product_view', 'add_to_cart', 'purchase', etc.
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  properties JSONB DEFAULT '{}',
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for commissions
CREATE POLICY "Sellers can view their own commissions" ON commissions
  FOR SELECT USING (seller_id = auth.uid());

CREATE POLICY "Service role can manage commissions" ON commissions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for commission payments
CREATE POLICY "Sellers can view their own payments" ON commission_payments
  FOR SELECT USING (seller_id = auth.uid());

CREATE POLICY "Service role can manage payments" ON commission_payments
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for favorites
CREATE POLICY "Users can manage their own favorites" ON favorites
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for loyalty points
CREATE POLICY "Users can view their own points" ON loyalty_points
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service role can manage loyalty points" ON loyalty_points
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policies for analytics (admin only)
CREATE POLICY "Only admins can view analytics" ON analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Service role can manage analytics" ON analytics_events
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to calculate commission automatically
CREATE OR REPLACE FUNCTION calculate_commission()
RETURNS TRIGGER AS $$
DECLARE
  seller_uuid UUID;
  commission_rate_value DECIMAL(5,4) := 0.12; -- 12% default
BEGIN
  -- Get seller_id from the product
  SELECT seller_id INTO seller_uuid 
  FROM products 
  WHERE id = NEW.product_id;
  
  -- Insert commission record
  INSERT INTO commissions (
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-calculate commissions when order items are created
CREATE TRIGGER trigger_calculate_commission
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION calculate_commission();

-- Function to award loyalty points
CREATE OR REPLACE FUNCTION award_loyalty_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Award 1 point per euro spent (rounded down)
  INSERT INTO loyalty_points (
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to award points when orders are completed
CREATE TRIGGER trigger_award_loyalty_points
  AFTER UPDATE ON orders
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION award_loyalty_points();

-- Function to get seller commission summary
CREATE OR REPLACE FUNCTION get_seller_commission_summary(seller_uuid UUID)
RETURNS TABLE (
  total_pending NUMERIC,
  total_approved NUMERIC,
  total_paid NUMERIC,
  total_earnings NUMERIC,
  commission_count INTEGER,
  last_payment_date TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(CASE WHEN c.status = 'pending' THEN c.commission_amount END), 0) as total_pending,
    COALESCE(SUM(CASE WHEN c.status = 'approved' THEN c.commission_amount END), 0) as total_approved,
    COALESCE(SUM(CASE WHEN c.status = 'paid' THEN c.commission_amount END), 0) as total_paid,
    COALESCE(SUM(c.commission_amount), 0) as total_earnings,
    COUNT(*)::INTEGER as commission_count,
    MAX(cp.payment_date) as last_payment_date
  FROM commissions c
  LEFT JOIN commission_payments cp ON cp.seller_id = c.seller_id
  WHERE c.seller_id = seller_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user loyalty points balance
CREATE OR REPLACE FUNCTION get_user_loyalty_balance(user_uuid UUID)
RETURNS TABLE (
  total_points INTEGER,
  points_expiring_soon INTEGER,
  points_earned_this_month INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(lp.points), 0)::INTEGER as total_points,
    COALESCE(SUM(CASE WHEN lp.expires_at <= NOW() + INTERVAL '30 days' THEN lp.points END), 0)::INTEGER as points_expiring_soon,
    COALESCE(SUM(CASE WHEN lp.created_at >= date_trunc('month', NOW()) THEN lp.points END), 0)::INTEGER as points_earned_this_month
  FROM loyalty_points lp
  WHERE lp.user_id = user_uuid
    AND (lp.expires_at IS NULL OR lp.expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX idx_commissions_seller_id ON commissions(seller_id);
CREATE INDEX idx_commissions_status ON commissions(status);
CREATE INDEX idx_commissions_created_at ON commissions(created_at);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_loyalty_points_user_id ON loyalty_points(user_id);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
