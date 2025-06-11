
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, ShoppingCart, Percent, Settings } from 'lucide-react';

const NotificationToast = () => {
  const { toast } = useToast();
  const { notifications } = useNotifications();

  useEffect(() => {
    // Écouter les nouvelles notifications et afficher un toast
    const lastNotification = notifications[0];
    
    if (lastNotification && !lastNotification.read) {
      const getIcon = (type: string) => {
        switch (type) {
          case 'order':
            return '🛍️';
          case 'promo':
            return '🎉';
          case 'system':
            return '⚙️';
          default:
            return '🔔';
        }
      };

      toast({
        title: `${getIcon(lastNotification.type)} ${lastNotification.title}`,
        description: lastNotification.message,
      });
    }
  }, [notifications, toast]);

  return null; // Ce composant n'affiche rien directement
};

export default NotificationToast;
