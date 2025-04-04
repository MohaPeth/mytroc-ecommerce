
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface OfferSuccessAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OfferSuccessAlert: React.FC<OfferSuccessAlertProps> = ({ open, onOpenChange }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Offre soumise avec succès!</AlertDialogTitle>
          <AlertDialogDescription>
            Votre offre a bien été envoyée au vendeur. Vous serez notifié(e) dès qu'il aura répondu à votre proposition.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Compris</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OfferSuccessAlert;
