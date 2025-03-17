
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/Hero';
import Features from '@/components/Features';
import BestSellers from '@/components/BestSellers';
import ProductCategories from '@/components/ProductCategories';
import CategoryGrid from '@/components/CategoryGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <div className="container mx-auto px-4">
          <HeroSlider />
        </div>
        
        <Features />
        
        <BestSellers />
        
        <ProductCategories />
        
        <CategoryGrid />
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-mytroc-primary/10 text-mytroc-primary px-4 py-1 rounded-full text-sm font-medium mb-4">Notre engagement</span>
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir MyTroc ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                MyTroc vous propose des produits de qualité à des prix accessibles, avec un service client de proximité.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                    <h3 className="font-semibold text-lg mb-2">Facilités de paiement</h3>
                    <p className="text-gray-600">
                      Bénéficiez de notre système de paiement en 3 fois sans frais et de nos devis CAF pour faciliter vos achats.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                    <h3 className="font-semibold text-lg mb-2">Support client dédié</h3>
                    <p className="text-gray-600">
                      Notre équipe est disponible 6j/7 pour vous conseiller et vous aider dans vos achats et dépannages.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                    <h3 className="font-semibold text-lg mb-2">Qualité garantie</h3>
                    <p className="text-gray-600">
                      Tous nos produits sont soigneusement sélectionnés et garantis pour vous assurer une satisfaction totale.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                    <img src="/placeholder.svg" alt="MyTroc Quality" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-mytroc-accent text-white p-6 rounded-xl shadow-elevated transform rotate-3 max-w-[200px]">
                    <p className="font-bold text-lg">Marques à prix discount</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-mytroc-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Besoin d'assistance ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Notre équipe de spécialistes est à votre disposition pour vous aider dans vos projets et répondre à vos questions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-white text-mytroc-primary px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300">
                Contactez-nous
              </button>
              <button className="bg-mytroc-accent text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300">
                Demander un devis
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
