
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data
  const product = {
    id: id,
    name: 'Exemple de produit',
    price: 99.99,
    description: 'Ceci est une description de produit d\'exemple.',
    images: ['/placeholder.svg'],
    seller: {
      id: '123',
      name: 'Vendeur Exemple',
      rating: 4.8
    },
    stock: 10,
    category: 'Électronique'
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const addToCart = () => {
    // Logique pour ajouter au panier
    console.log(`Ajout de ${quantity} ${product.name} au panier`);
    alert(`${quantity} article(s) ajouté(s) au panier`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image du produit */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img src={product.images[0]} alt={product.name} className="w-full h-auto object-contain" />
            </div>
            
            {/* Détails du produit */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-mytroc-primary mb-4">{product.price} €</p>
              
              <div className="mb-4">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="mr-2">Vendeur:</span>
                <a href={`/vendeur/${product.seller.id}`} className="text-mytroc-primary hover:underline">
                  {product.seller.name}
                </a>
                <span className="ml-2 text-yellow-500">★ {product.seller.rating}</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="mr-2">Quantité:</span>
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={decrementQuantity} 
                      className="px-3 py-1 border-r"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={incrementQuantity} 
                      className="px-3 py-1 border-l"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-3 text-sm text-gray-500">
                    {product.stock} en stock
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={addToCart} 
                className="w-full py-3"
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
          
          {/* Tabs pour les détails supplémentaires */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full border-b">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                <TabsTrigger value="reviews">Avis clients</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4">
                <h3 className="text-xl font-semibold mb-2">À propos de ce produit</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac justo vel elit ultrices tincidunt. 
                  Vivamus vel justo eget elit convallis rhoncus. Fusce auctor, nisl vel ultrices tincidunt, nisi nunc 
                  aliquam risus, eget congue nisl nunc vel nunc.
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="py-4">
                <h3 className="text-xl font-semibold mb-2">Spécifications techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Catégorie:</p>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Marque:</p>
                    <p>Exemple</p>
                  </div>
                  <div>
                    <p className="font-semibold">Dimensions:</p>
                    <p>10 x 15 x 5 cm</p>
                  </div>
                  <div>
                    <p className="font-semibold">Poids:</p>
                    <p>0.5 kg</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-4">
                <h3 className="text-xl font-semibold mb-2">Avis clients</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-semibold">Client Satisfait</span>
                    </div>
                    <p>Excellent produit, je recommande vivement!</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-2 font-semibold">Utilisateur Test</span>
                    </div>
                    <p>Bon rapport qualité-prix, livraison rapide.</p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline">
                      Voir tous les avis
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default ProductDetail;
