
-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Create policy to allow public read access to product images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Create policy to allow users to update their own product images
CREATE POLICY "Users can update their product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow users to delete their own product images
CREATE POLICY "Users can delete their product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Enable full-text search on products table
CREATE INDEX IF NOT EXISTS products_search_idx ON products 
USING GIN(to_tsvector('french', name || ' ' || COALESCE(description, '')));

-- Create function for advanced product search
CREATE OR REPLACE FUNCTION search_products(
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
) AS $$
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
  FROM products p
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
$$ LANGUAGE plpgsql SECURITY DEFINER;
