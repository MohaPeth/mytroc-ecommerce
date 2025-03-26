import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, CreditCard, ArrowRight, Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/footer';
const Cart = () => {
  const cartItems = [{
    id: 1,
    name: 'Fraises de Saison',
    producer: 'Ferme des Quatre Saisons',
    price: 4.50,
    priceInfo: '/ barquette 250g',
    quantity: 2,
    total: 9.00,
    image: '/placeholder.svg'
  }, {
    id: 2,
    name: 'Fromage de Chèvre Frais',
    producer: 'La Fromagerie Alpine',
    price: 3.80,
    priceInfo: '/ pièce',
    quantity: 1,
    total: 3.80,
    image: '/placeholder.svg'
  }, {
    id: 3,
    name: 'Tomates Anciennes',
    producer: 'Ferme des Quatre Saisons',
    price: 5.20,
    priceInfo: '/ kg',
    quantity: 1,
    total: 5.20,
    image: '/placeholder.svg'
  }];
  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const shippingCost = 0; // Gratuit
  const total = subtotal + shippingCost;
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 py-[83px]">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">{cartItems.length} produits</p>
                <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                  <Trash2 className="h-4 w-4" />
                  Vider le panier
                </Button>
              </div>
              
              <div className="space-y-4 py-0">
                {cartItems.map(item => <div key={item.id} className="border rounded-lg p-4 flex items-center gap-4 my-[10px] py-[22px] px-[7px] mx-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.producer}</p>
                      <p className="text-sm">{item.price.toFixed(2)} € {item.priceInfo}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 flex items-center justify-center border rounded-md">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button className="w-8 h-8 flex items-center justify-center border rounded-md">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="min-w-20 text-right">
                      <p className="font-medium">{item.total.toFixed(2)} €</p>
                      <button className="text-gray-400 hover:text-gray-600 mt-2">
                        <Trash2 className="h-4 w-4 ml-auto" />
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 py-[90px]">
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
                    <span className="font-medium">{subtotal.toFixed(2)} €</span>
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
                
                <Button className="w-full bg-green-600 hover:bg-green-700 flex gap-2 items-center justify-center py-6 font-medium">
                  <CreditCard className="h-5 w-5" />
                  Procéder au paiement
                </Button>
                
                <Link to="/boutique" className="flex items-center justify-center gap-1 mt-4 text-green-600 hover:underline">
                  Continuer mes achats
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-action Section */}
        
      </main>
      <Footer />
    </div>;
};
export default Cart;