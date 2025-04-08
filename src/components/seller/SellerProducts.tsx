
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand: string;
  sellerId: string;
  condition: string;
  rating: number;
  reviewsCount: number;
}

interface SellerProductsProps {
  products: Product[];
}

const SellerProducts: React.FC<SellerProductsProps> = ({ products }) => {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
      brand: product.brand,
      productId: product.id,
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
        <p className="text-gray-500">
          Aucun produit ne correspond à votre recherche ou ce vendeur n'a pas encore de produits.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <Link to={`/produit/${product.id}`} className="block">
            <div className="relative pt-[100%]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              {product.discount && product.discount > 0 && (
                <Badge className="absolute top-2 right-2 bg-mytroc-accent">
                  -{product.discount}%
                </Badge>
              )}
              <Badge 
                variant="outline" 
                className={`absolute bottom-2 left-2 ${
                  product.condition === 'Neuf' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {product.condition}
              </Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium line-clamp-2 text-sm mb-1">{product.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-bold">{product.price.toFixed(2)} €</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="mx-1">•</span>
                <span>{product.reviewsCount} avis</span>
              </div>
            </CardContent>
          </Link>
          <div className="p-3 pt-0">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart size={14} className="mr-1" />
                Ajouter au panier
              </Button>
            </motion.div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SellerProducts;
