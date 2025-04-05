
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Package, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'delivered':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <Check className="h-3 w-3 mr-1" />
          Livré
        </Badge>
      );
    case 'shipped':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Package className="h-3 w-3 mr-1" />
          Expédié
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <Clock className="h-3 w-3 mr-1" />
          En cours
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Annulé
        </Badge>
      );
    default:
      return null;
  }
};

export default StatusBadge;
