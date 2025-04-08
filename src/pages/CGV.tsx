
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';

const CGV = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Conditions Générales de Vente</h1>
          {/* CGV content placeholder */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CGV;
