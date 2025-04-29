
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Truck, MapPin, Home, Check, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCheckout, DeliveryMethod, RelayPoint, DeliveryAddress } from '@/hooks/useCheckout';

const DeliveryDetails = () => {
  const { toast } = useToast();
  const { checkoutState, updateDeliveryDetails } = useCheckout();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(checkoutState.deliveryMethod || 'relay');
  const [relayName, setRelayName] = useState<string>(checkoutState.relayPoint?.name || '');
  const [useMainAddress, setUseMainAddress] = useState(checkoutState.useMainAddress);
  const [isRelayDialogOpen, setIsRelayDialogOpen] = useState(false);
  const [hasValidatedAddress, setHasValidatedAddress] = useState(!!checkoutState.deliveryAddress);
  const [selectedRelayPoint, setSelectedRelayPoint] = useState<RelayPoint | null>(checkoutState.relayPoint);
  const [customAddress, setCustomAddress] = useState<DeliveryAddress | null>(checkoutState.deliveryAddress);
  
  // Charger les données existantes depuis sessionStorage
  useEffect(() => {
    const storedDeliveryMethod = sessionStorage.getItem('deliveryMethod') as DeliveryMethod | null;
    if (storedDeliveryMethod) {
      setDeliveryMethod(storedDeliveryMethod);
    }
    
    const storedRelayPoint = sessionStorage.getItem('relayPoint');
    if (storedRelayPoint) {
      const relayPoint = JSON.parse(storedRelayPoint) as RelayPoint;
      setSelectedRelayPoint(relayPoint);
      setRelayName(relayPoint.name);
    }
    
    const storedDeliveryAddress = sessionStorage.getItem('deliveryAddress');
    if (storedDeliveryAddress) {
      setCustomAddress(JSON.parse(storedDeliveryAddress));
      setHasValidatedAddress(true);
    }
  }, []);
  
  // Dummy data for relay points
  const relayPoints = [
    { id: 1, name: "Point Relais MyTroc - Dakar Centre", address: "123 Avenue Cheikh Anta Diop, Dakar", distance: "0.5 km" },
    { id: 2, name: "Point Relais MyTroc - Librairie Clairafrique", address: "45 Rue Félix Faure, Dakar", distance: "0.8 km" },
    { id: 3, name: "Point Relais MyTroc - Pharmacie du Lion", address: "78 Boulevard de la République, Dakar", distance: "1.2 km" },
    { id: 4, name: "Point Relais MyTroc - Supermarché Exclusif", address: "15 Rue Carnot, Dakar", distance: "1.5 km" },
    { id: 5, name: "Point Relais MyTroc - Pressing Express", address: "33 Avenue Lamine Guèye, Dakar", distance: "2.3 km" },
  ];
  
  const selectRelayPoint = (relayPoint: RelayPoint) => {
    setSelectedRelayPoint(relayPoint);
    setRelayName(relayPoint.name);
    setIsRelayDialogOpen(false);
    toast({
      title: "Point relais sélectionné",
      description: `Vous avez choisi ${relayPoint.name} comme point relais pour votre livraison.`,
      variant: "default",
    });
  };
  
  const validateAddress = () => {
    // Collect form data and validate
    const recipientName = (document.getElementById('recipient-name') as HTMLInputElement).value;
    const recipientPhone = (document.getElementById('recipient-phone') as HTMLInputElement).value;
    const street = (document.getElementById('address-line') as HTMLInputElement).value;
    const city = (document.getElementById('city') as HTMLInputElement).value;
    const region = (document.getElementById('region') as HTMLInputElement).value;
    
    if (!recipientName || !recipientPhone || !street || !city) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    const address: DeliveryAddress = {
      fullName: recipientName,
      street: street,
      city: city,
      postalCode: region,
      country: 'Sénégal',
      phone: recipientPhone
    };
    
    setCustomAddress(address);
    setHasValidatedAddress(true);
    
    toast({
      title: "Adresse validée",
      description: "Votre adresse de livraison a été validée avec succès.",
      variant: "default",
    });
  };
  
  const handleContinue = () => {
    if (deliveryMethod === 'relay' && !selectedRelayPoint) {
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
    
    // Mettre à jour l'état du checkout
    updateDeliveryDetails({
      deliveryMethod,
      relayPoint: selectedRelayPoint,
      deliveryAddress: useMainAddress ? checkoutState.deliveryAddress : customAddress,
      useMainAddress
    });
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
              <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}>
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
                    <p className="mt-2 text-right font-semibold">Gratuit</p>
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
              </RadioGroup>
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
              <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}>
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
                    <p className="mt-2 text-right font-semibold">1000 FCFA</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Livraison à domicile. Votre commande sera livrée à l'adresse que vous indiquez.
                    </p>
                  </div>
                </div>
              </RadioGroup>
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
                        <p className="text-sm text-gray-600">123 Rue des Exemples, Dakar</p>
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
                        <Label htmlFor="region">Région</Label>
                        <Input id="region" placeholder="Région" className="mt-1" />
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
          
          {/* Delivery Information Note */}
          <div className="mt-6 border-t pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800">Informations de livraison</h4>
                {deliveryMethod === 'relay' ? (
                  <p className="text-sm text-blue-700 mt-1">
                    Les colis envoyés en point relais sont généralement disponibles dans un délai de 2 à 3 jours ouvrables. 
                    Vous recevrez une notification par SMS lorsque votre colis sera disponible pour le retrait.
                  </p>
                ) : (
                  <p className="text-sm text-blue-700 mt-1">
                    Les livraisons à domicile sont effectuées du lundi au samedi de 9h à 18h. 
                    Notre livreur vous contactera par téléphone avant la livraison.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Delivery Timing */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Délai de livraison estimé</h3>
            <div className="flex items-center gap-2 text-green-600">
              <Truck className="h-5 w-5" />
              <span className="font-medium">
                {deliveryMethod === 'relay' ? '2-3 jours ouvrables' : '3-5 jours ouvrables'}
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
                onClick={() => selectRelayPoint(point)}
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
