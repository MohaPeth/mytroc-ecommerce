
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Ticket {
  id: string;
  event_id: string;
  user_id: string;
  price: number;
  purchase_date: string;
  ticket_number: string;
  status: string;
  qr_code: string | null;
  event?: {
    title: string;
    event_date: string;
    location: string;
  };
}

export const useUserTickets = (userId: string | null) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserTickets = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          event:events(title, event_date, location)
        `)
        .eq('user_id', userId)
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des billets');
    } finally {
      setLoading(false);
    }
  };

  const purchaseTicket = async (eventId: string, price: number) => {
    if (!userId) return { data: null, error: 'Utilisateur non connecté' };
    
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([{
          event_id: eventId,
          user_id: userId,
          price: price,
          status: 'valid'
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchUserTickets(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur lors de l\'achat' };
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, [userId]);

  return {
    tickets,
    loading,
    error,
    refetch: fetchUserTickets,
    purchaseTicket
  };
};

export const useEventTickets = (eventId: string | null, organizerId: string | null) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventTickets = async () => {
    if (!eventId || !organizerId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('event_id', eventId)
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des billets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventTickets();
  }, [eventId, organizerId]);

  return {
    tickets,
    loading,
    error,
    refetch: fetchEventTickets
  };
};
