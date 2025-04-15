import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header/Header';
import HeroSlider from '@/components/Hero';
import Features from '@/components/Features';
import BestSellers from '@/components/BestSellers';
import ProductCategories from '@/components/ProductCategories';
import CategoryGrid from '@/components/CategoryGrid';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, MapPin, CreditCard } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <div className="container mx-auto px-4 py-[90px]">
          <HeroSlider />
        </div>
        
        <Features />
        
        <BestSellers />
        
        <ProductCategories />
        
        <CategoryGrid />
        
        {/* New Events/Tickets Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-indigo-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-mytroc-accent/20 text-mytroc-accent px-4 py-1 rounded-full text-sm font-medium mb-4">Nouveau !</span>
              <h2 className="text-3xl font-bold mb-4">Billets et Événements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez notre nouvelle catégorie pour acheter et vendre des billets d'événements en toute simplicité.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <Calendar className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Concerts, Festivals, Théâtre...</h3>
                        <p className="text-gray-600">
                          Un large choix d'événements disponibles à la vente. Trouvez des billets pour vos événements favoris.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <MapPin className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Local ou national</h3>
                        <p className="text-gray-600">
                          Des événements partout dans le pays, près de chez vous ou pour vos déplacements.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <CreditCard className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Paiement sécurisé</h3>
                        <p className="text-gray-600">
                          Achetez en toute sécurité avec Mobicash, Airtel Money ou carte bancaire.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center md:justify-start pt-4">
                    <Button 
                      className="bg-mytroc-accent hover:bg-mytroc-accent/90 text-white" 
                      size="lg" 
                      onClick={() => navigate('/billets-evenements')}
                    >
                      <Ticket className="mr-2 h-5 w-5" />
                      Découvrir les billets
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                    <img src="/placeholder.svg" alt="Événements" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-mytroc-accent text-white p-6 rounded-xl shadow-elevated transform rotate-3 max-w-[200px]">
                    <p className="font-bold text-lg">Vente de billets simplifiée</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
      </main>
      
      <Footer />
    </div>;
};
export default Index;
