
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import SalesTable from './sales/SalesTable';
import SalesToolbar from './sales/SalesToolbar';
import SalesFormDialog from './sales/SalesFormDialog';
import { SALES_DATA, Sale } from './sales/salesData';

const SalesManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);

  const handleFormSubmit = (data: any) => {
    if (editingSale) {
      // Logique de mise à jour
      toast.success(`Vente ${data.orderNumber} mise à jour avec succès`);
    } else {
      // Logique d'ajout
      toast.success(`Nouvelle vente ${data.orderNumber} ajoutée avec succès`);
    }
    setIsFormOpen(false);
    setEditingSale(null);
  };

  const handleEditSale = (sale: Sale) => {
    setEditingSale(sale);
    setIsFormOpen(true);
  };

  const openNewSaleForm = () => {
    setEditingSale(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SalesToolbar onNewSale={openNewSaleForm} />
        </CardHeader>
        <CardContent>
          <SalesTable 
            salesData={SALES_DATA}
            onEditSale={handleEditSale}
          />
        </CardContent>
      </Card>

      <SalesFormDialog 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        editingSale={editingSale}
      />
    </div>
  );
};

export default SalesManagement;
