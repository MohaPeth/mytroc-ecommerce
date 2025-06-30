
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const SimpleCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'iPhone 13 Pro',
      price: 650,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200'
    },
    {
      id: '2', 
      name: 'Veste en cuir vintage',
      price: 89.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200'
    }
  ]);

  const { createOrder, creating } = useOrders();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des produits à votre panier avant de commander.",
        variant: "destructive"
      });
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      delivery_method: 'home' as const,
      payment_method: 'card',
      delivery_address: {
        street: '123 Rue Example',
        city: 'Paris',
        postal_code: '75001',
        country: 'France'
      }
    };

    const order = await createOrder(orderData);
    if (order) {
      setCartItems([]); // Clear cart after successful order
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Votre panier est vide</h3>
          <p className="text-gray-500 text-center">Découvrez nos produits et ajoutez-les à votre panier !</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Mon Panier ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              )}
              
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-lg font-bold text-mytroc-primary">
                  €{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <Badge variant="outline" className="px-3 py-1">
                  {item.quantity}
                </Badge>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Sous-total:</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison:</span>
              <span>€{deliveryFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-mytroc-primary">€{total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            onClick={handleCheckout}
            disabled={creating}
            className="w-full mt-4"
            size="lg"
          >
            {creating ? 'Commande en cours...' : 'Passer la commande'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleCart;
