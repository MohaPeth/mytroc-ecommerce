
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AnalyticsService } from '@/services/analytics.service';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  created_at: string;
  images: string[];
  original_price: number;
  stock: number;
  status: string;
  seller_id: string;
  is_featured: boolean;
  updated_at: string;
}

interface SearchParams {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  offset?: number;
}

export const useProductSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Recherche avec paramètres:', params);

      const { data, error } = await supabase.rpc('search_products', {
        search_term: params.query || '',
        category_filter: params.categoryId || null,
        min_price: params.minPrice || null,
        max_price: params.maxPrice || null,
        sort_by: params.sortBy || 'created_at',
        sort_order: params.sortOrder || 'DESC',
        limit_count: params.limit || 20,
        offset_count: params.offset || 0,
      });

      if (error) {
        console.error('Erreur de recherche:', error);
        throw error;
      }

      // Track search event
      if (params.query) {
        AnalyticsService.trackSearch(params.query, data?.length || 0);
      }

      const transformedProducts = (data || []).map((item: any) => ({
        ...item,
        images: Array.isArray(item.images) ? item.images : (item.images ? [item.images] : [])
      }));

      setProducts(transformedProducts);
      setTotal(data?.length || 0);
      
      console.log('Résultats de recherche:', transformedProducts);
    } catch (err: any) {
      console.error('Erreur lors de la recherche:', err);
      setError(err.message || 'Erreur lors de la recherche');
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setProducts([]);
    setTotal(0);
    setError(null);
  }, []);

  return {
    products,
    loading,
    error,
    total,
    search,
    reset,
    hasMore: products.length < total,
  };
};
