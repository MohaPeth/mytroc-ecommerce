
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { Offer } from '@/types/offer.types';

interface OfferActionsProps {
  offer: Offer;
  onViewProduct: (id: string) => void;
  onOpenMessage: (offer: Offer) => void;
  onAcceptOffer?: (id: string) => void;
  onRejectOffer?: (id: string) => void;
}

export const OfferActions: React.FC<OfferActionsProps> = ({ 
  offer, 
  onViewProduct,
  onOpenMessage,
  onAcceptOffer,
  onRejectOffer
}) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {offer.message && (
        <Button variant="ghost" size="icon" onClick={() => onOpenMessage(offer)}>
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
            onClick={() => onAcceptOffer?.(offer.id)}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRejectOffer?.(offer.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
