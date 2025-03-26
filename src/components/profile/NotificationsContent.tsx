
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Heart,
  ShoppingBag,
  Eye,
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
      
      {/* Ajout d'un aperçu des notifications récentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Notifications récentes</CardTitle>
          {unreadCount > 0 && (
            <div className="bg-mytroc-accent text-white text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount} non {unreadCount > 1 ? 'lues' : 'lue'}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.length > 0 ? (
              <>
                {recentNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg transition-all ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <NotificationIcon type={notification.type} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{notification.date}</p>
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0" 
                                onClick={() => markAsRead(notification.id)}
                              >
                                <span className="sr-only">Marquer comme lu</span>
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:text-red-500" 
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <span className="sr-only">Supprimer</span>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/notifications" className="inline-flex w-full">
                  <Button variant="outline" className="w-full group">
                    <span>Voir toutes les notifications</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </>
            ) : (
              <div className="text-center py-6">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-800">Aucune notification</h3>
                <p className="text-gray-500 mt-1">Vous n'avez aucune notification pour le moment.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Articles favoris</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex space-x-4 border rounded-md p-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Produit Écologique {item}</h4>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">29,99 €</p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline">Voir le détail</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full">
              Voir tous les favoris
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsContent;
