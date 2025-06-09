
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CommissionSummary {
  total_pending: number;
  total_approved: number;
  total_paid: number;
  total_earnings: number;
  commission_count: number;
  last_payment_date: string | null;
}

interface Commission {
  id: string;
  order_id: string;
  commission_rate: number;
  base_amount: number;
  commission_amount: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  payment_date: string | null;
  created_at: string;
}

export const useCommissions = () => {
  const [summary, setSummary] = useState<CommissionSummary | null>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCommissionSummary = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_seller_commission_summary', { seller_uuid: user.id });

      if (error) throw error;
      setSummary(data?.[0] || null);
    } catch (error) {
      console.error('Erreur lors du chargement du résumé des commissions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données des commissions",
        variant: "destructive"
      });
    }
  };

  const fetchCommissions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Type-safe mapping to ensure status is correctly typed
      const typedCommissions: Commission[] = (data || []).map(item => ({
        ...item,
        status: item.status as 'pending' | 'approved' | 'paid' | 'cancelled'
      }));
      
      setCommissions(typedCommissions);
    } catch (error) {
      console.error('Erreur lors du chargement des commissions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des commissions",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCommissionSummary(), fetchCommissions()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    summary,
    commissions,
    isLoading,
    refetch: () => {
      fetchCommissionSummary();
      fetchCommissions();
    }
  };
};
