
import React, { useState } from 'react';
import { Bell, X, Settings, Check, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NotificationCenter = () => {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    deleteNotification,
    markAllAsRead,
    deleteAllNotifications
  } = useNotifications();

  const [activeTab, setActiveTab] = useState('all');

  // Filtrer les notifications selon l'onglet actif
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Compter par type
  const counts = {
    all: notifications.length,
    unread: unreadCount,
    order: notifications.filter(n => n.type === 'order').length,
    promo: notifications.filter(n => n.type === 'promo').length,
    system: notifications.filter(n => n.type === 'system').length,
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              Marquer tout comme lu
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteAllNotifications} disabled={notifications.length === 0}>
              <Trash className="h-4 w-4 mr-2" />
              Supprimer toutes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              Toutes ({counts.all})
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Non lues ({counts.unread})
            </TabsTrigger>
            <TabsTrigger value="order" className="text-xs">
              Commandes ({counts.order})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                    compact
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Aucune notification</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
