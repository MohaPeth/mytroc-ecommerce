
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Filter, Plus, Send, Eye, Trash2, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const SuperAdminNotifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data
  const notifications = [
    {
      id: '1',
      user_id: 'user-1',
      user_name: 'Jean Dupont',
      title: 'Commande confirmée',
      message: 'Votre commande #12345 a été confirmée',
      type: 'order',
      read: false,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      user_id: 'user-2',
      user_name: 'Marie Martin',
      title: 'Promotion spéciale',
      message: 'Profitez de 20% de réduction sur tous les produits électroniques',
      type: 'promo',
      read: true,
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      user_id: 'all',
      user_name: 'Tous les utilisateurs',
      title: 'Mise à jour système',
      message: 'La plateforme sera en maintenance le 20 janvier de 2h à 4h',
      type: 'system',
      read: true,
      created_at: '2024-01-13T09:15:00Z'
    }
  ];

  const filteredNotifications = notifications.filter(notif => 
    (notif.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     notif.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === 'all' || notif.type === typeFilter)
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'promo': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order': return 'Commande';
      case 'promo': return 'Promotion';
      case 'system': return 'Système';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-500" />
            Gestion des Notifications
          </h2>
          <p className="text-muted-foreground">
            Envoyez et gérez les notifications aux utilisateurs
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Envoyer une notification</DialogTitle>
              <DialogDescription>
                Créez une nouvelle notification pour les utilisateurs
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Destinataire</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner les destinataires" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les utilisateurs</SelectItem>
                    <SelectItem value="customers">Clients uniquement</SelectItem>
                    <SelectItem value="vendors">Vendeurs uniquement</SelectItem>
                    <SelectItem value="pro">Comptes Pro uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de notification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="promo">Promotion</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                    <SelectItem value="order">Commande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input placeholder="Titre de la notification" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea placeholder="Contenu de la notification" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Envoyées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux d'ouverture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des Notifications</CardTitle>
          <CardDescription>
            Consultez toutes les notifications envoyées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par utilisateur, titre ou message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="order">Commandes</SelectItem>
                <SelectItem value="promo">Promotions</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destinataire</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {notification.user_id === 'all' && <Users className="h-4 w-4" />}
                      <div className="font-medium">{notification.user_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{notification.title}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{notification.message}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(notification.type)}>
                      {getTypeLabel(notification.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {notification.read ? (
                      <Badge variant="outline">Lue</Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-800">Non lue</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(notification.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminNotifications;
