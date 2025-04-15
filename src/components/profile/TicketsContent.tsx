
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Ticket, Download, Eye, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for tickets the user has purchased
const purchasedTickets = [
  {
    id: "p1",
    eventName: "Festival Été Chaud",
    eventDate: "2025-07-15",
    eventTime: "14:00",
    location: "Parc des Expositions, Lyon",
    ticketType: "VIP",
    price: 120,
    purchaseDate: "2025-04-02",
    status: "upcoming",
    seller: "FestivalPlus"
  },
  {
    id: "p2",
    eventName: "Concert de Jazz",
    eventDate: "2025-05-10",
    eventTime: "20:00",
    location: "Salle Apollo, Paris",
    ticketType: "Standard",
    price: 45,
    purchaseDate: "2025-03-28",
    status: "upcoming",
    seller: "ParisEvents"
  },
  {
    id: "p3",
    eventName: "Match de Football - PSG vs Monaco",
    eventDate: "2025-02-20",
    eventTime: "21:00",
    location: "Parc des Princes, Paris",
    ticketType: "Tribune",
    price: 65,
    purchaseDate: "2025-01-15",
    status: "past",
    seller: "SportTix"
  }
];

// Mock data for tickets the user is selling
const sellingTickets = [
  {
    id: "s1",
    eventName: "Le Roi Lion - Théâtre",
    eventDate: "2025-06-20",
    eventTime: "19:30",
    location: "Théâtre Mogador, Paris",
    ticketType: "Premium",
    price: 85,
    quantity: 3,
    listedDate: "2025-04-01",
    status: "active",
    views: 24
  },
  {
    id: "s2",
    eventName: "Concert Rock - Tribute Pink Floyd",
    eventDate: "2025-08-15",
    eventTime: "21:00",
    location: "Zénith, Lille",
    ticketType: "Standard",
    price: 55,
    quantity: 2,
    listedDate: "2025-03-30",
    status: "active",
    views: 18
  },
  {
    id: "s3",
    eventName: "Ballet - Casse-Noisette",
    eventDate: "2025-05-05",
    eventTime: "20:00",
    location: "Opéra Garnier, Paris",
    ticketType: "Loge",
    price: 110,
    quantity: 1,
    listedDate: "2025-03-25",
    status: "sold",
    views: 32
  }
];

const TicketsContent = () => {
  const [activeSubTab, setActiveSubTab] = useState("purchased");
  const [purchasedFilter, setPurchasedFilter] = useState("all");
  const [sellingFilter, setSellingFilter] = useState("all");
  const navigate = useNavigate();

  const filteredPurchasedTickets = purchasedTickets.filter(ticket => {
    if (purchasedFilter === "all") return true;
    return ticket.status === purchasedFilter;
  });

  const filteredSellingTickets = sellingTickets.filter(ticket => {
    if (sellingFilter === "all") return true;
    return ticket.status === sellingFilter;
  });

  const handleViewTicket = (ticketId: string) => {
    navigate(`/billet/${ticketId}`);
  };

  const handlePublishTicket = () => {
    navigate('/publier-billet');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">À venir</Badge>;
      case 'past':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Passé</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En vente</Badge>;
      case 'sold':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Vendu</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Billets</h2>
        <Button onClick={handlePublishTicket}>
          <Ticket className="mr-2 h-4 w-4" />
          Mettre en vente un billet
        </Button>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purchased">Mes achats</TabsTrigger>
          <TabsTrigger value="selling">Mes ventes</TabsTrigger>
        </TabsList>

        <div className="mt-4 mb-6">
          {activeSubTab === "purchased" && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {filteredPurchasedTickets.length} billet(s) trouvé(s)
              </p>
              <Select value={purchasedFilter} onValueChange={setPurchasedFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les billets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les billets</SelectItem>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="past">Passés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {activeSubTab === "selling" && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {filteredSellingTickets.length} billet(s) trouvé(s)
              </p>
              <Select value={sellingFilter} onValueChange={setSellingFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les billets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les billets</SelectItem>
                  <SelectItem value="active">En vente</SelectItem>
                  <SelectItem value="sold">Vendus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <TabsContent value="purchased" className="mt-0">
          {filteredPurchasedTickets.length > 0 ? (
            <div className="space-y-4">
              {filteredPurchasedTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-gray-100 p-4 md:w-32 flex items-center justify-center">
                        <Ticket className="h-12 w-12 text-gray-500" />
                      </div>
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                          {getStatusBadge(ticket.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(ticket.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{ticket.eventTime}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{ticket.location}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Tag className="h-4 w-4 mr-2" />
                              <span>Type: {ticket.ticketType}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Tag className="h-4 w-4 mr-2" />
                              <span>Prix: {ticket.price} €</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Tag className="h-4 w-4 mr-2" />
                              <span>Vendeur: {ticket.seller}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir le billet
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100">
                <Ticket className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun billet trouvé</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Vous n'avez pas encore acheté de billets d'événements.
              </p>
              <Button onClick={() => navigate('/billets-evenements')}>
                Découvrir les billets
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="selling" className="mt-0">
          {filteredSellingTickets.length > 0 ? (
            <div className="space-y-4">
              {filteredSellingTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-gray-100 p-4 md:w-32 flex items-center justify-center">
                        <Ticket className="h-12 w-12 text-gray-500" />
                      </div>
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                          {getStatusBadge(ticket.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(ticket.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{ticket.eventTime}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{ticket.location}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Tag className="h-4 w-4 mr-2" />
                              <span>Type: {ticket.ticketType}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Tag className="h-4 w-4 mr-2" />
                              <span>Prix: {ticket.price} €</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Eye className="h-4 w-4 mr-2" />
                              <span>{ticket.views} vues</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir l'annonce
                          </Button>
                          {ticket.status === 'active' && (
                            <Button variant="outline" size="sm">
                              <Tag className="h-4 w-4 mr-2" />
                              Modifier le prix
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100">
                <Ticket className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun billet en vente</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Vous n'avez pas encore mis de billets en vente.
              </p>
              <Button onClick={handlePublishTicket}>
                Mettre en vente un billet
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketsContent;
