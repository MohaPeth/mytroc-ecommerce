import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/Hero';
import BestSellers from '@/components/BestSellers';
import ProductCategories from '@/components/ProductCategories';
import Footer from '@/components/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <div className="container mx-auto px-4">
          <HeroSlider />
        </div>
        
        <BestSellers />
        
        <ProductCategories />
        
        {/* Nous avons retiré les sections supplémentaires qui n'apparaissent pas dans l'image de référence */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
