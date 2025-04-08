
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import Hero from '@/components/Hero';
import ProductCategories from '@/components/ProductCategories';
import BestSellers from '@/components/BestSellers';
import Features from '@/components/Features';
import CategoryGrid from '@/components/CategoryGrid';
import AssistanceButton from '@/components/AssistanceButton';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <Hero />
        <ProductCategories />
        <BestSellers />
        <Features />
        <CategoryGrid />
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default Home;
