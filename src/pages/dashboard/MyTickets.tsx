
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  // Sample data - will be replaced with real data from database
  const tickets = [
    {
      id: '1',
      eventTitle: 'Concert de Jazz',
      eventDate: '2025-07-15',
      location: 'Salle Pleyel, Paris',
      ticketNumber: 'TK001234',
      status: 'valid',
      price: 45.00
    },
    {
      id: '2',
      eventTitle: 'Festival Rock',
      eventDate: '2025-08-20',
      location: 'Stade de France',
      ticketNumber: 'TK005678',
      status: 'valid',
      price: 89.00
    }
  ];

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

        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <CardDescription>
                    Billet #{ticket.ticketNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(ticket.eventDate).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {ticket.location}
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
