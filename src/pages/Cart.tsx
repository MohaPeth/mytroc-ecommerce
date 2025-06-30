
import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import SimpleCart from '@/components/cart/SimpleCart';

const Cart = () => {
  return (
    <BaseLayout title="Mon Panier">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mon Panier</h1>
          <p className="text-gray-600">Gérez vos articles et finalisez votre commande</p>
        </div>
        
        <SimpleCart />
      </div>
    </BaseLayout>
  );
};

export default Cart;
