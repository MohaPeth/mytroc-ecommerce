
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OrdersTable from '@/components/dashboard/OrdersTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FilterX, Download } from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Exemple de commandes
  const orders = [
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
  ];

  // Filtre des commandes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (id: string) => {
    console.log(`Voir les détails de la commande ${id}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <DashboardLayout title="Commandes">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des commandes</h1>
          <p className="text-muted-foreground">Suivez et gérez les commandes de vos clients</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Card className="mb-6">
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

      <OrdersTable 
        orders={filteredOrders} 
        onViewDetails={handleViewDetails} 
      />
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        Affichage de {filteredOrders.length} commandes sur {orders.length} au total
      </div>
    </DashboardLayout>
  );
};

export default Orders;
