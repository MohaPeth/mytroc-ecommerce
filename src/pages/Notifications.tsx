
import React, { useState } from 'react';
import { Bell, X, Settings, Check, Trash, Eye } from 'lucide-react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNotifications } from '@/hooks/useNotifications';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const Notifications = () => {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    deleteNotification,
    markAllAsRead
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
    info: notifications.filter(n => n.type === 'info').length,
    success: notifications.filter(n => n.type === 'success').length,
    error: notifications.filter(n => n.type === 'error').length,
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'error': return 'border-l-red-500';
      case 'warning': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Notifications">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mytroc-primary"></div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Notifications">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-8 w-8 text-mytroc-primary" />
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-gray-600">Restez informé de toutes vos activités</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="h-4 w-4 mr-2" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Centre de notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" className="text-xs">
                  Toutes ({counts.all})
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">
                  Non lues ({counts.unread})
                </TabsTrigger>
                <TabsTrigger value="info" className="text-xs">
                  Info ({counts.info})
                </TabsTrigger>
                <TabsTrigger value="success" className="text-xs">
                  Succès ({counts.success})
                </TabsTrigger>
                <TabsTrigger value="error" className="text-xs">
                  Erreurs ({counts.error})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`
                          p-4 border rounded-lg border-l-4 transition-colors
                          ${getNotificationColor(notification.type)}
                          ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}
                        `}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <span className="text-lg">
                                {getNotificationIcon(notification.type)}
                              </span>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {notification.title}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(notification.created_at), { 
                                      addSuffix: true, 
                                      locale: fr 
                                    })}
                                  </span>
                                  {!notification.read && (
                                    <Badge variant="secondary" className="text-xs">
                                      Nouveau
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {notification.action_url && (
                              <Link to={notification.action_url}>
                                <Button variant="outline" size="sm">
                                  Voir
                                </Button>
                              </Link>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucune notification</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Notifications;
