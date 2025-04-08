
import React from 'react';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cartItems, totalPrice } = useCart();
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-lg w-80 border border-gray-200"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-green-600">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-medium">Produit ajouté au panier</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {cartItems.length > 0 && (
              <div className="text-sm text-gray-600">
                {cartItems.length} article(s) · {totalPrice.toFixed(2)} €
              </div>
            )}
            
            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onClose}
              >
                Continuer
              </Button>
              <Button
                size="sm"
                className="flex-1 gap-1"
                asChild
              >
                <Link to="/cart">
                  Panier <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartPopup;
