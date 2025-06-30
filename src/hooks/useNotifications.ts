
import { useState, useEffect } from 'react';
import { NotificationService } from '@/services/notification.service';
import { useAuth } from './useAuth';

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  action_url?: string;
  created_at: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await NotificationService.getUserNotifications(user.id);
      if (result.success && result.notifications) {
        // Cast the notifications to the correct type
        const typedNotifications = result.notifications.map(n => ({
          ...n,
          type: n.type as 'info' | 'success' | 'warning' | 'error'
        }));
        setNotifications(typedNotifications);
        setUnreadCount(typedNotifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    const result = await NotificationService.markAsRead(notificationId);
    if (result.success) {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    
    const result = await NotificationService.markAllAsRead(user.id);
    if (result.success) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    const result = await NotificationService.deleteNotification(notificationId);
    if (result.success) {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      // Recalculate unread count
      setUnreadCount(prev => {
        const deletedNotification = notifications.find(n => n.id === notificationId);
        return deletedNotification && !deletedNotification.read ? prev - 1 : prev;
      });
    }
  };

  const deleteAllNotifications = async () => {
    if (!user) return;

    // Delete all notifications for the user
    const deletePromises = notifications.map(n => 
      NotificationService.deleteNotification(n.id)
    );
    
    try {
      await Promise.all(deletePromises);
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  const addNotification = async (notification: {
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    action_url?: string;
  }) => {
    if (!user) return;

    const result = await NotificationService.createNotification({
      user_id: user.id,
      title: notification.title,
      message: notification.message,
      type: notification.type || 'info',
      action_url: notification.action_url
    });

    if (result.success) {
      await fetchNotifications(); // Refresh notifications
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    addNotification,
    refetch: fetchNotifications
  };
};
