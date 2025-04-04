
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Offer } from '@/types/offer.types';

interface StatusBadgeProps {
  status: Offer['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="text-amber-600 border-amber-600">En attente</Badge>;
    case 'accepted':
      return <Badge className="bg-green-500">Acceptée</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Refusée</Badge>;
    default:
      return null;
  }
};
