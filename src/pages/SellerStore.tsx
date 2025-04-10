
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MapPin, Star, Store, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SellerProducts from '@/components/seller/SellerProducts';
import SellerInfo from '@/components/seller/SellerInfo';

// Mock data for seller - in a real app, this would come from an API
const sellerData = {
  s1: {
    id: 's1',
    name: 'MarcElectroBoutique',
    description: 'Spécialiste en produits électroniques reconditionnés et neufs. Nous proposons une gamme complète d\'appareils électroniques de qualité à des prix compétitifs.',
    logo: '/placeholder.svg',
    coverImage: '/placeholder.svg',
    isCertified: true,
    isPro: true,
    location: 'Libreville, Gabon',
    rating: 4.8,
    reviewsCount: 156,
    salesCount: 742,
    joinDate: '2021-06-15',
    categories: ['Électronique', 'Informatique', 'Audio', 'TV & Vidéo'],
    contactEmail: 'contact@marcelectro.com',
    phone: '+241 74 85 96 32',
    socialMedia: {
      facebook: 'marcelectroboutique',
      instagram: 'marcelectro',
      twitter: 'marcelectro'
    }
  },
  seller: {
    id: 'seller',
    name: 'Boutique de Test',
    description: 'Boutique de test pour démonstration de la fonctionnalité vendeur.',
    logo: '/placeholder.svg',
    coverImage: '/placeholder.svg',
    isCertified: true,
    isPro: true,
    location: 'Paris, France',
    rating: 4.6,
    reviewsCount: 87,
    salesCount: 345,
    joinDate: '2022-01-01',
    categories: ['Test', 'Démo', 'Exemple'],
    contactEmail: 'contact@boutique-test.com',
    phone: '+33 1 23 45 67 89',
    socialMedia: {
      facebook: 'boutiquetest',
      instagram: 'boutiquetest',
      twitter: 'boutiquetest'
    }
  }
};

// Mock product data
const productsData = [
  {
    id: 1,
    name: 'TV OLED SMART LG C2 42 (106CM) 4K | WEBOS | CINEMA HDR',
    price: 600.72,
    originalPrice: 900.72,
    discount: 33,
    image: '/placeholder.svg',
    brand: 'LG',
    sellerId: 's1',
    condition: 'Reconditionné',
    rating: 4.5,
    reviewsCount: 18
  },
  {
    id: 2,
    name: 'Barre de son LG',
    price: 299.99,
    image: '/placeholder.svg',
    brand: 'LG',
    sellerId: 's1',
    condition: 'Neuf',
    rating: 4.2,
    reviewsCount: 7
  },
  {
    id: 3,
    name: 'Smartphone Galaxy S21',
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    image: '/placeholder.svg',
    brand: 'Samsung',
    sellerId: 'seller',
    condition: 'Neuf',
    rating: 4.7,
    reviewsCount: 32
  },
  {
    id: 4,
    name: 'Écouteurs sans fil Galaxy Buds',
    price: 129.99,
    image: '/placeholder.svg',
    brand: 'Samsung',
    sellerId: 'seller',
    condition: 'Neuf',
    rating: 4.4,
    reviewsCount: 18
  },
  {
    id: 5,
    name: 'Ordinateur portable XPS 13',
    price: 1299.99,
    image: '/placeholder.svg',
    brand: 'Dell',
    sellerId: 'seller',
    condition: 'Reconditionné',
    rating: 4.8,
    reviewsCount: 24
  }
];

const SellerStore = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('products');

  // Find the seller data based on the URL parameter
  const seller = sellerData[sellerId as keyof typeof sellerData] || null;

  // Filter products by seller
  const sellerProducts = productsData.filter(
    product => product.sellerId === sellerId && 
    (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get unique categories from seller products
  const productCategories = ['all', ...new Set(sellerProducts.map(product => product.brand))];

  // Filter products by selected category
  const filteredProducts = activeCategory === 'all' 
    ? sellerProducts 
    : sellerProducts.filter(product => product.brand === activeCategory);

  if (!seller) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 lg:pt-36">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Vendeur non trouvé</h1>
            <p className="text-gray-600 mb-6">
              Désolé, nous n'avons pas pu trouver les informations de ce vendeur.
            </p>
            <Button asChild>
              <a href="/boutique">Retourner à la boutique</a>
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
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div>
          {/* Store Cover Image */}
          <div 
            className="h-48 md:h-60 lg:h-80 w-full bg-gray-200 relative bg-center bg-cover"
            style={{ backgroundImage: `url(${seller.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Store Info */}
          <div className="container mx-auto px-4 -mt-16 relative z-10">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-white bg-white shadow-md overflow-hidden">
                      <img 
                        src={seller.logo} 
                        alt={seller.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h1 className="text-2xl font-bold">{seller.name}</h1>
                          {seller.isPro && (
                            <Badge className="bg-blue-500 hover:bg-blue-600">Pro</Badge>
                          )}
                          {seller.isCertified && (
                            <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-600">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Certifié</span>
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{seller.location}</span>
                        </div>
                        
                        <div className="flex items-center mt-2 gap-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{seller.rating}/5</span>
                            <span className="text-gray-500 ml-1">({seller.reviewsCount} avis)</span>
                          </div>
                          <div className="text-gray-600">
                            {seller.salesCount} ventes
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button>
                          Contacter
                        </Button>
                        <Button variant="outline">
                          Suivre
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-600">{seller.description}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs for Products and Info */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList>
                <TabsTrigger value="products">
                  Produits ({sellerProducts.length})
                </TabsTrigger>
                <TabsTrigger value="info">
                  Informations
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  Avis clients
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="mt-6">
                {/* Search and category filters */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      placeholder="Rechercher un produit..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex overflow-x-auto pb-2 gap-2">
                    {productCategories.map(category => (
                      <Button 
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                        className="whitespace-nowrap"
                      >
                        {category === 'all' ? 'Tous les produits' : category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Products Grid */}
                <SellerProducts products={filteredProducts} />
              </TabsContent>
              
              <TabsContent value="info" className="mt-6">
                <SellerInfo seller={seller} />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="text-center py-12">
                  <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Avis clients à venir</h3>
                  <p className="text-gray-500">
                    Cette section est en cours de développement et sera bientôt disponible.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerStore;
