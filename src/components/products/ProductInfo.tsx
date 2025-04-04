import React, { useState } from 'react';
import { Star, ShoppingCart, Minus, Plus, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import OfferDialog from './OfferDialog';

interface Size {
  size: string;
  selected: boolean;
}

interface ProductInfoProps {
  product: {
    id: number | string;
    name: string;
    brand: string;
    model: string;
    availability: string;
    price: number;
    originalPrice?: number;
    rating: number;
    features: string[];
    sizes?: Size[];
    images: string[];
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Add product to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      image: product.images[0],
      brand: product.brand,
      productId: product.id
    });

    // Show animation and cart popup
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowCartPopup(true);
      setQuantity(1); // Reset quantity after adding to cart
    }, 500);
  };

  // Function to render stars for ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">Marque : {product.brand}</div>
      <div className="text-sm text-gray-600 mb-1">Modèle : {product.model}</div>
      <div className="text-sm text-gray-600 mb-4">Disponibilité : {product.availability}</div>
      
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        {renderStars(product.rating)}
      </div>
      
      <ul className="space-y-2 mb-6">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-mytroc-primary mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Sizes */}
      {product.sizes && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {product.sizes.map((size, index) => (
            <div 
              key={index} 
              className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${size.selected ? 'border-mytroc-primary bg-mytroc-primary/10 text-mytroc-primary' : 'border-gray-200 hover:border-gray-300'}`}
            >
              {size.size}
            </div>
          ))}
        </div>
      )}
      
      {/* Price */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 uppercase mb-1">EUR (TOUTES TAXES COMPRISES)</div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">{product.price.toFixed(2)} €</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
        </div>
        
        {/* Make Offer button */}
        <OfferDialog 
          open={offerDialogOpen} 
          onOpenChange={setOfferDialogOpen} 
          onSuccess={() => setOfferSuccess(true)}
        />
      </div>
      
      {/* Quantity and Add to Cart */}
      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-center border border-gray-300 rounded-md w-32">
          <button 
            className="w-10 h-10 flex items-center justify-center text-gray-600" 
            onClick={decreaseQuantity}
          >
            <Minus size={16} />
          </button>
          <input 
            type="text" 
            value={quantity} 
            readOnly 
            className="w-12 h-10 text-center border-x border-gray-300" 
          />
          <button 
            className="w-10 h-10 flex items-center justify-center text-gray-600" 
            onClick={increaseQuantity}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <motion.div 
          whileTap={{ scale: 0.95 }} 
          className="flex-1"
        >
          <Button 
            variant="negotiation" 
            className="w-full" 
            onClick={() => setOfferDialogOpen(true)}
          >
            <DollarSign className="mr-2" size={18} />
            Faire une offre
          </Button>
        </motion.div>
        
        <motion.div 
          whileTap={{ scale: 0.95 }} 
          className="flex-1" 
          animate={isAddingToCart ? { scale: [1, 1.1, 1], transition: { duration: 0.5 } } : {}}
        >
          <Button 
            variant="outline" 
            className="border-mytroc-primary text-mytroc-primary hover:bg-mytroc-primary/10 w-full" 
            onClick={handleAddToCart} 
            disabled={isAddingToCart}
          >
            <ShoppingCart className="mr-2" size={18} />
            Ajouter au panier
          </Button>
        </motion.div>
      </div>

      {/* Handle cart popup visibility */}
      {showCartPopup && (
        <React.Fragment></React.Fragment>
      )}
      
      {/* Handle offer success visibility */}
      {offerSuccess && (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default ProductInfo;
