
import { useState, useEffect } from 'react';
import { NotificationType } from '@/components/notifications/NotificationItem';

// Mock notification data - dans une application réelle, cela viendrait d'une API
const initialNotifications: NotificationType[] = [
  {
    id: '1',
    type: 'order',
    title: 'Commande confirmée',
    message: 'Votre commande #102358 a été confirmée et est en cours de préparation.',
    date: 'Il y a 2 heures',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    title: 'Commande livrée',
    message: 'Votre commande #102315 a été livrée avec succès. Merci pour votre achat !',
    date: 'Il y a 2 jours',
    read: false,
  },
  {
    id: '3',
    type: 'promo',
    title: '10% de réduction sur les fruits',
    message: 'Profitez de 10% de réduction sur tous les fruits de saison jusqu\'à ce week-end.',
    date: 'Il y a 3 jours',
    read: true,
  },
  {
    id: '4',
    type: 'promo',
    title: 'Nouvelle sélection de fromages',
    message: 'Découvrez notre nouvelle sélection de fromages artisanaux de la région.',
    date: 'Il y a 1 semaine',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Mise à jour des conditions générales',
    message: 'Nous avons mis à jour nos conditions générales de vente et d\'utilisation.',
    date: 'Il y a 2 semaines',
    read: false,
  },
];

export const useNotifications = () => {
  // On utilise localStorage pour persister l'état entre les sessions
  const [notifications, setNotifications] = useState<NotificationType[]>(() => {
    const storedNotifications = localStorage.getItem('mytroc-notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : initialNotifications;
  });

  // Calcul du nombre de notifications non lues
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Persister les notifications dans localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem('mytroc-notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Marquer une notification comme lue
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Supprimer une notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Supprimer toutes les notifications
  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  // Ajouter une nouvelle notification (utile pour les futures fonctionnalités)
  const addNotification = (notification: Omit<NotificationType, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(), // ID simple basé sur le timestamp
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,
    markAllAsRead,
    deleteAllNotifications,
    addNotification,
  };
};
