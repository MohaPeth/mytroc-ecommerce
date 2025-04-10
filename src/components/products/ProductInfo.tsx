
import React from 'react';
import { Star, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import ReportProductDialog from '@/components/products/ReportProductDialog';
import SellerInfoCard from './SellerInfoCard';
import ProductFeatures from './ProductFeatures';
import ProductSizes from './ProductSizes';
import ProductPrice, { OfferFormValues } from './ProductPrice';
import QuantitySelector from './QuantitySelector';

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    brand: string;
    model: string;
    availability: string;
    rating: number;
    condition: string;
    features: string[];
    sizes: { size: string; selected: boolean }[];
    price: number;
    originalPrice?: number;
    seller: {
      id: string;
      name: string;
      isCertified: boolean;
      isPro: boolean;
      location: string;
      rating: number;
      salesCount: number;
    };
  };
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  handleAddToCart: () => void;
  isAddingToCart: boolean;
  offerForm: UseFormReturn<OfferFormValues>;
  offerDialogOpen: boolean;
  setOfferDialogOpen: (open: boolean) => void;
  handleOfferSubmit: (values: OfferFormValues) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ 
  product,
  quantity,
  decreaseQuantity,
  increaseQuantity,
  handleAddToCart,
  isAddingToCart,
  offerForm,
  offerDialogOpen,
  setOfferDialogOpen,
  handleOfferSubmit
}) => {
  return (
    <div className="lg:w-1/2">
      <div className="mb-2">
        <div className="text-sm text-gray-600 mb-1">Marque : {product.brand}</div>
        <div className="text-sm text-gray-600 mb-1">Modèle : {product.model}</div>
        <div className="text-sm text-gray-600 mb-4">Disponibilité : {product.availability}</div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <ReportProductDialog 
            productId={product.id} 
            productName={product.name}
            sellerName={product.seller.name}
            trigger={
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Flag className="h-4 w-4 mr-1" />
                Signaler
              </Button>
            }
          />
        </div>
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        {/* Seller Information Card */}
        <SellerInfoCard seller={product.seller} />
        
        {/* Product Features */}
        <ProductFeatures features={product.features} condition={product.condition} />
        
        {/* Sizes */}
        <ProductSizes sizes={product.sizes} />
        
        {/* Price */}
        <ProductPrice 
          price={product.price}
          originalPrice={product.originalPrice}
          offerForm={offerForm}
          offerDialogOpen={offerDialogOpen}
          setOfferDialogOpen={setOfferDialogOpen}
          handleOfferSubmit={handleOfferSubmit}
        />
        
        {/* Quantity Selector and Cart Buttons */}
        <QuantitySelector 
          quantity={quantity}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          handleAddToCart={handleAddToCart}
          isAddingToCart={isAddingToCart}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
