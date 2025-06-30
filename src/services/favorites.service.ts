
import { supabase } from '@/integrations/supabase/client';

export interface FavoriteItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    images: string[];
    status: string;
  };
}

export class FavoritesService {
  
  static async getUserFavorites(userId: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          products (
            id,
            name,
            price,
            images,
            status
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { favorites: data, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async addToFavorites(userId: string, productId: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          product_id: productId
        })
        .select()
        .single();

      if (error) throw error;
      return { favorite: data, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async removeFromFavorites(userId: string, productId: string) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async isFavorite(userId: string, productId: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { isFavorite: !!data, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }
}
