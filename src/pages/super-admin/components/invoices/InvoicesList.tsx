
import React, { useState } from 'react';
import { downloadInvoice } from '@/utils/invoiceGenerator';
import { MOCK_INVOICES } from './data/mockInvoices';
import InvoiceFilters from './components/InvoiceFilters';
import InvoicesTable, { Invoice } from './components/InvoicesTable';
import InvoicePreviewDialog from './components/InvoicePreviewDialog';

const InvoicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Filtrer les factures en fonction de la recherche et du statut
  const filteredInvoices = MOCK_INVOICES.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleDownload = (invoice: Invoice) => {
    // Préparer les données pour la génération de la facture
    const invoiceData = {
      invoiceNumber: invoice.id,
      date: invoice.date,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      items: invoice.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: invoice.amount,
      total: invoice.amount
    };
    
    downloadInvoice(invoiceData);
  };

  const handlePreview = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPreviewOpen(true);
  };
  
  return (
    <div className="space-y-4">
      <InvoiceFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <InvoicesTable 
        invoices={filteredInvoices}
        onPreview={handlePreview}
        onDownload={handleDownload}
      />

      <InvoicePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        selectedInvoice={selectedInvoice}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default InvoicesList;
