
import React from 'react';
import { CreditCard } from 'lucide-react';

export const PaymentSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Payment Methods</h3>
      <p className="text-white/80 mb-4">
        Par virement bancaire ou postal en précisant nos coordonnées bancaires : 
        <a href="#" className="text-white ml-1 underline">RIB</a>
      </p>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-white rounded-md p-2 flex items-center justify-center">
            <CreditCard className="text-gray-400" size={24} />
          </div>
        ))}
      </div>
      
      <p className="text-xs text-white/70">
        Les clients utilisant un terminal ou une plateforme de paiement Viva Wallet en combinaison avec un compte professionnel et une carte de débit d'entreprise peuvent accepter les paiements avec des frais d'acquisition à 0%.
      </p>
    </div>
  );
};
