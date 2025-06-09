
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserEvents } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const ProTickets = () => {
  const { user } = useAuth();
  const { events, loading, error } = useUserEvents(user?.id || null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-green-100 text-green-800">À venir</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'ended':
        return <Badge variant="outline">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateSoldPercentage = (sold: number, total: number) => {
    if (total === 0) return 0;
    return Math.round(((total - sold) / total) * 100);
  };

  const totalActiveEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length;
  const totalTicketsSold = events.reduce((acc, event) => acc + (event.total_tickets - event.available_tickets), 0);
  const totalRevenue = events.reduce((acc, event) => acc + (event.price * (event.total_tickets - event.available_tickets)), 0);
  const averageSalesRate = events.length > 0 ? 
    Math.round(events.reduce((acc, event) => acc + calculateSoldPercentage(event.available_tickets, event.total_tickets), 0) / events.length) : 0;

  if (error) {
    return (
      <ProDashboardLayout title="Mes billets">
        <div className="text-center py-8">
          <p className="text-red-600">Erreur: {error}</p>
        </div>
      </ProDashboardLayout>
    );
  }

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
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-8" /> : totalActiveEvents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Billets vendus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-16" /> : totalTicketsSold}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-20" /> : `${totalRevenue.toLocaleString()} €`}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">Taux de vente moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{loading ? <Skeleton className="h-8 w-12" /> : `${averageSalesRate}%`}</div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => {
              const soldTickets = event.total_tickets - event.available_tickets;
              const revenue = event.price * soldTickets;
              const salesPercentage = calculateSoldPercentage(event.available_tickets, event.total_tickets);
              
              return (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.event_date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Billets vendus</p>
                        <p className="font-semibold">{soldTickets} / {event.total_tickets}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${salesPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenus générés</p>
                        <p className="font-semibold text-lg text-green-600">{revenue.toLocaleString()} €</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Taux de vente</p>
                        <p className="font-semibold">{salesPercentage}%</p>
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
              );
            })}
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
