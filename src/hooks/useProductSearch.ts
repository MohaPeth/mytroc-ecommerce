
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SearchFilters {
  searchTerm: string;
  categoryFilter: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
  sortOrder: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  images: any;
  category_id: string | null;
  seller_id: string;
  status: string;
  stock: number | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}

interface SearchResult {
  products: Product[];
  total: number;
  hasMore: boolean;
}

export const useProductSearch = () => {
  const [results, setResults] = useState<SearchResult>({ products: [], total: 0, hasMore: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchProducts = async (
    filters: SearchFilters,
    page: number = 1,
    limit: number = 20,
    append: boolean = false
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      
      const { data, error: searchError } = await supabase
        .rpc('search_products', {
          search_term: filters.searchTerm || '',
          category_filter: filters.categoryFilter || null,
          min_price: filters.minPrice,
          max_price: filters.maxPrice,
          sort_by: filters.sortBy || 'created_at',
          sort_order: filters.sortOrder || 'DESC',
          limit_count: limit,
          offset_count: offset
        });

      if (searchError) throw searchError;

      const products = data || [];
      const hasMore = products.length === limit;

      setResults(prev => ({
        products: append ? [...prev.products, ...products] : products,
        total: append ? prev.total : products.length,
        hasMore
      }));

    } catch (err) {
      console.error('Erreur de recherche:', err);
      setError('Erreur lors de la recherche des produits');
      toast({
        title: "Erreur de recherche",
        description: "Impossible de charger les produits. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async (filters: SearchFilters, currentPage: number) => {
    await searchProducts(filters, currentPage + 1, 20, true);
  };

  const resetSearch = () => {
    setResults({ products: [], total: 0, hasMore: false });
    setError(null);
  };

  return {
    results,
    isLoading,
    error,
    searchProducts,
    loadMore,
    resetSearch
  };
};
