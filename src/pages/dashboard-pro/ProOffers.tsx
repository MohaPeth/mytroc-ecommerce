
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProOffers = () => {
  // Exemple d'offres
  const offers = [
    {
      id: 1,
      productName: 'Mini Frigo',
      customer: {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
      },
      price: 250,
      offerAmount: 220,
      status: 'pending',
      date: new Date(2023, 5, 12),
      message: "Bonjour, serait-il possible d'avoir une réduction pour ce produit ?",
    },
    {
      id: 2,
      productName: 'Asus Zenbook',
      customer: {
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
      },
      price: 1499,
      offerAmount: 1350,
      status: 'accepted',
      date: new Date(2023, 5, 10),
      message: "Je suis intéressé par ce produit, pouvez-vous me faire un prix ?",
    },
    {
      id: 3,
      productName: 'Cafetière Moulinex',
      customer: {
        name: 'Paul Bernard',
        email: 'paul.bernard@example.com',
      },
      price: 89,
      offerAmount: 75,
      status: 'rejected',
      date: new Date(2023, 5, 5),
      message: "Bonjour, est-ce que ce produit est encore disponible ?",
    },
  ];

  // Gérer la réponse à une offre
  const handleResponse = (offerId: number, accept: boolean) => {
    console.log(`Offre ${offerId} ${accept ? 'acceptée' : 'refusée'}`);
  };

  // Obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Acceptée</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-600 hover:bg-red-100">Refusée</Badge>;
      default:
        return null;
    }
  };

  return (
    <ProDashboardLayout title="Offres reçues">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des offres</h1>
          <p className="text-muted-foreground">
            Consultez et gérez les offres reçues de vos clients
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Les vendeurs premium bénéficient d'outils avancés pour négocier avec les clients.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium">{offer.productName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {offer.customer.name} ({offer.customer.email})
                  </p>
                </div>
                {getStatusBadge(offer.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Prix affiché</p>
                  <p className="text-lg">€{offer.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Offre proposée</p>
                  <p className="text-lg">€{offer.offerAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium">Message</p>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                  {offer.message}
                </div>
              </div>

              {offer.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResponse(offer.id, false)}
                  >
                    Refuser
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleResponse(offer.id, true)}
                  >
                    Accepter
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ProDashboardLayout>
  );
};

export default ProOffers;
