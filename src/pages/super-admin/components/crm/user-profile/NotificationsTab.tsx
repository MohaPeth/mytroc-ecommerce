
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell, Mail, MessageSquare, Filter, Download, Plus } from 'lucide-react';
import { toast } from 'sonner';
import NotificationForm from '../forms/NotificationForm';

interface NotificationsTabProps {
  userId: string;
  formatDate: (dateString: string) => string;
}

// Mock data for notifications
const NOTIFICATIONS_DATA = [
  {
    id: "N001",
    type: "email",
    title: "Confirmation de commande",
    template: "order-confirmation",
    content: "Votre commande CMD-87562 a été confirmée.",
    date: "2025-03-15",
    opened: true
  },
  {
    id: "N002",
    type: "push",
    title: "Promotion weekend",
    template: "marketing",
    content: "Profitez de -15% sur tous nos produits ce weekend.",
    date: "2025-03-10",
    opened: true
  },
  {
    id: "N003",
    type: "email",
    title: "Livraison expédiée",
    template: "shipping-update",
    content: "Votre commande CMD-87562 a été expédiée.",
    date: "2025-03-05",
    opened: false
  },
  {
    id: "N004",
    type: "sms",
    title: "Code de réduction",
    template: "promotion",
    content: "Utilisez le code SPRING15 pour bénéficier de 15% de réduction.",
    date: "2025-02-28",
    opened: true
  },
  {
    id: "N005",
    type: "email",
    title: "Mise à jour des CGV",
    template: "system-update",
    content: "Nos conditions générales de vente ont été mises à jour.",
    date: "2025-02-20",
    opened: false
  }
];

const NotificationsTab: React.FC<NotificationsTabProps> = ({ userId, formatDate }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    if (editingNotification) {
      // Logique de mise à jour
      toast.success(`Notification "${data.title}" mise à jour avec succès`);
    } else {
      // Logique d'ajout
      toast.success(`Notification "${data.title}" envoyée avec succès`);
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
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Historique des notifications envoyées à l'utilisateur</CardDescription>
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
          <Button size="sm" className="gap-2" onClick={openNewNotificationForm}>
            <Plus className="h-4 w-4" />
            Envoyer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Date</TableHead>
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
                <TableCell>
                  <div className="truncate max-w-[200px]">{notification.content}</div>
                </TableCell>
                <TableCell>{formatDate(notification.date)}</TableCell>
                <TableCell>
                  {notification.opened ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Lu</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Non lu</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditNotification(notification)}>Détails</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                Emails
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">
                {NOTIFICATIONS_DATA.filter(n => n.type === 'email').length}
              </div>
              <div className="text-xs text-gray-500">Messages envoyés</div>
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
              <div className="text-2xl font-bold">
                {NOTIFICATIONS_DATA.filter(n => n.type === 'push').length}
              </div>
              <div className="text-xs text-gray-500">Alertes envoyées</div>
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
              <div className="text-2xl font-bold">
                {NOTIFICATIONS_DATA.filter(n => n.type === 'sms').length}
              </div>
              <div className="text-xs text-gray-500">Messages texte envoyés</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingNotification ? 'Détails de la notification' : 'Envoyer une notification'}
            </DialogTitle>
          </DialogHeader>
          <NotificationForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
            initialData={editingNotification && {
              title: editingNotification.title,
              content: editingNotification.content,
              type: editingNotification.type,
              template: editingNotification.template,
              sendDate: new Date(editingNotification.date),
              segmentAll: false,
              sendNow: true,
            }}
            title={editingNotification ? 'Détails de la notification' : 'Envoyer une notification'}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotificationsTab;
