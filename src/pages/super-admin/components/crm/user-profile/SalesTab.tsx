import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ShoppingCart, Download, LineChart, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';
import SalesForm from '../../crm/forms/SalesForm';

interface SalesTabProps {
  userId: string;
  formatDate: (dateString: string) => string;
}

// Mock data for sales
const SALES_DATA = [
  {
    id: "S001",
    orderNumber: "CMD-87562",
    date: "2025-03-15",
    amount: 129.99,
    status: "completed",
    paymentMethod: "card",
    commission: 12.99
  },
  {
    id: "S002",
    orderNumber: "CMD-87612",
    date: "2025-03-10",
    amount: 224.50,
    status: "completed",
    paymentMethod: "paypal",
    commission: 22.45
  },
  {
    id: "S003",
    orderNumber: "CMD-88032",
    date: "2025-03-05",
    amount: 46.90,
    status: "completed",
    paymentMethod: "card",
    commission: 4.69
  },
  {
    id: "S004",
    orderNumber: "CMD-88145",
    date: "2025-02-28",
    amount: 189.00,
    status: "completed",
    paymentMethod: "card",
    commission: 18.90
  },
  {
    id: "S005",
    orderNumber: "CMD-88301",
    date: "2025-02-20",
    amount: 53.50,
    status: "completed",
    paymentMethod: "paypal",
    commission: 5.35
  }
];

const SalesTab: React.FC<SalesTabProps> = ({ userId, formatDate }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<any>(null);

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

  const handleEditSale = (sale: any) => {
    setEditingSale(sale);
    setIsFormOpen(true);
  };

  const openNewSaleForm = () => {
    setEditingSale(null);
    setIsFormOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Ventes réalisées</CardTitle>
          <CardDescription>Historique des ventes effectuées par l'utilisateur</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <LineChart className="h-4 w-4" />
            Graphique
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button size="sm" className="gap-2" onClick={openNewSaleForm}>
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SALES_DATA.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <div className="font-medium">{sale.orderNumber}</div>
                </TableCell>
                <TableCell>{formatDate(sale.date)}</TableCell>
                <TableCell>
                  {sale.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complété</Badge>
                </TableCell>
                <TableCell>
                  {sale.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}
                </TableCell>
                <TableCell>
                  {sale.commission.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditSale(sale)}>Détails</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Total des ventes : <span className="font-semibold">{SALES_DATA.reduce((sum, sale) => sum + sale.amount, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Total commissions : <span className="font-semibold">{SALES_DATA.reduce((sum, sale) => sum + sale.commission, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
          </div>
        </div>
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingSale ? 'Modifier la vente' : 'Ajouter une nouvelle vente'}</DialogTitle>
            <DialogDescription>
              {editingSale 
                ? 'Modifiez les informations de cette vente' 
                : 'Remplissez le formulaire pour ajouter une nouvelle vente'}
            </DialogDescription>
          </DialogHeader>
          <SalesForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
            initialData={editingSale && {
              orderNumber: editingSale.orderNumber,
              date: new Date(editingSale.date),
              amount: String(editingSale.amount),
              paymentMethod: editingSale.paymentMethod,
              products: '',
              customerName: 'Utilisateur actuel',
              notes: ''
            }}
            title={editingSale ? 'Modifier la vente' : 'Ajouter une nouvelle vente'}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalesTab;
