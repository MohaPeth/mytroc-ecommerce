
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Sale {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  paymentMethod: string;
  commission: number;
}

interface SalesTableProps {
  salesData: Sale[];
  onEditSale: (sale: Sale) => void;
}

const SalesTable: React.FC<SalesTableProps> = ({ salesData, onEditSale }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Paiement</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesData.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>
                <div className="font-medium">{sale.orderNumber}</div>
              </TableCell>
              <TableCell>{sale.customer}</TableCell>
              <TableCell>{sale.date}</TableCell>
              <TableCell>
                {sale.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Complété
                </Badge>
              </TableCell>
              <TableCell>
                {sale.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}
              </TableCell>
              <TableCell>
                {sale.commission.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEditSale(sale)}>Détails</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-sm text-muted-foreground">
          Total des ventes : <span className="font-semibold">{salesData.reduce((sum, sale) => sum + sale.amount, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Total commissions : <span className="font-semibold">{salesData.reduce((sum, sale) => sum + sale.commission, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
