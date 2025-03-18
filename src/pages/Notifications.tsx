
import React, { useState } from 'react';
import { CheckCheck, Trash, ShoppingCart, Percent, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import AssistanceButton from '@/components/AssistanceButton';
import NotificationItem, { NotificationType } from '@/components/notifications/NotificationItem';

// Mock notification data
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

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Calculate unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été marquée comme lue avec succès.",
    });
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès.",
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Toutes les notifications marquées comme lues",
      description: "Toutes vos notifications ont été marquées comme lues.",
    });
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Toutes les notifications supprimées",
      description: "Toutes vos notifications ont été supprimées.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 hover:bg-red-600 text-white">
                  {unreadCount} non {unreadCount > 1 ? 'lues' : 'lue'}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="space-x-1"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="h-4 w-4" />
                <span>Tout marquer comme lu</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="space-x-1"
                onClick={deleteAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash className="h-4 w-4" />
                <span>Tout supprimer</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="mb-4 bg-gray-100 p-1">
              <TabsTrigger value="all" className="flex items-center space-x-1">
                <span>Tout</span>
                <Badge>{notifications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center space-x-1">
                <span>Non lus</span>
                <Badge>{unreadCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="order" className="flex items-center space-x-1">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Commandes</span>
              </TabsTrigger>
              <TabsTrigger value="promo" className="flex items-center space-x-1">
                <Percent className="h-4 w-4 mr-1" />
                <span>Promos</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center space-x-1">
                <Settings className="h-4 w-4 mr-1" />
                <span>Système</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))
              ) : (
                <Alert>
                  <AlertTitle>Aucune notification</AlertTitle>
                  <AlertDescription>
                    Vous n'avez aucune notification dans cette catégorie pour le moment.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
      <Toaster />
    </div>
  );
};

export default Notifications;
