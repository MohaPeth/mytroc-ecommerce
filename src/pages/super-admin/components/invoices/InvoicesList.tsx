
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Search } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { downloadInvoice } from '@/utils/invoiceGenerator';

// Données factices pour démonstration
const MOCK_INVOICES = [
  {
    id: 'INV-001',
    customerName: 'Jean Dupont',
    customerEmail: 'jean.dupont@example.com',
    date: new Date(2025, 2, 15),
    amount: 12500,
    status: 'paid',
    items: [
      { name: 'Produit A', quantity: 2, price: 5000 },
      { name: 'Produit B', quantity: 1, price: 2500 }
    ],
  },
  {
    id: 'INV-002',
    customerName: 'Marie Martin',
    customerEmail: 'marie.martin@example.com',
    date: new Date(2025, 2, 18),
    amount: 35000,
    status: 'pending',
    items: [
      { name: 'Service Premium', quantity: 1, price: 35000 }
    ],
  },
  {
    id: 'INV-003',
    customerName: 'Sophie Bernard',
    customerEmail: 'sophie.bernard@example.com',
    date: new Date(2025, 2, 20),
    amount: 7500,
    status: 'paid',
    items: [
      { name: 'Produit C', quantity: 3, price: 2500 }
    ],
  },
  {
    id: 'INV-004',
    customerName: 'Thomas Petit',
    customerEmail: 'thomas.petit@example.com',
    date: new Date(2025, 2, 22),
    amount: 18000,
    status: 'cancelled',
    items: [
      { name: 'Produit D', quantity: 1, price: 15000 },
      { name: 'Service Basic', quantity: 1, price: 3000 }
    ],
  },
  {
    id: 'INV-005',
    customerName: 'Camille Roux',
    customerEmail: 'camille.roux@example.com',
    date: new Date(2025, 2, 25),
    amount: 42500,
    status: 'paid',
    items: [
      { name: 'Pack Complet', quantity: 1, price: 42500 }
    ],
  },
];

const InvoicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filtrer les factures en fonction de la recherche et du statut
  const filteredInvoices = MOCK_INVOICES.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleDownload = (invoice: any) => {
    // Préparer les données pour la génération de la facture
    const invoiceData = {
      invoiceNumber: invoice.id,
      date: invoice.date,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      items: invoice.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: invoice.amount,
      total: invoice.amount
    };
    
    downloadInvoice(invoiceData);
  };
  
  // Fonction pour rendre le badge de statut avec la couleur appropriée
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Payée</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">En attente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Annulée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="paid">Payée</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div>{invoice.customerName}</div>
                    <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                  </TableCell>
                  <TableCell>{format(invoice.date, 'dd MMMM yyyy', { locale: fr })}</TableCell>
                  <TableCell>{(invoice.amount / 100).toFixed(2)} €</TableCell>
                  <TableCell>{renderStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" title="Prévisualiser">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        title="Télécharger"
                        onClick={() => handleDownload(invoice)}
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
    </div>
  );
};

export default InvoicesList;
