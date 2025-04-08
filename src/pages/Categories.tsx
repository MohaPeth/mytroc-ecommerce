
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Catégories</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This is a placeholder. In a real app, you would fetch categories from an API */}
            {[1, 2, 3, 4, 5, 6].map((category) => (
              <div 
                key={category} 
                className="border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Catégorie {category}</h3>
                <p className="text-gray-600 text-sm">
                  Description de la catégorie {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default Categories;
