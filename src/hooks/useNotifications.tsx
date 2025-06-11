
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface NotificationType {
  id: string;
  type: 'order' | 'promo' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action_url?: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les notifications depuis Supabase
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erreur lors du chargement des notifications:', error);
          setNotifications([]);
        } else {
          const formattedNotifications = data.map(notification => ({
            id: notification.id,
            type: notification.type as 'order' | 'promo' | 'system',
            title: notification.title,
            message: notification.message,
            date: formatNotificationDate(notification.created_at),
            read: notification.read,
            action_url: notification.action_url
          }));
          setNotifications(formattedNotifications);
        }
      } catch (error) {
        console.error('Erreur inattendue:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  // Écouter les nouvelles notifications en temps réel
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification = {
            id: payload.new.id,
            type: payload.new.type as 'order' | 'promo' | 'system',
            title: payload.new.title,
            message: payload.new.message,
            date: formatNotificationDate(payload.new.created_at),
            read: payload.new.read,
            action_url: payload.new.action_url
          };
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const updatedNotification = {
            id: payload.new.id,
            type: payload.new.type as 'order' | 'promo' | 'system',
            title: payload.new.title,
            message: payload.new.message,
            date: formatNotificationDate(payload.new.created_at),
            read: payload.new.read,
            action_url: payload.new.action_url
          };
          setNotifications(prev => 
            prev.map(notif => 
              notif.id === updatedNotification.id ? updatedNotification : notif
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur lors de la mise à jour:', error);
      } else {
        setNotifications(notifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        ));
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur lors de la suppression:', error);
      } else {
        setNotifications(notifications.filter(notification => notification.id !== id));
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) {
        console.error('Erreur lors de la mise à jour:', error);
      } else {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
    }
  };

  const deleteAllNotifications = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur lors de la suppression:', error);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
    }
  };

  const addNotification = async (notification: Omit<NotificationType, 'id' | 'date' | 'read'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .insert([{
          user_id: user.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          action_url: notification.action_url,
          read: false
        }]);

      if (error) {
        console.error('Erreur lors de l\'ajout:', error);
      }
      // La notification sera automatiquement ajoutée via le listener temps réel
    } catch (error) {
      console.error('Erreur inattendue:', error);
    }
  };

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    deleteNotification,
    markAllAsRead,
    deleteAllNotifications,
    addNotification,
  };
};

// Fonction utilitaire pour formater les dates
function formatNotificationDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Il y a moins d\'une heure';
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInHours < 168) {
    const days = Math.floor(diffInHours / 24);
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else {
    const weeks = Math.floor(diffInHours / 168);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }
}
