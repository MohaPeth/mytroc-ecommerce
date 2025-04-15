import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/header/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Ticket, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock data for events and tickets
const mockEvents = [
  {
    id: '1',
    name: 'Concert de Jazz',
    date: '2025-05-10',
    time: '20:00',
    location: 'Salle Apollo, Paris',
    category: 'Concerts',
    ticketType: 'Standard',
    price: 45,
    quantity: 10,
    image: '/placeholder.svg',
    seller: 'ParisEvents',
    sellerRating: 4.8
  },
  {
    id: '2',
    name: 'Festival Été Chaud',
    date: '2025-07-15',
    time: '14:00',
    location: 'Parc des Expositions, Lyon',
    category: 'Festivals',
    ticketType: 'VIP',
    price: 120,
    quantity: 5,
    image: '/placeholder.svg',
    seller: 'FestivalPlus',
    sellerRating: 4.5
  },
  {
    id: '3',
    name: 'Le Roi Lion - Théâtre',
    date: '2025-06-20',
    time: '19:30',
    location: 'Théâtre Mogador, Paris',
    category: 'Théâtre',
    ticketType: 'Premium',
    price: 85,
    quantity: 3,
    image: '/placeholder.svg',
    seller: 'TheatreTix',
    sellerRating: 4.9
  },
  {
    id: '4',
    name: 'Soirée Gala Annuelle',
    date: '2025-08-30',
    time: '21:00',
    location: 'Hôtel Royal, Nice',
    category: 'Soirées privées',
    ticketType: 'Entrée + Dîner',
    price: 150,
    quantity: 8,
    image: '/placeholder.svg',
    seller: 'EventsElite',
    sellerRating: 4.7
  },
  {
    id: '5',
    name: 'Match de Football - PSG vs OM',
    date: '2025-09-14',
    time: '21:00',
    location: 'Parc des Princes, Paris',
    category: 'Sport',
    ticketType: 'Tribune',
    price: 75,
    quantity: 12,
    image: '/placeholder.svg',
    seller: 'SportTix',
    sellerRating: 4.6
  },
];

const TicketsEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get category from URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [location]);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, categoryFilter]);

  const filterEvents = () => {
    let filtered = events;
    
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }
    
    setFilteredEvents(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    if (value === 'all') {
      navigate('/billets-evenements');
    } else {
      navigate(`/billets-evenements?category=${value}`);
    }
  };

  const handlePublishEvent = () => {
    navigate('/publier-billet');
  };

  const handleViewEvent = (eventId: string) => {
    navigate(`/billet/${eventId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Billets & Événements</h1>
              <p className="text-gray-600">Découvrez et achetez des billets pour vos événements préférés</p>
            </div>
            <Button 
              onClick={handlePublishEvent}
              className="bg-mytroc-primary hover:bg-mytroc-primary/90 text-white"
            >
              <Ticket className="mr-2 h-4 w-4" />
              Mettre en vente un billet
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-subtle mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="Concerts">Concerts</SelectItem>
                    <SelectItem value="Festivals">Festivals</SelectItem>
                    <SelectItem value="Théâtre">Théâtre</SelectItem>
                    <SelectItem value="Soirées privées">Soirées privées</SelectItem>
                    <SelectItem value="Sport">Sport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Event Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-subtle transition-all hover:shadow-elevated">
                  <div className="aspect-[5/3] relative">
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-mytroc-accent text-white">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{event.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {event.ticketType}
                        </Badge>
                      </div>
                      <div className="text-mytroc-primary font-bold text-xl">
                        {event.price} €
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>Reste {event.quantity} billets</span>
                      </div>
                      <Button onClick={() => handleViewEvent(event.id)}>
                        Voir
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <div className="mb-4 inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100">
                  <Ticket className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Aucun billet trouvé</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Aucun billet ne correspond à votre recherche. Essayez de modifier vos filtres ou revenez plus tard.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default TicketsEvents;
