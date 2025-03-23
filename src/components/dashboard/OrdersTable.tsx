
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Package } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  total: number;
  items: number;
}

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (id: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetails }) => {
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-600">En attente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Expédié</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Livré</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Produits</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {formatDistance(order.date, new Date(), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{order.items} article{order.items > 1 ? 's' : ''}</TableCell>
              <TableCell>€{order.total.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onViewDetails(order.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {order.status === 'processing' && (
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Package className="h-3.5 w-3.5 mr-1" />
                      Expédier
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
