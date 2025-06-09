
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string;
  price: number;
  total_tickets: number;
  available_tickets: number;
  organizer_id: string;
  status: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      await fetchEvents(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur lors de la création' };
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    createEvent
  };
};

export const useUserEvents = (userId: string | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserEvents = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, [userId]);

  return {
    events,
    loading,
    error,
    refetch: fetchUserEvents
  };
};
