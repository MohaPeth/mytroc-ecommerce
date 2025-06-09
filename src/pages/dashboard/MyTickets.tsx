
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserTickets } from '@/hooks/useTickets';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const MyTickets = () => {
  const { user } = useAuth();
  const { tickets, loading, error } = useUserTickets(user?.id || null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return <Badge className="bg-green-100 text-green-800">Valide</Badge>;
      case 'used':
        return <Badge variant="secondary">Utilisé</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expiré</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (error) {
    return (
      <DashboardLayout title="Mes billets">
        <div className="text-center py-8">
          <p className="text-red-600">Erreur: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes billets">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Mes billets</h1>
            <p className="text-muted-foreground">
              Gérez vos billets d'événements
            </p>
          </div>
          <Link to="/dashboard/publier-billet">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Publier un billet
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{ticket.event?.title || 'Événement'}</CardTitle>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <CardDescription>
                    Billet #{ticket.ticket_number}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {ticket.event?.event_date ? 
                      new Date(ticket.event.event_date).toLocaleDateString('fr-FR') : 
                      'Date non définie'
                    }
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {ticket.event?.location || 'Lieu non défini'}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-lg">{ticket.price.toFixed(2)} €</span>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun billet</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore de billets d'événements.
              </p>
              <Link to="/dashboard/publier-billet">
                <Button>Publier votre premier billet</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTickets;
