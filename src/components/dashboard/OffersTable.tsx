
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { MessageDialog } from './offers/MessageDialog';
import { StatusBadge } from './offers/StatusBadge';
import { OfferActions } from './offers/OfferActions';
import { Offer, OffersTableProps } from '@/types/offer.types';

const OffersTable: React.FC<OffersTableProps> = ({ 
  offers, 
  onViewProduct,
  onAcceptOffer,
  onRejectOffer,
  onRespondToOffer
}) => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const openMessageDialog = (offer: Offer) => {
    setSelectedOffer(offer);
    setMessageDialogOpen(true);
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

  const handleRespondToOffer = (id: string, response: string) => {
    if (onRespondToOffer) {
      onRespondToOffer(id, response);
      toast({
        title: "Réponse envoyée",
        description: "Votre réponse a été envoyée au client."
      });
      setMessageDialogOpen(false);
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
                  <TableCell>
                    <StatusBadge status={offer.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <OfferActions 
                      offer={offer}
                      onViewProduct={onViewProduct}
                      onOpenMessage={openMessageDialog}
                      onAcceptOffer={handleAcceptOffer}
                      onRejectOffer={handleRejectOffer}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <MessageDialog 
        open={messageDialogOpen} 
        setOpen={setMessageDialogOpen} 
        offer={selectedOffer}
        onRespondToOffer={handleRespondToOffer} 
      />
    </>
  );
};

export default OffersTable;
