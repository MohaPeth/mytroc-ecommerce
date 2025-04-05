
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';

interface PaymentInfoCardProps {
  method: string;
  cardLast4: string;
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
}

const PaymentInfoCard = ({
  method,
  cardLast4,
  subtotal,
  shippingCost,
  tax,
  total
}: PaymentInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Paiement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Méthode de paiement</p>
          <p className="text-sm text-gray-500">
            {method} •••• {cardLast4}
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Frais de livraison</span>
            <span>{shippingCost}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>TVA</span>
            <span>{tax}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfoCard;
