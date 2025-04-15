import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShoppingCart, Store, Star, MapPin, CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

// Types pour les produits et vendeurs
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand?: string;
}
interface Seller {
  id: string;
  name: string;
  isPro: boolean;
  isCertified: boolean;
  description: string;
  location: string;
  rating: number;
  salesCount: number;
  joinDate: string;
  banner?: string;
  logo?: string;
}

// Données de test pour le vendeur
const getMockSeller = (id: string): Seller => ({
  id,
  name: 'MarcElectroBoutique',
  isPro: true,
  isCertified: true,
  description: 'Boutique spécialisée dans l\'électronique et les produits high-tech. Nous proposons une large gamme de produits de qualité à des prix compétitifs.',
  location: 'Libreville, Gabon',
  rating: 4.8,
  salesCount: 142,
  joinDate: '2022-03-15',
  banner: '/placeholder.svg',
  logo: '/placeholder.svg'
});

// Données de test pour les produits
const getMockProducts = (): Product[] => [{
  id: 1,
  name: 'TV OLED SMART LG C2 42 (106CM) 4K | WEBOS | CINEMA HDR',
  price: 600.72,
  originalPrice: 900.72,
  image: '/placeholder.svg',
  brand: 'LG'
}, {
  id: 2,
  name: 'Barre de son LG',
  price: 299.99,
  image: '/placeholder.svg',
  brand: 'LG'
}, {
  id: 3,
  name: 'Support mural TV universel',
  price: 49.99,
  image: '/placeholder.svg',
  brand: 'Vogel\'s'
}, {
  id: 4,
  name: 'Câble HDMI 2.1 Ultra HD 8K',
  price: 19.99,
  image: '/placeholder.svg',
  brand: 'Belkin'
}, {
  id: 5,
  name: 'Console PlayStation 5',
  price: 499.99,
  image: '/placeholder.svg',
  brand: 'Sony'
}, {
  id: 6,
  name: 'Manette sans fil DualSense',
  price: 69.99,
  image: '/placeholder.svg',
  brand: 'Sony'
}];
const SellerStore: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('products');
  const {
    addItem
  } = useCart();
  useEffect(() => {
    // Dans une application réelle, ces données viendraient d'une API
    if (id) {
      setSeller(getMockSeller(id));
      setProducts(getMockProducts());
    }
  }, [id]);
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
      brand: product.brand,
      productId: product.id
    });
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`
    });
  };
  if (!seller) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Vendeur non trouvé</h2>
            <p className="mb-6">Le vendeur que vous recherchez n'existe pas ou n'est pas disponible.</p>
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>;
  }

  // Vérification si le vendeur est Pro
  if (!seller.isPro) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-lg p-6">
            <Store className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-4">Boutique non disponible</h2>
            <p className="mb-6">Ce vendeur n'a pas de boutique en ligne. Seuls les vendeurs professionnels peuvent avoir une boutique dédiée.</p>
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-28">
        {/* Bouton de retour */}
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Retour
            </Link>
          </Button>
        </div>
        
        {/* Bannière du vendeur */}
        <div className="relative h-48 md:h-64 bg-gray-200 overflow-hidden">
          <img src={seller.banner || '/placeholder.svg'} alt={`Bannière de ${seller.name}`} className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Informations du vendeur */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Logo du vendeur */}
              <div className="w-24 h-24 rounded-full bg-white shadow-md overflow-hidden flex-shrink-0 border-4 border-white">
                <img src={seller.logo || '/placeholder.svg'} alt={`Logo de ${seller.name}`} className="w-full h-full object-cover" />
              </div>
              
              {/* Informations principales */}
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{seller.name}</h1>
                  {seller.isCertified && <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Certifié</span>
                    </Badge>}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Store className="h-3 w-3" />
                    <span>Vendeur Pro</span>
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{seller.rating}/5 ({seller.salesCount} ventes)</span>
                  </div>
                  <div>
                    <span>Membre depuis {new Date(seller.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{seller.description}</p>
                
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenu principal */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Produits
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                À propos
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Avis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/produit/${product.id}`} className="block">
                      <div className="relative pt-[100%]">
                        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4" />
                        {product.discount && product.discount > 0 && <Badge className="absolute top-2 right-2 bg-mytroc-accent">
                            -{product.discount}%
                          </Badge>}
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-2 text-sm mb-1">{product.name}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold">{product.price.toFixed(2)} €</span>
                          {product.originalPrice && <span className="text-xs text-gray-500 line-through">
                              {product.originalPrice.toFixed(2)} €
                            </span>}
                        </div>
                      </CardContent>
                    </Link>
                    <div className="p-3 pt-0">
                      <motion.div whileTap={{
                    scale: 0.95
                  }}>
                        <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => handleAddToCart(product)}>
                          <ShoppingCart size={14} className="mr-1" />
                          Ajouter
                        </Button>
                      </motion.div>
                    </div>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="mt-4">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">À propos de {seller.name}</h2>
                <div className="prose max-w-none">
                  <p className="mb-4">{seller.description}</p>
                  <p>Notre boutique est spécialisée dans la vente de produits électroniques de qualité. Nous proposons une large gamme de produits pour répondre à tous vos besoins. N'hésitez pas à nous contacter pour plus d'informations.</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Informations</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="font-medium">Localisation:</span>
                      <span>{seller.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-medium">Membre depuis:</span>
                      <span>{new Date(seller.joinDate).toLocaleDateString()}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-medium">Évaluation:</span>
                      <span className="flex items-center">
                        {seller.rating}/5
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-medium">Ventes réalisées:</span>
                      <span>{seller.salesCount}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Avis clients</h2>
                
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun avis pour le moment.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>;
};
export default SellerStore;
