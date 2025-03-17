
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderSummary } from '@/components/checkout/OrderSummary';

const DeliveryDetails = () => {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<'relay' | 'home'>('relay');
  const [useMainAddress, setUseMainAddress] = useState(true);
  
  const handleContinue = () => {
    // Here you would save the delivery details
    navigate('/checkout/confirmation');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">LIVRAISON</h2>
          
          <div className="space-y-6">
            {/* Delivery Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* JNE Option */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  deliveryMethod === 'relay' 
                    ? 'border-green-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setDeliveryMethod('relay')}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem 
                    value="relay" 
                    id="relay" 
                    checked={deliveryMethod === 'relay'}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <img src="/placeholder.svg" alt="JNE" className="h-8" />
                      <Label htmlFor="relay" className="font-medium text-lg cursor-pointer">JNE</Label>
                    </div>
                    <p className="mt-2 text-right font-semibold">200€</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Livraison en point relais. Sélectionnez un point relais proche de chez vous.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* TIKI Option */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  deliveryMethod === 'relay' && false
                    ? 'border-green-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem 
                    value="tiki" 
                    id="tiki" 
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <img src="/placeholder.svg" alt="TIKI" className="h-8" />
                      <Label htmlFor="tiki" className="font-medium text-lg cursor-pointer">TIKI</Label>
                    </div>
                    <p className="mt-2 text-right font-semibold">140€</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Livraison en point relais. Sélectionnez un point relais proche de chez vous.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* DHL Option */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  deliveryMethod === 'home' 
                    ? 'border-green-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setDeliveryMethod('home')}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem 
                    value="home" 
                    id="home" 
                    checked={deliveryMethod === 'home'}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <img src="/placeholder.svg" alt="DHL" className="h-8" />
                      <Label htmlFor="home" className="font-medium text-lg cursor-pointer">DHL</Label>
                    </div>
                    <p className="mt-2 text-right font-semibold">500€</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Livraison à domicile. Votre commande sera livrée à l'adresse que vous indiquez.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Home Delivery Address Section */}
            {deliveryMethod === 'home' && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="main-address" 
                      checked={useMainAddress}
                      onCheckedChange={(checked) => {
                        if (checked === true || checked === false) {
                          setUseMainAddress(checked);
                        }
                      }}
                    />
                    <Label htmlFor="main-address" className="font-medium">
                      Livrer à mon adresse principale
                    </Label>
                  </div>
                  
                  {!useMainAddress && (
                    <div className="rounded-lg border p-4 mt-4">
                      <h4 className="font-medium mb-4">Ajouter une nouvelle adresse</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="recipient-name">Nom du destinataire</Label>
                          <Input id="recipient-name" placeholder="Nom et prénom" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="recipient-phone">Téléphone</Label>
                          <Input id="recipient-phone" placeholder="Numéro de téléphone" className="mt-1" />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address-line">Adresse</Label>
                          <Input id="address-line" placeholder="Numéro et nom de rue" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="city">Ville</Label>
                          <Input id="city" placeholder="Ville" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="postal-code">Code Postal</Label>
                          <Input id="postal-code" placeholder="Code postal" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Continue Button */}
            <div className="flex justify-end mt-8">
              <Button 
                onClick={handleContinue} 
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-8"
              >
                CONTINUER
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
};

export default DeliveryDetails;
