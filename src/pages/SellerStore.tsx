
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, CheckCircle2, MessageSquare, Calendar, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock sellers data - in a real app, this would come from an API
const sellersData = {
  's1': {
    id: 's1',
    name: 'MarcElectroBoutique',
    isCertified: true,
    location: 'Libreville, Gabon',
    rating: 4.8,
    salesCount: 142,
    memberSince: '2022-01-15',
    description: 'Spécialiste en produits électroniques de qualité. Nous proposons une large gamme de téléviseurs, smartphones et accessoires informatiques au meilleur prix.',
    products: [
      {
        id: 1,
        name: 'TV OLED SMART LG C2 42 (106CM) 4K',
        price: 600.72,
        image: '/placeholder.svg',
        condition: 'Neuf'
      },
      {
        id: 2,
        name: 'Barre de son LG',
        price: 299.99,
        image: '/placeholder.svg',
        condition: 'Neuf'
      },
      {
        id: 3,
        name: 'Support mural TV universel',
        price: 49.99,
        image: '/placeholder.svg',
        condition: 'Neuf'
      }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Jean Dupont',
        rating: 5,
        comment: 'Excellent vendeur, livraison rapide et produit conforme.',
        date: '2023-06-10'
      },
      {
        id: 'r2',
        userName: 'Marie Durand',
        rating: 4,
        comment: 'Bon vendeur, communication efficace.',
        date: '2023-05-22'
      }
    ]
  },
  's2': {
    id: 's2',
    name: 'Sophie Mode Gabon',
    isCertified: true,
    location: 'Port-Gentil, Gabon',
    rating: 4.6,
    salesCount: 89,
    memberSince: '2022-03-20',
    description: 'Boutique de vêtements et accessoires de mode. Nous proposons les dernières tendances à des prix accessibles.',
    products: [
      {
        id: 4,
        name: 'Robe d\'été fleurie',
        price: 45.99,
        image: '/placeholder.svg',
        condition: 'Neuf'
      },
      {
        id: 5,
        name: 'Sac à main en cuir',
        price: 79.99,
        image: '/placeholder.svg',
        condition: 'Neuf'
      }
    ],
    reviews: [
      {
        id: 'r3',
        userName: 'Pierre Martin',
        rating: 5,
        comment: 'Produits de grande qualité, je recommande!',
        date: '2023-04-15'
      }
    ]
  }
};

const SellerStore = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('products');

  // In a real app, we would fetch the seller data based on the ID
  const seller = sellersData[id as keyof typeof sellersData];

  useEffect(() => {
    // Redirect if seller not found or not certified
    if (!seller) {
      toast({
        title: "Boutique introuvable",
        description: "Cette boutique n'existe pas ou n'est plus disponible.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    if (!seller.isCertified) {
      toast({
        title: "Accès limité",
        description: "Seuls les vendeurs certifiés peuvent avoir une boutique.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [seller, navigate, toast]);

  if (!seller || !seller.isCertified) {
    return null;
  }

  const handleContactSeller = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé au vendeur.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          {/* Seller Profile Section */}
          <Card className="mb-8 border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Seller Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                    {seller.name.charAt(0)}
                  </div>
                </div>
                
                {/* Seller Info */}
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <h1 className="text-2xl font-bold mr-2">{seller.name}</h1>
                    {seller.isCertified && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Certifié</span>
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{seller.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{seller.rating}/5</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1 text-gray-600" />
                      <span>{seller.salesCount} ventes</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-600" />
                      <span>Membre depuis {new Date(seller.memberSince).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{seller.description}</p>
                  
                  <Button 
                    variant="default" 
                    className="flex items-center gap-2"
                    onClick={handleContactSeller}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Contacter le vendeur
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs for Products and Reviews */}
          <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Produits ({seller.products.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Avis ({seller.reviews.length})
              </TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {seller.products.map((product) => (
                  <Card key={product.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">{product.condition}</Badge>
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-2 h-12">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/produit/${product.id}`)}
                        >
                          Voir détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {seller.reviews.map((review) => (
                  <Card key={review.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium">{review.userName}</span>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default SellerStore;
