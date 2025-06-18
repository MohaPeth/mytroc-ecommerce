
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';

export type PaymentMethod = {
  id: string;
  user_id: string;
  type: 'card' | 'mobile_money' | 'cash_on_delivery';
  name: string;
  details: Record<string, any>;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPaymentMethods = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des méthodes de paiement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer vos méthodes de paiement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('payment_methods')
        .insert([{ ...method, user_id: user.id }]);

      if (error) throw error;

      toast({
        title: "Méthode ajoutée",
        description: "Votre méthode de paiement a été ajoutée avec succès",
      });

      await fetchPaymentMethods();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout de la méthode de paiement:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la méthode de paiement",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentMethod = async (id: string, updates: Partial<PaymentMethod>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Méthode mise à jour",
        description: "Votre méthode de paiement a été mise à jour",
      });

      await fetchPaymentMethods();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la méthode de paiement",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Méthode supprimée",
        description: "Votre méthode de paiement a été supprimée",
      });

      await fetchPaymentMethods();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la méthode de paiement",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, [user?.id]);

  return {
    paymentMethods,
    loading,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    refreshPaymentMethods: fetchPaymentMethods,
  };
}
