
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, MessageSquare, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  handleAddToCart: () => void;
  isAddingToCart: boolean;
  isEventTicket?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  decreaseQuantity,
  increaseQuantity,
  handleAddToCart,
  isAddingToCart,
  isEventTicket = false
}) => {
  return <>
      {/* Quantity and Add to Cart */}
      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-center border border-gray-300 rounded-md w-32">
          <button className="w-10 h-10 flex items-center justify-center text-gray-600" onClick={decreaseQuantity}>
            <Minus size={16} />
          </button>
          <input type="text" value={quantity} readOnly className="w-12 h-10 text-center border-x border-gray-300" />
          <button className="w-10 h-10 flex items-center justify-center text-gray-600" onClick={increaseQuantity}>
            <Plus size={16} />
          </button>
        </div>
        
        <motion.div whileTap={{
        scale: 0.95
      }} className="flex-1">
          <Button variant="outline" className="border-mytroc-primary text-mytroc-primary hover:bg-mytroc-primary/10 w-full" onClick={handleAddToCart} disabled={isAddingToCart}>
            {isEventTicket ? <Ticket className="mr-2" size={18} /> : <ShoppingCart className="mr-2" size={18} />}
            {isEventTicket ? "Acheter le billet" : "Ajouter au panier"}
          </Button>
        </motion.div>
      </div>

      {/* Contact Seller Button */}
      <div className="mt-4">
        <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100">
          <MessageSquare className="mr-2" size={18} />
          Contacter le vendeur
        </Button>
      </div>
    </>;
};

export default QuantitySelector;
