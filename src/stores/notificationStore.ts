
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  userId?: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
  loadNotifications: (notifications: NotificationItem[]) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      
      addNotification: (notification) => {
        const newNotification: NotificationItem = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        };
        
        set((state) => {
          const newNotifications = [newNotification, ...state.notifications];
          return {
            notifications: newNotifications,
            unreadCount: newNotifications.filter(n => !n.read).length,
          };
        });
      },
      
      markAsRead: (id) => {
        set((state) => {
          const updatedNotifications = state.notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
          );
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.read).length,
          };
        });
      },
      
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(notif => ({ ...notif, read: true })),
          unreadCount: 0,
        }));
      },
      
      deleteNotification: (id) => {
        set((state) => {
          const filteredNotifications = state.notifications.filter(notif => notif.id !== id);
          return {
            notifications: filteredNotifications,
            unreadCount: filteredNotifications.filter(n => !n.read).length,
          };
        });
      },
      
      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },
      
      loadNotifications: (notifications) => {
        set({
          notifications,
          unreadCount: notifications.filter(n => !n.read).length,
        });
      },
    }),
    {
      name: 'mytroc-notifications',
      partialize: (state) => ({ notifications: state.notifications }),
    }
  )
);
