
import React from 'react';
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

interface MessageDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  offer: Offer | null;
}

export const MessageDialog: React.FC<MessageDialogProps> = ({ 
  open, 
  setOpen, 
  offer 
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Message du client</DialogTitle>
          <DialogDescription>
            {offer && `Offre pour ${offer.productName}`}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 bg-gray-50 rounded-md my-2">
          {offer?.message || "Aucun message"}
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
