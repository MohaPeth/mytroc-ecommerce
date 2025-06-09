
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Favorite {
  id: string;
  product_id: string;
  created_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    images: any;
  };
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            price,
            images
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setFavorites(data || []);
      setFavoriteIds(new Set(data?.map(fav => fav.product_id) || []));
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos favoris",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, product_id: productId });

      if (error) throw error;

      setFavoriteIds(prev => new Set([...prev, productId]));
      toast({
        title: "Ajouté aux favoris",
        description: "Le produit a été ajouté à vos favoris"
      });
      
      fetchFavorites(); // Refresh the list
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit aux favoris",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });

      toast({
        title: "Retiré des favoris",
        description: "Le produit a été retiré de vos favoris"
      });
      
      fetchFavorites(); // Refresh the list
    } catch (error) {
      console.error('Erreur lors de la suppression des favoris:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit des favoris",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (productId: string) => {
    return favoriteIds.has(productId);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refetch: fetchFavorites
  };
};
