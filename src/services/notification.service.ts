
import { supabase } from '@/integrations/supabase/client';

export interface NotificationData {
  user_id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  action_url?: string;
}

export class NotificationService {
  
  static async createNotification(data: NotificationData) {
    try {
      const { data: notification, error } = await supabase
        .from('notifications')
        .insert({
          user_id: data.user_id,
          title: data.title,
          message: data.message,
          type: data.type || 'info',
          action_url: data.action_url,
          read: false
        })
        .select()
        .single();

      if (error) throw error;
      return { notification, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async getUserNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { notifications: data, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async markAllAsRead(userId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  // Méthodes utilitaires pour créer des notifications spécifiques
  static async notifyOrderStatusChange(userId: string, orderNumber: string, status: string) {
    const statusMessages = {
      'confirmed': 'Votre commande a été confirmée',
      'processing': 'Votre commande est en cours de préparation',
      'shipped': 'Votre commande a été expédiée',
      'delivered': 'Votre commande a été livrée'
    };

    return this.createNotification({
      user_id: userId,
      title: 'Mise à jour de commande',
      message: `${statusMessages[status as keyof typeof statusMessages] || 'Statut de commande mis à jour'} - Commande #${orderNumber}`,
      type: 'info',
      action_url: `/profile?tab=orders`
    });
  }

  static async notifyPromotion(userId: string, title: string, message: string) {
    return this.createNotification({
      user_id: userId,
      title,
      message,
      type: 'success',
      action_url: '/boutique'
    });
  }
}
