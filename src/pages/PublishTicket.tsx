
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { UnifiedPublishTicket } from '@/components/ticket/UnifiedPublishTicket';

const PublishTicket = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-5xl mx-auto py-8">
          <UnifiedPublishTicket isDashboard={false} />
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default PublishTicket;
