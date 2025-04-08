
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-2xl mb-8">Page non trouvée</p>
          <p className="mb-8 text-gray-600">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Error404;
