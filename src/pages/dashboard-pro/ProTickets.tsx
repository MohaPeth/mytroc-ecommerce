
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, MapPin, Ticket, Download, Eye, Tag, BarChart4, Edit, Trash2, CheckCircle } from 'lucide-react';

// Mock data for tickets the pro seller is selling
const sellingTickets = [
  {
    id: "p1",
    eventName: "Festival Été Chaud",
    eventDate: "2025-07-15",
    eventTime: "14:00",
    location: "Parc des Expositions, Lyon",
    ticketType: "VIP",
    price: 120,
    quantity: 50,
    sold: 32,
    listedDate: "2025-04-02",
    status: "active",
    views: 520
  },
  {
    id: "p2",
    eventName: "Concert de Jazz",
    eventDate: "2025-05-10",
    eventTime: "20:00",
    location: "Salle Apollo, Paris",
    ticketType: "Standard",
    price: 45,
    quantity: 200,
    sold: 143,
    listedDate: "2025-03-28",
    status: "active",
    views: 841
  },
  {
    id: "p3",
    eventName: "Match de Football - PSG vs Monaco",
    eventDate: "2025-02-20",
    eventTime: "21:00",
    location: "Parc des Princes, Paris",
    ticketType: "Tribune",
    price: 65,
    quantity: 100,
    sold: 98,
    listedDate: "2025-01-15",
    status: "sold_out",
    views: 1243
  },
  {
    id: "p4",
    eventName: "Théâtre - Cyrano de Bergerac",
    eventDate: "2025-06-25",
    eventTime: "19:30",
    location: "Théâtre du Châtelet, Paris",
    ticketType: "Premium",
    price: 95,
    quantity: 80,
    sold: 62,
    listedDate: "2025-03-15",
    status: "active",
    views: 430
  },
  {
    id: "p5",
    eventName: "Festival de Musique Électronique",
    eventDate: "2025-08-05",
    eventTime: "22:00",
    location: "Plage du Prado, Marseille",
    ticketType: "Pass 3 jours",
    price: 180,
    quantity: 1000,
    sold: 756,
    listedDate: "2025-02-20",
    status: "active",
    views: 2143
  }
];

const ProTickets = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState("all");

  const filteredTickets = sellingTickets.filter(ticket => {
    if (activeFilter === "all") return true;
    return ticket.status === activeFilter;
  });

  const handleViewTicket = (ticketId: string) => {
    navigate(`/billet/${ticketId}`);
  };

  const handlePublishTicket = () => {
    navigate('/dashboard-pro/publier-billet');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">En vente</Badge>;
      case 'sold_out':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Épuisé</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <ProDashboardLayout title="Mes Billets">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Gestion des Billets</h2>
            <p className="text-muted-foreground">Gérez et analysez vos ventes de billets d'événements</p>
          </div>
          <Button onClick={handlePublishTicket}>
            <Ticket className="mr-2 h-4 w-4" />
            Publier un nouveau billet
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des billets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellingTickets.reduce((acc, ticket) => acc + ticket.quantity, 0)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {sellingTickets.length} événements différents
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Billets vendus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellingTickets.reduce((acc, ticket) => acc + ticket.sold, 0)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(sellingTickets.reduce((acc, ticket) => acc + ticket.sold, 0) / sellingTickets.reduce((acc, ticket) => acc + ticket.quantity, 0) * 100)}% du total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenus générés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sellingTickets.reduce((acc, ticket) => acc + (ticket.sold * ticket.price), 0).toLocaleString('fr-FR')} €
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+12%</span> par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vos billets d'événements</CardTitle>
            <CardDescription>Liste complète des billets que vous proposez à la vente</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveFilter}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">Tous les billets</TabsTrigger>
                <TabsTrigger value="active">En vente</TabsTrigger>
                <TabsTrigger value="sold_out">Épuisés</TabsTrigger>
              </TabsList>

              <div className="mt-2 mb-4">
                <p className="text-sm text-gray-600">
                  {filteredTickets.length} événement(s) trouvé(s)
                </p>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Événement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Disponibilité</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">
                          <div className="font-medium">{ticket.eventName}</div>
                          <div className="text-xs text-muted-foreground">{ticket.location}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{new Date(ticket.eventDate).toLocaleDateString('fr-FR')}</div>
                          <div className="text-xs text-muted-foreground">{ticket.eventTime}</div>
                        </TableCell>
                        <TableCell>{ticket.price} €</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">{ticket.sold} / {ticket.quantity}</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round(ticket.sold / ticket.quantity * 100)}% vendus
                          </div>
                        </TableCell>
                        <TableCell>{ticket.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewTicket(ticket.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <BarChart4 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ProDashboardLayout>
  );
};

export default ProTickets;
