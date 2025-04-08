
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import OrdersTable from '@/components/dashboard/OrdersTable';

const ProOrders = () => {
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

  // Gérer la visualisation des détails de la commande
  const handleViewDetails = (id: string) => {
    console.log(`Voir les détails de la commande ${id}`);
  };

  // Gérer la mise à jour du statut de la commande
  const handleUpdateStatus = (orderId: string, newStatus: string, comment: string) => {
    console.log(`Mise à jour du statut de la commande ${orderId} à ${newStatus} avec le commentaire: ${comment}`);
  };

  return (
    <ProDashboardLayout title="Commandes">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold">Gestion des commandes</h1>
          <p className="text-muted-foreground">
            Suivez et gérez les commandes de vos clients avec des outils avancés
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button>Expédier en masse</Button>
        </div>
      </div>

      <Card className="mb-6 w-full">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Les vendeurs premium bénéficient d'outils avancés de filtrage et de gestion des commandes, ainsi que de la possibilité d'expédier en masse.
          </p>
        </CardContent>
      </Card>

      <div className="w-full overflow-x-auto">
        <OrdersTable 
          orders={orders} 
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Affichage de {orders.length} commandes sur {orders.length} au total
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Imprimer les factures</Button>
          <Button variant="outline" size="sm">Imprimer les étiquettes</Button>
          <Button variant="outline" size="sm">Expédier toutes</Button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProOrders;
