
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Package, Calendar, Euro } from 'lucide-react';

const Offers = () => {
  // Sample data - will be replaced with real data from database
  const offers = [
    {
      id: '1',
      productName: 'iPhone 14 Pro',
      offerAmount: 850,
      originalPrice: 950,
      buyerName: 'Jean Dupont',
      message: 'Bonjour, je suis très intéressé par votre iPhone. Serait-il possible de négocier le prix ?',
      status: 'pending',
      createdAt: '2025-06-08T10:00:00Z'
    },
    {
      id: '2',
      productName: 'MacBook Air M2',
      offerAmount: 1200,
      originalPrice: 1299,
      buyerName: 'Marie Martin',
      message: 'Salut ! Votre MacBook a l\'air en excellent état. Mon offre tient-elle ?',
      status: 'accepted',
      createdAt: '2025-06-07T15:30:00Z'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Acceptée</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Refusée</Badge>;
      case 'countered':
        return <Badge className="bg-blue-100 text-blue-800">Contre-offre</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Offres reçues">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Offres reçues</h1>
          <p className="text-muted-foreground">
            Gérez les offres d'achat pour vos produits
          </p>
        </div>

        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        {offer.productName}
                      </CardTitle>
                      <CardDescription>
                        Offre de {offer.buyerName}
                      </CardDescription>
                    </div>
                    {getStatusBadge(offer.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix original</p>
                      <p className="font-semibold">{offer.originalPrice} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Offre proposée</p>
                      <p className="font-semibold text-lg text-green-600">{offer.offerAmount} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(offer.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {offer.message && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <p className="text-sm">{offer.message}</p>
                      </div>
                    </div>
                  )}

                  {offer.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accepter
                      </Button>
                      <Button size="sm" variant="outline">
                        Contre-offre
                      </Button>
                      <Button size="sm" variant="destructive">
                        Refuser
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Euro className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune offre reçue</h3>
              <p className="text-muted-foreground">
                Vous n'avez pas encore reçu d'offres pour vos produits.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Offers;
