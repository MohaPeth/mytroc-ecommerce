
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Ticket, Filter, Search } from 'lucide-react';
import { MOCK_EVENTS, MOCK_TICKETS } from '@/data/mockEventData';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const EventCard = ({ event }: { event: typeof MOCK_EVENTS[0] }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative">
        <img 
          src={event.imageUrl || '/placeholder.svg'} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-mytroc-primary text-white">
          {event.category === 'concerts' ? 'Concert' : 
           event.category === 'festivals' ? 'Festival' : 
           event.category === 'theatre' ? 'Théâtre' : 
           event.category === 'soirees-privees' ? 'Soirée Privée' : 'Sport'}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold line-clamp-1">{event.name}</h3>
        <div className="flex items-center text-gray-500 mt-1 text-sm">
          <Calendar size={16} className="mr-1" />
          <span>{format(event.date, 'dd MMMM yyyy', { locale: fr })}</span>
        </div>
        <div className="flex items-center text-gray-500 mt-1 text-sm">
          <Clock size={16} className="mr-1" />
          <span>{format(event.date, 'HH:mm', { locale: fr })}</span>
        </div>
        <div className="flex items-center text-gray-500 mt-1 text-sm">
          <MapPin size={16} className="mr-1" />
          <span className="line-clamp-1">{event.venue}, {event.city}</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-sm text-gray-500">À partir de</p>
            <p className="font-semibold text-mytroc-primary">
              {Math.min(...event.ticketTypes.map(t => t.price))}€
            </p>
          </div>
          <Button variant="outline" className="text-mytroc-primary border-mytroc-primary hover:bg-mytroc-primary/10">
            <Ticket size={16} className="mr-1" />
            Voir les billets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TicketCard = ({ ticket }: { ticket: typeof MOCK_TICKETS[0] }) => {
  const event = MOCK_EVENTS.find(e => e.id === ticket.eventId);
  if (!event) return null;
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative">
        <img 
          src={event.imageUrl || '/placeholder.svg'} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        {ticket.isResale && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
            Revente
          </Badge>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold line-clamp-1">{event.name}</h3>
        <div className="flex items-center text-gray-500 mt-1 text-sm">
          <Calendar size={16} className="mr-1" />
          <span>{format(event.date, 'dd MMMM yyyy', { locale: fr })}</span>
        </div>
        <div className="flex items-center text-gray-500 mt-1 text-sm">
          <Ticket size={16} className="mr-1" />
          <span>
            {ticket.ticketType === 'vip' ? 'VIP' : 
             ticket.ticketType === 'standard' ? 'Standard' : 
             ticket.ticketType === 'standard-plus' ? 'Standard+' : 
             ticket.ticketType === 'balcon' ? 'Balcon' : 
             ticket.ticketType === 'fosse' ? 'Fosse' : 
             ticket.ticketType === 'gradin' ? 'Gradin' : 
             ticket.ticketType === 'lounge' ? 'Lounge' : 'Emplacement'}
          </span>
          {ticket.section && ` - ${ticket.section}`}
          {ticket.row && ` - Rang ${ticket.row}`}
          {ticket.seat && ` - Siège ${ticket.seat}`}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className={`text-sm ${ticket.sellingPrice < ticket.originalPrice ? 'line-through text-gray-400' : 'text-gray-500'}`}>
              Prix initial: {ticket.originalPrice}€
            </p>
            <p className="font-semibold text-mytroc-primary">
              {ticket.sellingPrice}€
            </p>
          </div>
          <Button className="bg-mytroc-primary hover:bg-mytroc-primary/90">
            Acheter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Evenements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    const today = new Date();
    const eventDate = new Date(event.date);
    const isThisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const isThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const matchesDate = dateFilter === 'all' || 
                      (dateFilter === 'today' && eventDate.toDateString() === today.toDateString()) ||
                      (dateFilter === 'week' && eventDate <= isThisWeek && eventDate >= today) ||
                      (dateFilter === 'month' && eventDate <= isThisMonth && eventDate >= today);
    
    return matchesSearch && matchesCategory && matchesDate;
  });
  
  return (
    <>
      <Helmet>
        <title>Billets & Événements | MyTroc</title>
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Billets & Événements</h1>
        <p className="text-gray-600 mb-6">
          Achetez et revendez vos billets pour des concerts, festivals, théâtres et événements sportifs en toute sécurité.
        </p>
        
        <div className="bg-gradient-to-r from-mytroc-primary to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Vous avez des billets à revendre ?</h2>
          <p className="mb-4">Créez une annonce pour vendre vos billets en toute sécurité et simplicité.</p>
          <Button variant="outline" className="bg-white text-mytroc-primary hover:bg-gray-100">
            <Ticket className="mr-2" size={16} />
            Vendre mes billets
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un événement, une ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="concerts">Concerts</SelectItem>
                <SelectItem value="festivals">Festivals</SelectItem>
                <SelectItem value="theatre">Théâtre</SelectItem>
                <SelectItem value="soirees-privees">Soirées privées</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les dates</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois-ci</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2 col-span-2">
              <Filter size={16} />
              Plus de filtres
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="events" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="tickets">Billets à vendre</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold">Aucun événement trouvé</h3>
                <p className="text-gray-500 mt-2">Essayez de modifier vos filtres</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tickets">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_TICKETS.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </>
  );
};

export default Evenements;
