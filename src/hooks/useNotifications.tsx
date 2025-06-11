
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

  // Écouter les nouvelles notifications en temps réel avec gestion optimisée
  useEffect(() => {
    if (!user) return;

    console.log('Mise en place des listeners temps réel pour l\'utilisateur:', user.id);

    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Nouvelle notification reçue:', payload.new);
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
          console.log('Notification mise à jour:', payload.new);
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
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Notification supprimée:', payload.old);
          setNotifications(prev => 
            prev.filter(notif => notif.id !== payload.old.id)
          );
        }
      )
      .subscribe((status) => {
        console.log('Statut de la souscription temps réel:', status);
      });

    return () => {
      console.log('Nettoyage du canal temps réel');
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
      }
      // La mise à jour sera automatiquement reflétée via le listener temps réel
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
      }
      // La suppression sera automatiquement reflétée via le listener temps réel
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
      }
      // Les mises à jour seront automatiquement reflétées via le listener temps réel
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
      }
      // Les suppressions seront automatiquement reflétées via le listener temps réel
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

// Fonction utilitaire pour formater les dates avec plus de détails
function formatNotificationDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMinutes < 1) {
    return 'À l\'instant';
  } else if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  } else {
    const weeks = Math.floor(diffInDays / 7);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }
}
