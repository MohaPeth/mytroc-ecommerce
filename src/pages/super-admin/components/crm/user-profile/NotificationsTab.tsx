
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, MessageSquare, ShoppingCart, Mail, Send, Filter, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface NotificationsTabProps {
  userId: string;
  formatDate: (dateString: string) => string;
}

// Mock data for notifications
const NOTIFICATIONS_DATA = [
  {
    id: "N001",
    type: "system",
    title: "Mise à jour des CGV",
    content: "Nos conditions générales de vente ont été mises à jour. Veuillez en prendre connaissance.",
    date: "2025-03-20",
    read: true,
    icon: Bell
  },
  {
    id: "N002",
    type: "message",
    title: "Nouveau message",
    content: "Vous avez reçu un nouveau message de support concernant votre commande CMD-87562.",
    date: "2025-03-18",
    read: false,
    icon: MessageSquare
  },
  {
    id: "N003",
    type: "sale",
    title: "Nouvelle vente",
    content: "Félicitations ! Votre produit 'Table basse vintage' vient d'être vendu pour 129.99€.",
    date: "2025-03-15",
    read: true,
    icon: ShoppingCart
  },
  {
    id: "N004",
    type: "email",
    title: "Email de bienvenue",
    content: "Email de bienvenue envoyé suite à l'inscription de l'utilisateur.",
    date: "2025-02-10",
    read: true,
    icon: Mail
  },
  {
    id: "N005",
    type: "message",
    title: "Demande d'information",
    content: "Un client potentiel vous a envoyé une demande d'information sur votre produit 'Lampe design'.",
    date: "2025-03-12",
    read: false,
    icon: MessageSquare
  }
];

const NotificationsTab: React.FC<NotificationsTabProps> = ({ userId, formatDate }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications envoyées</CardTitle>
          <CardDescription>Historique des notifications envoyées à l'utilisateur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Clock className="h-4 w-4" />
              Chronologie
            </Button>
            <Button size="sm" className="gap-2 ml-auto">
              <Send className="h-4 w-4" />
              Nouvelle notification
            </Button>
          </div>
          
          <div className="space-y-4">
            {NOTIFICATIONS_DATA.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
              >
                <div className="mr-4 mt-0.5">
                  <div className="p-2 rounded-full bg-gray-100">
                    <notification.icon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      {!notification.read && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Non lue
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{notification.content}</p>
                  
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      Marquer comme {notification.read ? 'non lue' : 'lue'}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Préférences de notifications</CardTitle>
          <CardDescription>Paramètres de notification pour cet utilisateur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Emails marketing</h4>
                <p className="text-xs text-gray-500">Notifications sur les promotions et offres</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Messages système</h4>
                <p className="text-xs text-gray-500">Mises à jour importantes et changements</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Alertes de vente</h4>
                <p className="text-xs text-gray-500">Notifications lors de nouvelles ventes</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Notifications push</h4>
                <p className="text-xs text-gray-500">Alertes directes sur le navigateur</p>
              </div>
              <Switch checked={false} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">SMS</h4>
                <p className="text-xs text-gray-500">Alertes par message texte</p>
              </div>
              <Switch checked={false} />
            </div>
            
            <Button className="w-full mt-2">Enregistrer les préférences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
