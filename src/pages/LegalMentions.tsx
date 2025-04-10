
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';

const LegalMentions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          <p>Cette page est en construction.</p>
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default LegalMentions;
