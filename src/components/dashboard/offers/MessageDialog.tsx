
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Offer } from '@/types/offer.types';
import ReplyForm from './ReplyForm';
import { MessageSquare, Send } from 'lucide-react';

interface MessageDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  offer: Offer | null;
  onRespondToOffer?: (id: string, response: string) => void;
}

export const MessageDialog: React.FC<MessageDialogProps> = ({ 
  open, 
  setOpen, 
  offer,
  onRespondToOffer
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleRespondToOffer = (response: string) => {
    if (offer && onRespondToOffer) {
      onRespondToOffer(offer.id, response);
      setIsReplying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Communication avec le client</DialogTitle>
          <DialogDescription>
            {offer && `Offre pour ${offer.productName}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Message du client */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MessageSquare className="h-4 w-4" />
              <span>Message du client:</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-md border">
              {offer?.message || "Aucun message"}
            </div>
          </div>

          {/* Réponse du vendeur */}
          {offer?.sellerResponse && !isReplying ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Send className="h-4 w-4" />
                <span>Votre réponse:</span>
              </div>
              <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                {offer.sellerResponse}
              </div>
            </div>
          ) : null}

          {/* Formulaire de réponse */}
          {isReplying ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Send className="h-4 w-4" />
                <span>Votre réponse:</span>
              </div>
              <ReplyForm 
                sellerResponse={offer?.sellerResponse}
                onSubmit={handleRespondToOffer}
              />
            </div>
          ) : null}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {!isReplying && offer?.status === 'pending' && (
            <Button 
              variant="outline" 
              onClick={() => setIsReplying(true)}
              className="sm:mr-auto"
            >
              {offer?.sellerResponse ? 'Modifier la réponse' : 'Répondre'}
            </Button>
          )}

          <Button onClick={() => setOpen(false)} variant={isReplying ? "destructive" : "default"}>
            {isReplying ? 'Annuler' : 'Fermer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
