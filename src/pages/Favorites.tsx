
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, ShoppingCart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { favorites, isLoading, removeFromFavorites } = useFavorites();
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.products.id,
      name: product.products.name,
      price: product.products.price,
      quantity: 1,
      image: product.products.images?.[0] || '/placeholder.svg',
      productId: product.products.id
    });
  };

  const getProductImage = (images: any) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    return '/placeholder.svg';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mes favoris</h1>
            <Skeleton className="h-4 w-48" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Mes favoris
          </h1>
          <p className="text-muted-foreground">
            {favorites.length} produit{favorites.length > 1 ? 's' : ''} dans vos favoris
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucun favori pour le moment</h2>
            <p className="text-muted-foreground mb-6">
              Ajoutez des produits à vos favoris pour les retrouver facilement
            </p>
            <Link to="/shop">
              <Button>Découvrir des produits</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <motion.div
                key={favorite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/produit/${favorite.product_id}`} className="block">
                    <div className="relative pt-[100%]">
                      <img 
                        src={getProductImage(favorite.products.images)} 
                        alt={favorite.products.name} 
                        className="absolute inset-0 w-full h-full object-contain p-6" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
                        {favorite.products.name}
                      </h3>
                      <div className="text-xl font-bold">
                        {favorite.products.price.toFixed(2)} €
                      </div>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2"
                      onClick={() => removeFromFavorites(favorite.product_id)}
                    >
                      <Heart className="h-4 w-4 fill-current text-red-500" />
                      Retirer
                    </Button>
                    <Button 
                      className="flex-1 gap-2"
                      onClick={() => handleAddToCart(favorite)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Panier
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
