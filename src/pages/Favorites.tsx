
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import FavoriteButton from '@/components/favorites/FavoriteButton';

const Favorites = () => {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <BaseLayout title="Mes Favoris">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mytroc-primary"></div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Mes Favoris">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Mes Favoris
          </h1>
          <p className="text-gray-600">
            Tous vos produits préférés en un seul endroit
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun favori pour le moment
              </h3>
              <p className="text-gray-500 mb-6">
                Parcourez notre boutique et ajoutez vos produits préférés !
              </p>
              <Link to="/boutique">
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Découvrir la boutique
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    {favorite.product?.images && favorite.product.images.length > 0 && (
                      <img
                        src={favorite.product.images[0]}
                        alt={favorite.product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      <FavoriteButton
                        productId={favorite.product_id}
                        variant="outline"
                        className="bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {favorite.product?.name}
                    </h3>
                    <p className="text-2xl font-bold text-mytroc-primary mb-4">
                      €{favorite.product?.price.toFixed(2)}
                    </p>
                    
                    <div className="flex gap-2">
                      <Link to={`/produit/${favorite.product_id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Voir le produit
                        </Button>
                      </Link>
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Ajouter au panier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Favorites;
