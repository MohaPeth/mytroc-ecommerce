import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OrdersTable from '@/components/dashboard/OrdersTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FilterX, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  // Exemple de commandes
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
      },
      status: 'delivered' as const,
      date: new Date(2023, 5, 12),
      total: 124.99,
      items: 2,
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
      },
      status: 'shipped' as const,
      date: new Date(2023, 5, 10),
      total: 89.50,
      items: 1,
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Paul Bernard',
        email: 'paul.bernard@example.com',
      },
      status: 'processing' as const,
      date: new Date(2023, 5, 8),
      total: 245.00,
      items: 3,
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Sophie Dubois',
        email: 'sophie.dubois@example.com',
      },
      status: 'delivered' as const,
      date: new Date(2023, 5, 5),
      total: 67.25,
      items: 1,
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'Alexandre Moreau',
        email: 'alexandre.moreau@example.com',
      },
      status: 'pending' as const,
      date: new Date(2023, 5, 3),
      total: 352.75,
      items: 4,
    },
    {
      id: 'ORD-006',
      customer: {
        name: 'Isabelle Lefebvre',
        email: 'isabelle.lefebvre@example.com',
      },
      status: 'cancelled' as const,
      date: new Date(2023, 5, 1),
      total: 129.99,
      items: 2,
    },
  ]);

  // Filtre des commandes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Gérer la visualisation des détails de la commande
  const handleViewDetails = (id: string) => {
    navigate(`/order-details/${id}`);
  };

  // Gérer la mise à jour du statut de la commande
  const handleUpdateStatus = (orderId: string, newStatus: string, comment: string) => {
    // Mettre à jour l'état local
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any } 
        : order
    );
    
    setOrders(updatedOrders);
    
    // Trouver la commande mise à jour pour la notification
    const updatedOrder = updatedOrders.find(order => order.id === orderId);
    
    if (updatedOrder) {
      // Afficher un toast pour confirmer la mise à jour
      toast({
        title: "Statut mis à jour",
        description: `La commande #${orderId} est maintenant "${getStatusName(newStatus)}"`
      });
      
      // Créer une notification pour le client (avec le bon type)
      addNotification({
        type: 'info',
        title: `Mise à jour de la commande #${orderId}`,
        message: `Votre commande est maintenant: ${getStatusName(newStatus)}${comment ? ` - Note: ${comment}` : ''}`,
        action_url: `/order-details/${orderId}`,
      });
    }
  };

  // Fonction pour obtenir le nom du statut en français
  const getStatusName = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En cours de traitement';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <DashboardLayout title="Commandes">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold">Gestion des commandes</h1>
          <p className="text-muted-foreground">Suivez et gérez les commandes de vos clients</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Card className="mb-6 w-full">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou n° de commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En cours</SelectItem>
                <SelectItem value="shipped">Expédié</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={resetFilters} className="gap-2">
              <FilterX className="h-4 w-4" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full overflow-x-auto">
        <OrdersTable 
          orders={filteredOrders} 
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        Affichage de {filteredOrders.length} commandes sur {orders.length} au total
      </div>
    </DashboardLayout>
  );
};

export default Orders;
