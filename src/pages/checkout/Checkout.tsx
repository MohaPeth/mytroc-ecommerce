
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { Toaster } from '@/components/ui/toaster';

const Checkout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CheckoutSteps />
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Checkout;
