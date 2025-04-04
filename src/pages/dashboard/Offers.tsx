import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OffersTable from '@/components/dashboard/OffersTable';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Offer } from '@/types/offer.types';

// Mock data for offers - in a real app, this would come from an API
const mockOffers: Offer[] = [
  {
    id: '1',
    productId: '1',
    productName: 'TV OLED SMART LG C2 42 (106CM) 4K',
    productImage: '/placeholder.svg',
    customer: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
    },
    originalPrice: 600.72,
    offerPrice: 500.00,
    message: "Bonjour, est-ce que vous pourriez accepter cette offre? Je suis prêt à venir le chercher dès demain.",
    status: 'pending',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '2',
    productId: '2',
    productName: 'Barre de son LG',
    productImage: '/placeholder.svg',
    customer: {
      name: 'Marie Durand',
      email: 'marie.durand@example.com',
    },
    originalPrice: 299.99,
    offerPrice: 250.00,
    status: 'accepted',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: '3',
    productId: '3',
    productName: 'Support mural TV universel',
    productImage: '/placeholder.svg',
    customer: {
      name: 'Pierre Martin',
      email: 'pierre.martin@example.com',
    },
    originalPrice: 49.99,
    offerPrice: 35.00,
    message: "Est-ce que c'est compatible avec une TV Samsung de 55 pouces?",
    status: 'rejected',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    id: '4',
    productId: '1',
    productName: 'TV OLED SMART LG C2 42 (106CM) 4K',
    productImage: '/placeholder.svg',
    customer: {
      name: 'Sophie Petit',
      email: 'sophie.petit@example.com',
    },
    originalPrice: 600.72,
    offerPrice: 550.00,
    status: 'pending',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
];

const Offers = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOffers = offers.filter(offer => {
    if (activeTab === 'all') return true;
    return offer.status === activeTab;
  });

  const handleViewProduct = (productId: string) => {
    navigate(`/produit/${productId}`);
  };

  const handleAcceptOffer = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, status: 'accepted' } : offer
    ));
  };

  const handleRejectOffer = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, status: 'rejected' } : offer
    ));
  };

  // Count offers by status
  const pendingCount = offers.filter(o => o.status === 'pending').length;
  const acceptedCount = offers.filter(o => o.status === 'accepted').length;
  const rejectedCount = offers.filter(o => o.status === 'rejected').length;

  return (
    <DashboardLayout title="Offres reçues">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Offres sur vos produits</h2>
          <Button variant="outline" onClick={() => navigate('/dashboard/produits')}>
            Gérer mes produits
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              Toutes les offres 
              <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                {offers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              En attente
              <span className="ml-2 bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-xs">
                {pendingCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Acceptées
              <span className="ml-2 bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">
                {acceptedCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Refusées
              <span className="ml-2 bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-xs">
                {rejectedCount}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <OffersTable 
              offers={filteredOffers}
              onViewProduct={handleViewProduct}
              onAcceptOffer={handleAcceptOffer}
              onRejectOffer={handleRejectOffer}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Offers;
