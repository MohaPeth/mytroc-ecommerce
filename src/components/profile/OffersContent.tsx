
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Eye, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReplyForm from '@/components/dashboard/offers/ReplyForm';
import { Badge } from '@/components/ui/badge';

// Données fictives pour la démonstration
const mockOffers = [
  {
    id: "1",
    productId: "product1",
    productName: "Vélo électrique",
    productImage: "/placeholder.svg",
    customer: {
      name: "Sophie Martin",
      email: "sophie.martin@example.com"
    },
    originalPrice: 1200,
    offerPrice: 950,
    message: "Bonjour, serait-il possible d'avoir ce vélo à 950€ ? Merci.",
    sellerResponse: "Bonjour, je peux vous proposer 1000€, c'est le meilleur prix que je peux faire.",
    status: "pending",
    date: new Date('2025-03-15')
  },
  {
    id: "2",
    productId: "product2",
    productName: "Machine à café",
    productImage: "/placeholder.svg",
    customer: {
      name: "Sophie Martin",
      email: "sophie.martin@example.com"
    },
    originalPrice: 300,
    offerPrice: 250,
    message: "Pouvez-vous me faire un prix ?",
    status: "accepted",
    date: new Date('2025-03-10')
  },
  {
    id: "3",
    productId: "product3",
    productName: "Table de jardin",
    productImage: "/placeholder.svg",
    customer: {
      name: "Sophie Martin",
      email: "sophie.martin@example.com"
    },
    originalPrice: 450,
    offerPrice: 380,
    message: "Est-ce que ce prix vous convient ?",
    sellerResponse: "Je suis désolé, je ne peux pas descendre en dessous de 420€.",
    status: "rejected",
    date: new Date('2025-03-05')
  }
];

const OffersContent = () => {
  const [selectedOffer, setSelectedOffer] = useState<typeof mockOffers[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredOffers = activeTab === "all" 
    ? mockOffers 
    : mockOffers.filter(offer => offer.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      default: return status;
    }
  };

  const handleViewMessage = (offer: typeof mockOffers[0]) => {
    setSelectedOffer(offer);
    setIsDialogOpen(true);
  };

  const handleConfirmOffer = () => {
    alert("Offre confirmée ! La vente va être finalisée.");
    setIsDialogOpen(false);
  };

  const handleMakeNewOffer = () => {
    alert("Vous allez faire une nouvelle offre.");
    setIsDialogOpen(false);
  };

  const handleCancelOffer = () => {
    alert("Offre annulée !");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes offres</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="accepted">Acceptées</TabsTrigger>
              <TabsTrigger value="rejected">Refusées</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              {filteredOffers.length > 0 ? (
                <div className="space-y-4">
                  {filteredOffers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                            <img 
                              src={offer.productImage} 
                              alt={offer.productName} 
                              className="max-h-10 max-w-10"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{offer.productName}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-gray-500 line-through text-sm">
                                {offer.originalPrice.toFixed(2)}€
                              </span>
                              <span className="font-medium">
                                {offer.offerPrice.toFixed(2)}€
                              </span>
                              <Badge className={getStatusColor(offer.status)}>
                                {getStatusText(offer.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {offer.sellerResponse && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewMessage(offer)}
                              className="flex items-center text-blue-600"
                            >
                              <MessageCircle className="mr-1 h-4 w-4" />
                              Réponse
                            </Button>
                          )}
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune offre {activeTab !== 'all' ? getStatusText(activeTab).toLowerCase() : ''} trouvée.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog pour afficher la réponse du vendeur */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Réponse du vendeur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOffer && (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Votre offre pour {selectedOffer.productName} :</p>
                  <div className="p-4 bg-gray-50 rounded-md border">
                    <p className="mb-2">{selectedOffer.message}</p>
                    <p className="text-sm text-gray-500">
                      Prix proposé : <span className="font-medium">{selectedOffer.offerPrice.toFixed(2)}€</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Réponse du vendeur :</p>
                  <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                    {selectedOffer.sellerResponse}
                  </div>
                </div>

                {selectedOffer.status === 'pending' && (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button onClick={handleConfirmOffer} className="w-full bg-green-600 hover:bg-green-700">
                      Confirmer l'achat
                    </Button>
                    <Button onClick={handleMakeNewOffer} variant="outline" className="w-full">
                      Faire une nouvelle offre
                    </Button>
                    <Button onClick={handleCancelOffer} variant="outline" className="w-full text-red-600 hover:text-red-700">
                      Annuler l'offre
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OffersContent;
