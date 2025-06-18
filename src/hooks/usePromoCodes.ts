
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';

export type PromoCode = {
  id: string;
  user_id: string;
  code: string;
  discount_percent: number | null;
  discount_amount: number | null;
  description: string | null;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
};

export function usePromoCodes() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPromoCodes = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_promo_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromoCodes(data || []);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des codes promo:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer vos codes promo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPromoCode = async (codeData: { code: string }) => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      // Simuler la validation d'un code promo - en réalité cela devrait appeler une API
      const { error } = await supabase
        .from('user_promo_codes')
        .insert([{
          user_id: user.id,
          code: codeData.code,
          description: `Code promo ${codeData.code}`,
          discount_percent: 10, // Exemple
          is_active: true
        }]);

      if (error) throw error;

      toast({
        title: "Code ajouté",
        description: "Votre code promo a été ajouté avec succès",
      });

      await fetchPromoCodes();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout du code promo:', error);
      toast({
        title: "Erreur",
        description: "Code promo invalide ou déjà utilisé",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, [user?.id]);

  return {
    promoCodes,
    loading,
    addPromoCode,
    refreshPromoCodes: fetchPromoCodes,
  };
}
