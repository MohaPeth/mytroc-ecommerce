
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Truck, MapPin, Home, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DeliveryDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deliveryMethod, setDeliveryMethod] = useState<'relay' | 'home'>('relay');
  const [relayName, setRelayName] = useState<string>('');
  const [useMainAddress, setUseMainAddress] = useState(true);
  const [isRelayDialogOpen, setIsRelayDialogOpen] = useState(false);
  const [hasValidatedAddress, setHasValidatedAddress] = useState(false);
  
  // Dummy data for relay points
  const relayPoints = [
    { id: 1, name: "Point Relais JNE - Supermarché Central", address: "123 Avenue Principale, 75001 Paris", distance: "0.5 km" },
    { id: 2, name: "Point Relais JNE - Librairie Papillon", address: "45 Rue des Fleurs, 75001 Paris", distance: "0.8 km" },
    { id: 3, name: "Point Relais JNE - Pharmacie du Lion", address: "78 Boulevard Saint-Michel, 75005 Paris", distance: "1.2 km" },
    { id: 4, name: "Point Relais TIKI - Café du Coin", address: "15 Rue de la Paix, 75002 Paris", distance: "1.5 km" },
    { id: 5, name: "Point Relais TIKI - Pressing Express", address: "33 Rue du Commerce, 75015 Paris", distance: "2.3 km" },
  ];
  
  const selectRelayPoint = (name: string) => {
    setRelayName(name);
    setIsRelayDialogOpen(false);
    toast({
      title: "Point relais sélectionné",
      description: `Vous avez choisi ${name} comme point relais pour votre livraison.`,
      variant: "default",
    });
  };
  
  const validateAddress = () => {
    // This would normally validate the address with an API
    setHasValidatedAddress(true);
    toast({
      title: "Adresse validée",
      description: "Votre adresse de livraison a été validée avec succès.",
      variant: "default",
    });
  };
  
  const handleContinue = () => {
    if (deliveryMethod === 'relay' && !relayName) {
      toast({
        title: "Point relais requis",
        description: "Veuillez sélectionner un point relais pour continuer.",
        variant: "destructive",
      });
      return;
    }
    
    if (deliveryMethod === 'home' && !hasValidatedAddress && !useMainAddress) {
      toast({
        title: "Validation requise",
        description: "Veuillez valider votre adresse avant de continuer.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would save the delivery details
    toast({
      title: "Détails de livraison enregistrés",
      description: "Vos préférences de livraison ont été sauvegardées.",
    });
    navigate('/checkout/confirmation');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="space-y-6">
          {/* Delivery Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Point Relais Option */}
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                deliveryMethod === 'relay' 
                  ? 'border-green-500 bg-green-50' 
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
                    <MapPin className="h-5 w-5 text-green-600" />
                    <Label htmlFor="relay" className="font-medium text-lg cursor-pointer">Point Relais</Label>
                  </div>
                  <p className="mt-2 text-right font-semibold">200€</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Livraison en point relais. Sélectionnez un point relais proche de chez vous.
                  </p>
                  
                  {deliveryMethod === 'relay' && (
                    <div className="mt-4">
                      <Button 
                        className="w-full flex items-center gap-2 bg-green-500 hover:bg-green-600" 
                        onClick={() => setIsRelayDialogOpen(true)}
                      >
                        <MapPin className="h-4 w-4" />
                        CHOISIR UN POINT RELAIS
                      </Button>
                      
                      {relayName && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">{relayName}</p>
                              <p className="text-sm text-gray-600">Point sélectionné</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Home Delivery Option */}
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                deliveryMethod === 'home' 
                  ? 'border-green-500 bg-green-50' 
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
                    <Home className="h-5 w-5 text-green-600" />
                    <Label htmlFor="home" className="font-medium text-lg cursor-pointer">Livraison à domicile</Label>
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
            <div className="mt-6 border-t pt-6 animate-fade-in">
              <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="main-address" 
                    checked={useMainAddress}
                    onCheckedChange={(checked) => {
                      if (checked === true || checked === false) {
                        setUseMainAddress(checked);
                        if (checked) setHasValidatedAddress(true);
                        else setHasValidatedAddress(false);
                      }
                    }}
                  />
                  <Label htmlFor="main-address" className="font-medium">
                    Livrer à mon adresse principale
                  </Label>
                </div>
                
                {useMainAddress && (
                  <div className="rounded-lg border p-4 mt-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Adresse principale sélectionnée</p>
                        <p className="text-sm text-gray-600">John Doe</p>
                        <p className="text-sm text-gray-600">123 Rue des Exemples, 75001 Paris</p>
                      </div>
                    </div>
                  </div>
                )}
                
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
                      <div className="md:col-span-2">
                        <Button 
                          onClick={validateAddress}
                          className="w-full mt-2 bg-green-500 hover:bg-green-600"
                          disabled={hasValidatedAddress}
                        >
                          {hasValidatedAddress ? (
                            <span className="flex items-center gap-2">
                              <Check className="h-4 w-4" />
                              ADRESSE VALIDÉE
                            </span>
                          ) : (
                            "CONFIRMER ADRESSE"
                          )}
                        </Button>
                        
                        {!hasValidatedAddress && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
                            <AlertCircle className="h-4 w-4" />
                            <span>Veuillez valider votre adresse avant de continuer</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Delivery Timing */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Délai de livraison estimé</h3>
            <div className="flex items-center gap-2 text-green-600">
              <Truck className="h-5 w-5" />
              <span className="font-medium">
                {deliveryMethod === 'relay' ? '3-5 jours ouvrables' : '1-2 jours ouvrables'}
              </span>
            </div>
          </div>
          
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
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
      
      {/* Relay Point Selection Dialog */}
      <Dialog open={isRelayDialogOpen} onOpenChange={setIsRelayDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choisissez un point relais</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto space-y-3 my-4">
            {relayPoints.map(point => (
              <div 
                key={point.id} 
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => selectRelayPoint(point.name)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{point.name}</h4>
                    <p className="text-sm text-gray-600">{point.address}</p>
                  </div>
                  <div className="text-sm text-gray-500">{point.distance}</div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setIsRelayDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryDetails;
