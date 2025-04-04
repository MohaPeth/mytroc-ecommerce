
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Offer {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customer: {
    name: string;
    email: string;
  };
  originalPrice: number;
  offerPrice: number;
  message?: string; // Make message optional
  status: 'pending' | 'accepted' | 'rejected';
  date: Date;
}

interface OffersTableProps {
  offers: Offer[];
  onViewProduct: (id: string) => void;
  onAcceptOffer?: (id: string) => void;
  onRejectOffer?: (id: string) => void;
}

const OffersTable: React.FC<OffersTableProps> = ({ 
  offers, 
  onViewProduct,
  onAcceptOffer,
  onRejectOffer
}) => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const openMessageDialog = (offer: Offer) => {
    setSelectedOffer(offer);
    setMessageDialogOpen(true);
  };

  const getStatusBadge = (status: Offer['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-600">En attente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Acceptée</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Refusée</Badge>;
      default:
        return null;
    }
  };

  const handleAcceptOffer = (id: string) => {
    if (onAcceptOffer) {
      onAcceptOffer(id);
      toast({
        title: "Offre acceptée",
        description: "L'offre a été acceptée avec succès."
      });
    }
  };

  const handleRejectOffer = (id: string) => {
    if (onRejectOffer) {
      onRejectOffer(id);
      toast({
        title: "Offre refusée",
        description: "L'offre a été refusée."
      });
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Prix d'origine</TableHead>
              <TableHead>Offre</TableHead>
              <TableHead>Différence</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  Aucune offre pour le moment
                </TableCell>
              </TableRow>
            ) : (
              offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                        <img 
                          src={offer.productImage} 
                          alt={offer.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium line-clamp-1">{offer.productName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{offer.customer.name}</div>
                      <div className="text-xs text-muted-foreground">{offer.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDistance(offer.date, new Date(), { 
                        addSuffix: true,
                        locale: fr 
                      })}
                    </div>
                  </TableCell>
                  <TableCell>€{offer.originalPrice.toFixed(2)}</TableCell>
                  <TableCell>€{offer.offerPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={offer.offerPrice < offer.originalPrice ? "text-red-500" : "text-green-500"}>
                      {offer.offerPrice < offer.originalPrice 
                        ? `-${(((offer.originalPrice - offer.offerPrice) / offer.originalPrice) * 100).toFixed(0)}%`
                        : `+${(((offer.offerPrice - offer.originalPrice) / offer.originalPrice) * 100).toFixed(0)}%`
                      }
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(offer.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {offer.message && (
                        <Button variant="ghost" size="icon" onClick={() => openMessageDialog(offer)}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => onViewProduct(offer.productId)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {offer.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleAcceptOffer(offer.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRejectOffer(offer.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message du client</DialogTitle>
            <DialogDescription>
              {selectedOffer && `Offre pour ${selectedOffer.productName}`}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-gray-50 rounded-md my-2">
            {selectedOffer?.message || "Aucun message"}
          </div>
          <DialogFooter>
            <Button onClick={() => setMessageDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OffersTable;
