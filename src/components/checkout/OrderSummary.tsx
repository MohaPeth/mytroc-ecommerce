
import React from 'react';
import { useLocation } from 'react-router-dom';

type OrderSummaryProps = {
  showDiscount?: boolean;
};

export const OrderSummary = ({ showDiscount = false }: OrderSummaryProps) => {
  const location = useLocation();
  const isDeliveryPage = location.pathname.includes('/checkout/livraison');
  const isConfirmationPage = location.pathname.includes('/checkout/confirmation');
  
  // Check if we're on the delivery details page to determine free relay or paid home delivery
  const deliveryMethod = sessionStorage.getItem('deliveryMethod') || 'relay';
  const deliveryFee = deliveryMethod === 'home' ? '1000 FCFA' : 'Gratuit';
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">BON DE COMMANDE</h2>
      
      <div className="space-y-4">
        {/* Product Item */}
        <div className="flex gap-4">
          <img 
            src="/placeholder.svg" 
            alt="T-Shirt" 
            className="w-20 h-20 object-cover rounded" 
          />
          <div className="flex-1">
            <h3 className="font-medium">WHITE CASUAL T-SHIRT</h3>
            <div className="text-sm text-gray-500">1 × 25000 FCFA</div>
            <div className="text-sm mt-1">Please recheck the size before send to me :)</div>
          </div>
        </div>
        
        {/* Another Product Item */}
        <div className="flex gap-4">
          <img 
            src="/placeholder.svg" 
            alt="T-Shirt" 
            className="w-20 h-20 object-cover rounded" 
          />
          <div className="flex-1">
            <h3 className="font-medium">WHITE CASUAL T-SHIRT</h3>
            <div className="text-sm text-gray-500">1 × 20000 FCFA</div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between py-2">
            <span>Sous-total</span>
            <span className="font-medium">45000 FCFA</span>
          </div>
          
          {(isDeliveryPage || isConfirmationPage) && (
            <div className="flex justify-between py-2">
              <span>Livraison</span>
              <span className={deliveryMethod === 'home' ? 'font-medium' : 'text-green-600 font-medium'}>
                {deliveryFee}
              </span>
            </div>
          )}
          
          {showDiscount && (
            <div className="flex justify-between py-2 text-green-600">
              <span>Réduction</span>
              <span>-5000 FCFA</span>
            </div>
          )}
          
          <div className="flex justify-between py-2">
            <span>Total</span>
            <span className="font-bold text-xl">
              {deliveryMethod === 'home' && (isDeliveryPage || isConfirmationPage) 
                ? '46000 FCFA' 
                : '45000 FCFA'}
            </span>
          </div>
          
          {isConfirmationPage && (
            <div className="bg-gray-100 rounded-md p-3 mt-3">
              <h4 className="text-sm font-medium">Méthode de paiement sélectionnée:</h4>
              <p className="text-xs text-gray-600 mt-1">L'option de paiement sera appliquée lors de la confirmation de la commande.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
