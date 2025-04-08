import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface CartPopupProps {
  show: boolean;
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ show, onClose }) => {
  const { items, totalItems, totalPrice } = useCart();
  
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed top-20 right-4 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} />
              <span className="font-medium">Panier</span>
              <Badge variant="outline" className="ml-1">
                {totalItems} {totalItems > 1 ? 'articles' : 'article'}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="max-h-60 overflow-y-auto p-3 space-y-3">
            {items.length > 0 ? (
              items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">Votre panier est vide</p>
            )}
            
            {items.length > 3 && (
              <p className="text-xs text-center text-gray-500">
                + {items.length - 3} autres produits
              </p>
            )}
          </div>
          
          {items.length > 0 && (
            <>
              <div className="p-3 border-t border-b bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">{totalPrice.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="p-3 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1" 
                  asChild
                >
                  <Link to="/panier" onClick={onClose}>
                    Voir le panier
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link to="/checkout" onClick={onClose}>
                    Commander
                  </Link>
                </Button>
              </div>
            </>
          )}
          
          <Link 
            to="/boutique" 
            className="block p-3 text-sm text-center text-mytroc-primary hover:underline border-t"
            onClick={onClose}
          >
            Continuer mes achats
            <ChevronRight size={14} className="inline ml-1" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartPopup;
