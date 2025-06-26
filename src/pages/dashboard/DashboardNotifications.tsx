
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, CheckCheck, Trash2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

const DashboardNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvelle commande',
      message: 'Vous avez reçu une nouvelle commande pour "iPhone 13 Pro"',
      type: 'success',
      read: false,
      timestamp: '2024-01-20 10:30'
    },
    {
      id: '2',
      title: 'Offre reçue',
      message: 'Une nouvelle offre de 450€ a été proposée pour votre MacBook',
      type: 'info',
      read: false,
      timestamp: '2024-01-20 09:15'
    },
    {
      id: '3',
      title: 'Produit vendu',
      message: 'Votre "Samsung Galaxy S23" a été vendu avec succès',
      type: 'success',
      read: true,
      timestamp: '2024-01-19 16:45'
    },
    {
      id: '4',
      title: 'Stock faible',
      message: 'Il ne reste plus que 2 unités de votre produit "AirPods Pro"',
      type: 'warning',
      read: false,
      timestamp: '2024-01-19 14:20'
    },
    {
      id: '5',
      title: 'Paiement reçu',
      message: 'Paiement de 299€ reçu pour la commande #12345',
      type: 'success',
      read: true,
      timestamp: '2024-01-19 11:30'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <DashboardLayout title="Notifications">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Gérez vos notifications et restez informé de votre activité
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCheck className="h-4 w-4 mr-2" />
                Tout marquer comme lu ({unreadCount})
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Non lues</p>
                  <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
                </div>
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bell className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aujourd'hui</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cette semaine</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Bell className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications récentes</CardTitle>
            <CardDescription>
              Vos dernières notifications et alertes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune notification pour le moment</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start space-x-4 p-4 rounded-lg border transition-colors",
                      notification.read 
                        ? "bg-gray-50 border-gray-200" 
                        : "bg-white border-mytroc-primary/20 shadow-sm"
                    )}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={cn(
                          "font-medium",
                          !notification.read && "font-semibold"
                        )}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-mytroc-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;
