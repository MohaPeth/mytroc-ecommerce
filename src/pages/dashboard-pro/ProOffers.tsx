
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Package, Search, Filter, TrendingUp } from 'lucide-react';

const ProOffers = () => {
  // Sample data with more offers for Pro view
  const offers = [
    {
      id: '1',
      productName: 'iPhone 14 Pro Max',
      offerAmount: 950,
      originalPrice: 1100,
      buyerName: 'Alexandre Dubois',
      buyerRating: 4.8,
      message: 'Bonjour, je suis très intéressé par votre iPhone. Accepteriez-vous 950€ ?',
      status: 'pending',
      createdAt: '2025-06-08T10:00:00Z',
      responseTime: 24
    },
    {
      id: '2',
      productName: 'MacBook Pro M3',
      offerAmount: 1800,
      originalPrice: 1999,
      buyerName: 'Sophie Martin',
      buyerRating: 4.9,
      message: 'Excellent produit ! Mon offre finale.',
      status: 'accepted',
      createdAt: '2025-06-07T15:30:00Z',
      responseTime: 2
    },
    {
      id: '3',
      productName: 'iPad Air',
      offerAmount: 450,
      originalPrice: 599,
      buyerName: 'Thomas Bernard',
      buyerRating: 4.2,
      message: 'Prix ferme pour un achat immédiat.',
      status: 'countered',
      createdAt: '2025-06-06T09:15:00Z',
      responseTime: 12
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

  const getDiscountPercentage = (offer: number, original: number) => {
    return Math.round(((original - offer) / original) * 100);
  };

  return (
    <ProDashboardLayout title="Offres reçues">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gestion des offres Pro</h1>
            <p className="text-muted-foreground">
              Outils avancés pour optimiser vos négociations
            </p>
          </div>
        </div>

        {/* Pro Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Offres reçues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-green-600">+3 cette semaine</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Taux d'acceptation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-green-600">+5% vs mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Temps de réponse moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4h</div>
              <p className="text-xs text-green-600">-2h vs mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Revenus générés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 250€</div>
              <p className="text-xs text-green-600">+15% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Pro Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres avancés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="accepted">Acceptées</SelectItem>
                  <SelectItem value="rejected">Refusées</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Réduction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="0-10">0-10%</SelectItem>
                  <SelectItem value="10-20">10-20%</SelectItem>
                  <SelectItem value="20+">20%+</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Offers List */}
        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        {offer.productName}
                      </CardTitle>
                      <CardDescription>
                        Offre de {offer.buyerName} • Note: ⭐ {offer.buyerRating}/5
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(offer.status)}
                      <Badge variant="outline">
                        -{getDiscountPercentage(offer.offerAmount, offer.originalPrice)}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix original</p>
                      <p className="font-semibold">{offer.originalPrice} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Offre proposée</p>
                      <p className="font-semibold text-lg text-green-600">{offer.offerAmount} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Économie</p>
                      <p className="font-semibold text-red-600">
                        -{offer.originalPrice - offer.offerAmount} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temps de réponse</p>
                      <p className="font-medium">
                        {offer.responseTime < 24 ? `${offer.responseTime}h` : `${Math.round(offer.responseTime / 24)}j`}
                      </p>
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

                  <div className="flex justify-between items-center pt-2">
                    {offer.status === 'pending' && (
                      <div className="flex gap-2">
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
                    <div className="flex gap-2 ml-auto">
                      <Button size="sm" variant="ghost">
                        Voir profil acheteur
                      </Button>
                      <Button size="sm" variant="outline">
                        Historique des offres
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Optimisez vos ventes</h3>
              <p className="text-muted-foreground">
                Utilisez les outils Pro pour améliorer vos négociations et augmenter vos revenus.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ProDashboardLayout>
  );
};

export default ProOffers;
