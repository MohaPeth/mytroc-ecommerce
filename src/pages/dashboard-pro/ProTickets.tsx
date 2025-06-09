
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProTickets = () => {
  // Sample data - will be replaced with real data from database
  const tickets = [
    {
      id: '1',
      eventTitle: 'Conférence Tech 2025',
      eventDate: '2025-09-15',
      location: 'Centre de Conférences, Lyon',
      totalTickets: 200,
      soldTickets: 156,
      revenue: 7800,
      status: 'active'
    },
    {
      id: '2',
      eventTitle: 'Workshop Marketing Digital',
      eventDate: '2025-10-22',
      location: 'Espace Coworking, Marseille',
      totalTickets: 50,
      soldTickets: 43,
      revenue: 2150,
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'draft':
        return <Badge variant="secondary">Brouillon</Badge>;
      case 'ended':
        return <Badge variant="outline">Terminé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateSoldPercentage = (sold: number, total: number) => {
    return Math.round((sold / total) * 100);
  };

  return (
    <ProDashboardLayout title="Mes billets">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gestion des billets</h1>
            <p className="text-muted-foreground">
              Créez et gérez vos événements avec analytics avancés
            </p>
          </div>
          <Link to="/dashboard-pro/publier-billet">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Créer un événement
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Événements actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Billets vendus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">199</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9 950 €</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Taux de vente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">79%</div>
            </CardContent>
          </Card>
        </div>

        {tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(ticket.eventDate).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {ticket.location}
                        </span>
                      </CardDescription>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Billets vendus</p>
                      <p className="font-semibold">{ticket.soldTickets} / {ticket.totalTickets}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${calculateSoldPercentage(ticket.soldTickets, ticket.totalTickets)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenus générés</p>
                      <p className="font-semibold text-lg text-green-600">{ticket.revenue.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taux de vente</p>
                      <p className="font-semibold">{calculateSoldPercentage(ticket.soldTickets, ticket.totalTickets)}%</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Voir analytics
                      </Button>
                      <Button size="sm">
                        Modifier
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
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun événement</h3>
              <p className="text-muted-foreground mb-4">
                Commencez à créer vos événements et vendez vos billets.
              </p>
              <Link to="/dashboard-pro/publier-billet">
                <Button>Créer votre premier événement</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </ProDashboardLayout>
  );
};

export default ProTickets;
