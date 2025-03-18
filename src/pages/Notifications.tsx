
import React, { useState, useEffect } from 'react';
import { CheckCheck, Trash, ShoppingCart, Percent, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import AssistanceButton from '@/components/AssistanceButton';
import NotificationItem from '@/components/notifications/NotificationItem';
import { useNotifications } from '@/hooks/useNotifications';

const Notifications = () => {
  const { 
    notifications, 
    unreadCount,
    markAsRead,
    deleteNotification,
    markAllAsRead,
    deleteAllNotifications
  } = useNotifications();
  
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Handler for marking a notification as read with toast feedback
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été marquée comme lue avec succès.",
    });
  };

  // Handler for deleting a notification with toast feedback
  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès.",
    });
  };

  // Handler for marking all notifications as read with toast feedback
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "Toutes les notifications marquées comme lues",
      description: "Toutes vos notifications ont été marquées comme lues.",
    });
  };

  // Handler for deleting all notifications with toast feedback
  const handleDeleteAllNotifications = () => {
    deleteAllNotifications();
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
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="h-4 w-4" />
                <span>Tout marquer comme lu</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="space-x-1"
                onClick={handleDeleteAllNotifications}
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
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDeleteNotification}
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
    </div>
  );
};

export default Notifications;
