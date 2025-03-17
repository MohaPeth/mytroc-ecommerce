
import React from 'react';

type OrderSummaryProps = {
  showDiscount?: boolean;
};

export const OrderSummary = ({ showDiscount = false }: OrderSummaryProps) => {
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
            <div className="text-sm text-gray-500">1 × IDR 100.000</div>
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
            <div className="text-sm text-gray-500">1 × IDR 100.000</div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between py-2">
            <span>Sous-total</span>
            <span className="font-medium">€ 1200</span>
          </div>
          
          {showDiscount && (
            <div className="flex justify-between py-2 text-green-600">
              <span>Réduction</span>
              <span>-€ 100</span>
            </div>
          )}
          
          <div className="flex justify-between py-2">
            <span>Total</span>
            <span className="font-bold text-xl">€ 1100</span>
          </div>
        </div>
      </div>
    </div>
  );
};
