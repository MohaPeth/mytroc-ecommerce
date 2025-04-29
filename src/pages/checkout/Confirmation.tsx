
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useCheckout, PaymentMethod } from '@/hooks/useCheckout';
import { 
  CreditCard, 
  Smartphone,
  DollarSign,
  AlertCircle 
} from 'lucide-react';

const Confirmation = () => {
  const { toast } = useToast();
  const { checkoutState, updatePaymentDetails, finalizeOrder, loading } = useCheckout();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(checkoutState.paymentMethod || 'card');
  const [mobileNumber, setMobileNumber] = useState(checkoutState.mobileNumber || '');
  const [transactionId, setTransactionId] = useState(checkoutState.transactionId || '');
  const [termsAccepted, setTermsAccepted] = useState(checkoutState.termsAccepted || false);
  const [promoCode, setPromoCode] = useState(checkoutState.promoCode || '');
  
  useEffect(() => {
    // Mettre à jour l'état du checkout lorsque les champs de paiement changent
    updatePaymentDetails({
      paymentMethod,
      mobileNumber,
      transactionId,
      termsAccepted,
      promoCode
    });
  }, [paymentMethod, mobileNumber, transactionId, termsAccepted, promoCode, updatePaymentDetails]);
  
  const handlePayment = () => {
    finalizeOrder();
  };

  // Cette fonction sera appelée lors du clic sur le bouton de téléchargement de facture
  const handleGenerateProformaInvoice = () => {
    toast({
      title: "Génération de devis",
      description: "Le devis au format PDF est en cours de génération."
    });
    
    // Simuler un délai avant le téléchargement
    setTimeout(() => {
      // Importer dynamiquement le générateur de facture pour réduire la taille du bundle initial
      import('@/utils/invoiceGenerator').then(({ downloadInvoice }) => {
        // Données fictives pour le devis
        downloadInvoice({
          invoiceNumber: 'PRO-' + Date.now().toString().slice(-6),
          date: new Date(),
          customerName: `${checkoutState.personalInfo?.firstName} ${checkoutState.personalInfo?.lastName}`,
          customerEmail: checkoutState.personalInfo?.email || '',
          customerPhone: checkoutState.personalInfo?.phone || '',
          customerAddress: checkoutState.deliveryAddress ? 
            `${checkoutState.deliveryAddress.street}, ${checkoutState.deliveryAddress.postalCode} ${checkoutState.deliveryAddress.city}, ${checkoutState.deliveryAddress.country}` : 
            '',
          items: [
            { name: 'T-shirt écologique en coton bio', quantity: 1, price: 2990 },
            { name: 'Gourde réutilisable 500ml', quantity: 2, price: 1990 },
          ],
          subtotal: 6970,
          deliveryFee: paymentMethod === 'home' ? 1000 : 0,
          tax: 1430,
          total: paymentMethod === 'home' ? 9400 : 8400
        });
      });
    }, 500);
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
              {checkoutState.deliveryMethod === 'relay' && checkoutState.relayPoint ? (
                <>
                  <p className="font-medium">{checkoutState.relayPoint.name}</p>
                  <p>{checkoutState.relayPoint.address}</p>
                </>
              ) : (
                checkoutState.deliveryAddress && (
                  <>
                    <p>{checkoutState.deliveryAddress.fullName}</p>
                    <p>{checkoutState.deliveryAddress.street}</p>
                    <p>{checkoutState.deliveryAddress.postalCode} {checkoutState.deliveryAddress.city}, {checkoutState.deliveryAddress.country}</p>
                    <p>{checkoutState.deliveryAddress.phone}</p>
                  </>
                )
              )}
            </div>
            
            {/* Delivery Method Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Méthode de livraison</h3>
              <div className="flex items-center gap-3">
                <img src="/placeholder.svg" alt="DHL" className="h-8" />
                <span>{checkoutState.deliveryMethod === 'relay' ? 'Point Relais' : 'Livraison à domicile'}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Livraison estimée: {checkoutState.deliveryMethod === 'relay' ? '2-3' : '3-5'} jours ouvrables
              </p>
            </div>
            
            {/* Payment Method */}
            <div>
              <h3 className="font-medium text-lg mb-4">Méthode de paiement</h3>
              
              <RadioGroup 
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 mr-1 text-gray-600" />
                    <span>Carte bancaire</span>
                    <div className="flex gap-1">
                      <img src="/placeholder.svg" alt="Visa" className="h-6 w-8" />
                      <img src="/placeholder.svg" alt="Mastercard" className="h-6 w-8" />
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="orange" id="orange" />
                  <Label htmlFor="orange" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 mr-1 text-orange-500" />
                    <span>Orange Money</span>
                    <span className="text-xs text-gray-500">(+221773027085)</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="airtel" id="airtel" />
                  <Label htmlFor="airtel" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 mr-1 text-red-500" />
                    <span>Airtel Money</span>
                    <span className="text-xs text-gray-500">(+221773027086)</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-600" />
                    <span>Paiement à la livraison</span>
                  </Label>
                </div>
              </RadioGroup>
              
              {/* Mobile Money Payment Form */}
              {(paymentMethod === 'orange' || paymentMethod === 'airtel') && (
                <div className="mt-4 border rounded-lg p-4 bg-gray-50 space-y-4">
                  <h4 className="font-medium">Détails du paiement {paymentMethod === 'orange' ? 'Orange Money' : 'Airtel Money'}</h4>
                  
                  <div className="space-y-1">
                    <Label htmlFor="mobile-number">Numéro de téléphone</Label>
                    <Input 
                      id="mobile-number" 
                      placeholder="Ex: +221 77 123 4567" 
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="transaction-id">ID de transaction</Label>
                    <Input 
                      id="transaction-id" 
                      placeholder="Ex: TX123456789" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Instructions de paiement :</p>
                      <ol className="list-decimal ml-5 mt-1 text-yellow-700 space-y-1">
                        <li>Envoyez le montant à {paymentMethod === 'orange' ? '+221773027085' : '+221773027086'}</li>
                        <li>Notez l'ID de transaction reçu par SMS</li>
                        <li>Entrez cet ID dans le champ ci-dessus</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Promo Code */}
              <div className="mt-6">
                <Label htmlFor="promo" className="font-medium">Code promo</Label>
                <div className="flex mt-1">
                  <Input 
                    id="promo" 
                    placeholder="Entrez votre code" 
                    className="rounded-r-none" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button className="rounded-l-none">Appliquer</Button>
                </div>
              </div>
              
              {/* Générer un devis avant le paiement */}
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleGenerateProformaInvoice} 
                  className="w-full"
                >
                  Télécharger un devis
                </Button>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Téléchargez un devis avant de finaliser votre commande
                </p>
              </div>
              
              {/* Terms and Conditions */}
              <div className="mt-6 flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setTermsAccepted(checked);
                    }
                  }}
                />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales de vente</a> et la <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a>
                </Label>
              </div>
            </div>
            
            {/* Final Payment Button */}
            <div className="pt-4">
              <Button 
                onClick={handlePayment} 
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 text-lg"
              >
                {loading ? 'TRAITEMENT EN COURS...' : paymentMethod === 'cod' ? 'CONFIRMER LA COMMANDE' : 'CONFIRMER ET PAYER'}
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
