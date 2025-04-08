
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export interface RelatedProductsProps {
  products: {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
  }[];
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }) => {
  // Filter out the current product if it's in the related products list
  const filteredProducts = products.filter(product => product.id.toString() !== currentProductId);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <Link to={`/produit/${product.id}`} key={product.id}>
            <Card className="h-full transition-transform hover:scale-105">
              <CardContent className="p-4">
                <div className="aspect-square rounded-md overflow-hidden mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-sm font-medium mb-1 truncate">{product.name}</div>
                <div className="text-xs text-gray-500 mb-2">{product.brand}</div>
                <div className="font-bold">{product.price.toFixed(2)} €</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
