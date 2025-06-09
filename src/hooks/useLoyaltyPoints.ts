
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyBalance {
  total_points: number;
  points_expiring_soon: number;
  points_earned_this_month: number;
}

interface LoyaltyPoint {
  id: string;
  points: number;
  earned_from: string;
  description: string;
  created_at: string;
  expires_at: string | null;
}

export const useLoyaltyPoints = () => {
  const [balance, setBalance] = useState<LoyaltyBalance | null>(null);
  const [history, setHistory] = useState<LoyaltyPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_user_loyalty_balance', { user_uuid: user.id });

      if (error) throw error;
      setBalance(data?.[0] || null);
    } catch (error) {
      console.error('Erreur lors du chargement du solde de points:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre solde de points",
        variant: "destructive"
      });
    }
  };

  const fetchHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique des points:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des points",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchBalance(), fetchHistory()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    balance,
    history,
    isLoading,
    refetch: () => {
      fetchBalance();
      fetchHistory();
    }
  };
};
