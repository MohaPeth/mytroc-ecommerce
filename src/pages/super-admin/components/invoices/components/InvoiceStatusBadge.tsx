
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface InvoiceStatusBadgeProps {
  status: string;
}

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status }) => {
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

export default InvoiceStatusBadge;
