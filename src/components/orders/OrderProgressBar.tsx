
import React from 'react';

interface OrderProgressBarProps {
  status: string;
}

const OrderProgressBar = ({ status }: OrderProgressBarProps) => {
  if (status === 'cancelled') {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Suivi de commande</p>
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`absolute top-0 left-0 h-full ${
            status === 'delivered' 
              ? 'bg-green-500 w-full' 
              : status === 'shipped' 
                ? 'bg-blue-500 w-2/3' 
                : 'bg-amber-500 w-1/3'
          }`}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Commande en cours</span>
          <span>Expédiée</span>
          <span>Livrée</span>
        </div>
      </div>
    </div>
  );
};

export default OrderProgressBar;
