
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import SalesForm from '../forms/SalesForm';
import { SalesFormValues } from '../forms/schemas/salesFormSchema';
import { Sale } from './salesData';

interface SalesFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SalesFormValues) => void;
  editingSale: Sale | null;
}

const SalesFormDialog: React.FC<SalesFormDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  editingSale 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden max-h-[90vh]">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>{editingSale ? 'Modifier la vente' : 'Ajouter une nouvelle vente'}</DialogTitle>
          <DialogDescription>
            {editingSale 
              ? 'Modifiez les informations de cette vente' 
              : 'Remplissez le formulaire pour ajouter une nouvelle vente'}
          </DialogDescription>
        </DialogHeader>
        <SalesForm 
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          initialData={editingSale && {
            orderNumber: editingSale.orderNumber,
            customerName: editingSale.customer,
            amount: String(editingSale.amount),
            paymentMethod: editingSale.paymentMethod,
            date: new Date(),
            products: '',
          }}
          title={editingSale ? 'Modifier la vente' : 'Ajouter une nouvelle vente'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SalesFormDialog;
