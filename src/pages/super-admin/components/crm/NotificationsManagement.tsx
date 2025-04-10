
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Bell, Filter, Send, MessageSquare, Download, Settings, Mail, ShoppingCart, Clock
} from 'lucide-react';
import NotificationForm from './forms/NotificationForm';

// Mock data for notifications
const NOTIFICATIONS_DATA = [
  {
    id: "N001",
    type: "email",
    title: "Mise à jour des CGV",
    template: "system-update",
    sentTo: 1250,
    openRate: 45,
    sentDate: "15/03/2025",
    status: "sent"
  },
  {
    id: "N002",
    type: "push",
    title: "Promotion weekend",
    template: "marketing",
    sentTo: 980,
    openRate: 62,
    sentDate: "10/03/2025",
    status: "sent"
  },
  {
    id: "N003",
    type: "email",
    title: "Confirmation de compte",
    template: "account-confirmation",
    sentTo: 1,
    openRate: 100,
    sentDate: "05/03/2025",
    status: "sent"
  },
  {
    id: "N004",
    type: "sms",
    title: "Code de sécurité",
    template: "security-code",
    sentTo: 1,
    openRate: 100,
    sentDate: "28/02/2025",
    status: "sent"
  },
  {
    id: "N005",
    type: "email",
    title: "Rappel de panier abandonné",
    template: "cart-reminder",
    sentTo: 128,
    openRate: 38,
    sentDate: "20/02/2025",
    status: "sent"
  }
];

const NotificationsManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    if (editingNotification) {
      // Logique de mise à jour
      toast.success(`Notification "${data.title}" mise à jour avec succès`);
    } else {
      // Logique d'ajout
      toast.success(`Notification "${data.title}" créée avec succès`);
    }
    setIsFormOpen(false);
    setEditingNotification(null);
  };

  const handleEditNotification = (notification: any) => {
    setEditingNotification(notification);
    setIsFormOpen(true);
  };

  const openNewNotificationForm = () => {
    setEditingNotification(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestion des notifications</CardTitle>
              <CardDescription>
                Gérez et personnalisez les notifications envoyées aux utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </Button>
              <Button size="sm" className="gap-2" onClick={openNewNotificationForm}>
                <Send className="h-4 w-4" />
                Nouvelle notification
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Destinataires</TableHead>
                <TableHead>Taux d'ouverture</TableHead>
                <TableHead>Date d'envoi</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {NOTIFICATIONS_DATA.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    {notification.type === 'email' && <Mail className="h-4 w-4 text-blue-500" />}
                    {notification.type === 'push' && <Bell className="h-4 w-4 text-purple-500" />}
                    {notification.type === 'sms' && <MessageSquare className="h-4 w-4 text-green-500" />}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{notification.title}</div>
                  </TableCell>
                  <TableCell>{notification.template}</TableCell>
                  <TableCell>{notification.sentTo}</TableCell>
                  <TableCell>{notification.openRate}%</TableCell>
                  <TableCell>{notification.sentDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Envoyé
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditNotification(notification)}>Détails</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  Emails
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">2,450</div>
                <div className="text-xs text-gray-500">Emails envoyés ce mois</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bell className="h-4 w-4 text-purple-500" />
                  Notifications push
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">1,280</div>
                <div className="text-xs text-gray-500">Alertes envoyées ce mois</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">350</div>
                <div className="text-xs text-gray-500">Messages envoyés ce mois</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingNotification ? 'Modifier la notification' : 'Créer une nouvelle notification'}
            </DialogTitle>
          </DialogHeader>
          <NotificationForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
            initialData={editingNotification && {
              title: editingNotification.title,
              type: editingNotification.type,
              template: editingNotification.template,
              sendDate: new Date(),
              // Autres champs si nécessaire
            }}
            title={editingNotification ? 'Modifier la notification' : 'Créer une notification'}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsManagement;
