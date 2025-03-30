
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart, CartItem } from '@/hooks/useCart';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand?: string;
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number | string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }) => {
  const { addItem } = useCart();
  
  // Filter out the current product and limit to 4 items
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);
  
  if (relatedProducts.length === 0) return null;
  
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
      brand: product.brand,
      productId: product.id,
    };
    
    addItem(cartItem);
  };
  
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Produits complémentaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
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
                  Ajouter
                </Button>
              </motion.div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
