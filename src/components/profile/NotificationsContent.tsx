
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Heart,
  ShoppingBag,
  ArrowRight,
  Check,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationIcon } from '@/components/notifications/NotificationItem';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const NotificationsContent = () => {
  const { notifications, markAsRead, deleteNotification, unreadCount } = useNotifications();
  
  // Afficher seulement les 3 notifications les plus récentes
  const recentNotifications = notifications.slice(0, 3);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Préférences de notifications</CardTitle>
          {unreadCount > 0 && (
            <div className="bg-mytroc-accent text-white text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount} non {unreadCount > 1 ? 'lues' : 'lue'}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Type de notification</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>SMS</TableHead>
                <TableHead>Application</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Commandes et livraisons</TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Promotions et offres spéciales</TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Produits de retour en stock</TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nouveaux produits</TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Centre de notifications intégré */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Centre de notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationCenter />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Articles favoris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-4 border rounded-md p-3">
                    <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">Produit Écologique {item}</h4>
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">29,99 €</p>
                      <div className="mt-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Voir le détail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Voir tous les favoris
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsContent;
