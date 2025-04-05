
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderProgressBar from './OrderProgressBar';
import OrderItemsList from './OrderItemsList';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderSummaryCardProps {
  orderNumber: string;
  date: string;
  status: string;
  items: OrderItem[];
  onReorder: () => void;
  onDownloadInvoice: () => void;
}

const OrderSummaryCard = ({ 
  orderNumber, 
  date, 
  status, 
  items, 
  onReorder, 
  onDownloadInvoice 
}: OrderSummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Résumé de la commande</CardTitle>
          <StatusBadge status={status} />
        </div>
        <CardDescription>
          Commandé le {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OrderProgressBar status={status} />
        <OrderItemsList items={items} />
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onReorder}>
          <Copy className="h-4 w-4 mr-2" />
          Commander à nouveau
        </Button>
        <Button onClick={onDownloadInvoice}>
          <Download className="h-4 w-4 mr-2" />
          Télécharger la facture
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummaryCard;
