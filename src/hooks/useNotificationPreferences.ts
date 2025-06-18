
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';

export type NotificationPreferences = {
  id: string;
  user_id: string;
  email_orders: boolean;
  email_marketing: boolean;
  sms_orders: boolean;
  sms_delivery: boolean;
  sms_promotions: boolean;
  app_orders: boolean;
  app_promotions: boolean;
  app_stock: boolean;
  app_new_products: boolean;
  created_at: string;
  updated_at: string;
};

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPreferences = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setPreferences(data);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des préférences:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer vos préférences de notification",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<NotificationPreferences>) => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('notification_preferences')
        .upsert([{ ...updates, user_id: user.id }]);

      if (error) throw error;

      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de notification ont été sauvegardées",
      });

      await fetchPreferences();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour des préférences:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour vos préférences",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [user?.id]);

  return {
    preferences,
    loading,
    updatePreferences,
    refreshPreferences: fetchPreferences,
  };
}
