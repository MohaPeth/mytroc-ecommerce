
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { Toaster } from '@/components/ui/toaster';

const Checkout = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in">
        <CheckoutSteps />
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Checkout;
