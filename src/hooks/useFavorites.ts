
import { useState, useEffect } from 'react';
import { FavoritesService, FavoriteItem } from '@/services/favorites.service';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await FavoritesService.getUserFavorites(user.id);
      if (result.success && result.favorites) {
        setFavorites(result.favorites);
      } else {
        console.error('Error fetching favorites:', result.error);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter aux favoris",
        variant: "destructive"
      });
      return;
    }

    const result = await FavoritesService.addToFavorites(user.id, productId);
    if (result.success) {
      toast({
        title: "Ajouté aux favoris",
        description: "Le produit a été ajouté à vos favoris",
      });
      await fetchFavorites();
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Erreur lors de l'ajout aux favoris",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return;

    const result = await FavoritesService.removeFromFavorites(user.id, productId);
    if (result.success) {
      toast({
        title: "Retiré des favoris",
        description: "Le produit a été retiré de vos favoris",
      });
      await fetchFavorites();
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.product_id === productId);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refetch: fetchFavorites
  };
};
