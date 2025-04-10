
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand?: string;
  sellerId?: string;
  sellerName?: string;
  sellerIsPro?: boolean;
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number | string;
  showSellerLink?: boolean;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  currentProductId,
  showSellerLink = true
}) => {
  const { addItem } = useCart();
  
  // Filter out the current product and limit to 4 items
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);
  
  if (relatedProducts.length === 0) return null;
  
  const handleAddToCart = (product: Product) => {
    const cartItem = {
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
    
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`
    });
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
              <div className="flex flex-col gap-2">
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
                
                {showSellerLink && product.sellerId && product.sellerIsPro && (
                  <Link to={`/vendeur/${product.sellerId}`} className="text-xs text-center text-gray-600 hover:text-mytroc-primary flex items-center justify-center gap-1">
                    <Store size={12} />
                    <span>Voir la boutique de {product.sellerName}</span>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
