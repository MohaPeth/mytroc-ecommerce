
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Ticket, User, Star, AlertCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuantitySelector from '@/components/products/QuantitySelector';

// Mock data for events
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
    sellerRating: 4.8,
    description: 'Ne manquez pas ce concert exceptionnel de jazz avec les meilleurs artistes de la scène parisienne. Un moment unique à partager entre passionnés de musique dans un cadre intimiste.'
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
    sellerRating: 4.5,
    description: 'Le festival incontournable de l\'été avec plus de 20 artistes sur scène durant 3 jours de fête. Accès VIP incluant espace détente, boissons gratuites et rencontres avec les artistes.'
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
    sellerRating: 4.9,
    description: 'Découvrez la magie du Roi Lion dans cette adaptation théâtrale acclamée mondialement. Des costumes impressionnants, une mise en scène époustouflante et des chansons inoubliables.'
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
    sellerRating: 4.7,
    description: 'Soirée de prestige incluant cocktail de bienvenue, dîner gastronomique et spectacle. Tenue de soirée exigée. Une partie des bénéfices sera reversée à des associations caritatives.'
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
    sellerRating: 4.6,
    description: 'Le classique du football français dans une ambiance électrique. Vivez les émotions du plus grand derby français depuis la tribune centrale avec une vue imprenable sur le terrain.'
  },
];

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const foundEvent = mockEvents.find(e => e.id === id);
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (event && quantity < event.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // In a real app, this would be an API call to add to cart
    setTimeout(() => {
      toast({
        title: "Ajouté au panier",
        description: `${quantity} billet(s) pour ${event?.name} ajouté(s) au panier.`,
      });
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleBuyNow = () => {
    setIsDialogOpen(true);
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would be an API call to process payment
    toast({
      title: "Achat en cours de traitement",
      description: "Votre paiement est en cours de traitement. Vous recevrez une confirmation par email.",
    });
    
    setIsDialogOpen(false);
    
    // Redirect to thank you page after a short delay
    setTimeout(() => {
      navigate('/merci');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full">
            <Ticket className="h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Billet non trouvé</h1>
            <p className="text-gray-600 mb-6">Le billet que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate('/billets-evenements')}>
              Retour aux billets
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-6xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl overflow-hidden shadow-subtle">
                <div className="relative aspect-[4/3]">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-mytroc-accent text-white">
                    {event.category}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-2 border-mytroc-primary/30 text-mytroc-primary">
                      {event.ticketType}
                    </Badge>
                    <Badge variant="outline" className="border-mytroc-secondary/30 text-mytroc-secondary">
                      {event.quantity} disponible{event.quantity > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-3 text-mytroc-primary" />
                      <span>{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-3 text-mytroc-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-3 text-mytroc-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2 mr-3">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{event.seller}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">{event.sellerRating}/5</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Contacter
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Prix unitaire:</span>
                        <span className="font-semibold">{event.price} €</span>
                      </div>
                      {quantity > 1 && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">Quantité:</span>
                          <span className="font-semibold">{quantity}</span>
                        </div>
                      )}
                      <Separator className="my-3" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-mytroc-primary">{(event.price * quantity).toFixed(2)} €</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <QuantitySelector
                        quantity={quantity}
                        decreaseQuantity={decreaseQuantity}
                        increaseQuantity={increaseQuantity}
                        handleAddToCart={handleAddToCart}
                        isAddingToCart={isAddingToCart}
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-mytroc-secondary hover:bg-mytroc-secondary/90 text-white"
                      onClick={handleBuyNow}
                    >
                      Acheter maintenant
                    </Button>
                    
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">Information importante</p>
                          <p>Les billets achetés sur notre plateforme sont soumis aux conditions générales de vente. 
                          Vérifiez toujours l'authenticité du billet avant d'acheter.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sélectionnez votre méthode de paiement</DialogTitle>
            <DialogDescription>
              Choisissez comment vous souhaitez payer pour {quantity} billet{quantity > 1 ? 's' : ''} ({(event.price * quantity).toFixed(2)} €)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobicash">Mobicash</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="card">Carte bancaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {paymentMethod === 'mobicash' && (
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="flex items-center text-sm font-medium text-blue-800 mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Paiement via Mobicash
                </p>
                <p className="text-sm text-blue-700">
                  Vous allez recevoir un SMS pour confirmer le paiement.
                </p>
              </div>
            )}
            
            {paymentMethod === 'airtel' && (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="flex items-center text-sm font-medium text-red-800 mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Paiement via Airtel Money
                </p>
                <p className="text-sm text-red-700">
                  Vous allez recevoir un SMS pour confirmer le paiement.
                </p>
              </div>
            )}
            
            {paymentMethod === 'card' && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="flex items-center text-sm font-medium text-green-800 mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Paiement par carte bancaire
                </p>
                <p className="text-sm text-green-700">
                  Vous allez être redirigé vers une page sécurisée pour compléter votre paiement.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handlePaymentSubmit}>
              Procéder au paiement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default TicketDetail;
