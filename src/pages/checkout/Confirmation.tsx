
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Confirmation = () => {
  const navigate = useNavigate();
  
  const handlePayment = () => {
    // Process payment logic would go here
    // Then redirect to success page
    navigate('/');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-6">Confirmation de commande</h2>
          
          <div className="space-y-8">
            {/* Delivery Address Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Adresse de livraison</h3>
              <p>John Doe</p>
              <p>123 Rue des Exemples</p>
              <p>75001 Paris, France</p>
              <p>+33 6 12 34 56 78</p>
            </div>
            
            {/* Delivery Method Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Méthode de livraison</h3>
              <div className="flex items-center gap-3">
                <img src="/placeholder.svg" alt="DHL" className="h-8" />
                <span>DHL - Livraison à domicile</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Livraison estimée: 3-5 jours ouvrables</p>
            </div>
            
            {/* Payment Method */}
            <div>
              <h3 className="font-medium text-lg mb-4">Méthode de paiement</h3>
              
              <RadioGroup defaultValue="card" className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <span>Carte bancaire</span>
                    <div className="flex gap-1">
                      <img src="/placeholder.svg" alt="Visa" className="h-6 w-8" />
                      <img src="/placeholder.svg" alt="Mastercard" className="h-6 w-8" />
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2">
                    <span>PayPal</span>
                    <img src="/placeholder.svg" alt="PayPal" className="h-6 w-8" />
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Virement bancaire</Label>
                </div>
              </RadioGroup>
              
              {/* Promo Code */}
              <div className="mt-6">
                <Label htmlFor="promo" className="font-medium">Code promo</Label>
                <div className="flex mt-1">
                  <Input id="promo" placeholder="Entrez votre code" className="rounded-r-none" />
                  <Button className="rounded-l-none">Appliquer</Button>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="mt-6 flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales de vente</a> et la <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a>
                </Label>
              </div>
            </div>
            
            {/* Final Payment Button */}
            <div className="pt-4">
              <Button 
                onClick={handlePayment} 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 text-lg"
              >
                CONFIRMER ET PAYER
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <OrderSummary showDiscount={true} />
      </div>
    </div>
  );
};

export default Confirmation;
