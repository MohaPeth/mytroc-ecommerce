
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import InvoiceStatusBadge from './InvoiceStatusBadge';

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  amount: number;
  status: string;
  items: InvoiceItem[];
}

interface InvoicesTableProps {
  invoices: Invoice[];
  onPreview: (invoice: Invoice) => void;
  onDownload: (invoice: Invoice) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ 
  invoices, 
  onPreview, 
  onDownload 
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Facture</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <div>{invoice.customerName}</div>
                  <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                </TableCell>
                <TableCell>{format(invoice.date, 'dd MMMM yyyy', { locale: fr })}</TableCell>
                <TableCell>{(invoice.amount / 100).toFixed(2)} €</TableCell>
                <TableCell><InvoiceStatusBadge status={invoice.status} /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Prévisualiser"
                      onClick={() => onPreview(invoice)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Télécharger"
                      onClick={() => onDownload(invoice)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Aucune facture trouvée.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoicesTable;
