import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, CreditCard, ArrowRight, Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/header/Header';
import Footer from '@/components/footer';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items, totalItems, totalPrice, removeItem, updateItemQuantity, clearCart } = useCart();
  const { toast } = useToast();
  
  const shippingCost = 0; // Gratuit
  const total = totalPrice + shippingCost;
  
  const handleRemoveItem = (id: number | string) => {
    removeItem(id);
    
    toast({
      description: "Produit supprimé du panier",
    });
  };
  
  const handleClearCart = () => {
    if (items.length === 0) return;
    
    clearCart();
    
    toast({
      description: "Votre panier a été vidé",
    });
  };
  
  const handleChangeQuantity = (id: number | string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    updateItemQuantity(id, newQuantity);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">{totalItems} {totalItems > 1 ? 'produits' : 'produit'}</p>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-gray-600"
                  onClick={handleClearCart}
                  disabled={items.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  Vider le panier
                </Button>
              </div>
              
              <div className="space-y-4">
                {items.length > 0 ? (
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div 
                        key={item.id} 
                        className="border rounded-lg p-4 flex items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        layout
                      >
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                        
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          {item.brand && <p className="text-sm text-gray-600">{item.brand}</p>}
                          <p className="text-sm">{item.price.toFixed(2)} € {item.originalPrice ? `(au lieu de ${item.originalPrice.toFixed(2)} €)` : ''}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <motion.button 
                            className="w-8 h-8 flex items-center justify-center border rounded-md"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span>{item.quantity}</span>
                          <motion.button 
                            className="w-8 h-8 flex items-center justify-center border rounded-md"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                        
                        <div className="min-w-20 text-right">
                          <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                          <motion.button 
                            className="text-gray-400 hover:text-red-500 mt-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 ml-auto" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Votre panier est vide</h3>
                    <p className="text-gray-500 mb-6">Ajoutez des produits à votre panier pour continuer</p>
                    <Button asChild>
                      <Link to="/boutique">Retour à la boutique</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Récapitulatif de commande</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Livraison</h3>
                  
                  <div className="space-y-3">
                    <div className="border bg-green-50 border-green-100 rounded-lg p-4 flex gap-3 items-start">
                      <Store className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Retrait à la ferme</p>
                        <p className="text-sm text-gray-600">Récupérez votre commande directement chez le producteur</p>
                      </div>
                      <Badge variant="outline" className="bg-white">Gratuit</Badge>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex gap-3 items-start">
                      <Truck className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Livraison à domicile</p>
                        <p className="text-sm text-gray-600">Livraison à votre adresse sous 24-48h</p>
                      </div>
                      <Badge variant="outline" className="bg-white">4.90 €</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between py-2">
                    <span>Sous-total</span>
                    <span className="font-medium">{totalPrice.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span>Frais de livraison</span>
                    <span className="font-medium">Gratuit</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-t mt-2 pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">{total.toFixed(2)} €</span>
                  </div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 flex gap-2 items-center justify-center py-6 font-medium"
                    disabled={items.length === 0}
                    asChild
                  >
                    <Link to="/checkout">
                      <CreditCard className="h-5 w-5" />
                      Procéder au paiement
                    </Link>
                  </Button>
                </motion.div>
                
                <Link to="/boutique" className="flex items-center justify-center gap-1 mt-4 text-green-600 hover:underline">
                  Continuer mes achats
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
