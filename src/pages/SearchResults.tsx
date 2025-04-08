
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';

const SearchResults = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Résultats de recherche</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder search results */}
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucun résultat trouvé. Essayez une autre recherche.
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default SearchResults;
