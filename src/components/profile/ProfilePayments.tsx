
import React from 'react';
import { toast } from 'sonner';
import { CreditCard, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const dummyPaymentMethods = [
  {
    id: 1,
    type: "card",
    last4: "4242",
    expiry: "12/24",
    brand: "visa",
    isDefault: true
  },
  {
    id: 2,
    type: "card",
    last4: "8888",
    expiry: "06/25",
    brand: "mastercard",
    isDefault: false
  }
];

const ProfilePayments = () => {
  const handleDeletePaymentMethod = (id: number) => {
    toast.success('Moyen de paiement supprimé avec succès');
  };

  return (
    <div className="space-y-4">
      {dummyPaymentMethods.map(method => (
        <Card key={method.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle>
                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)}
                </CardTitle>
                {method.isDefault && (
                  <Badge variant="secondary">Par défaut</Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeletePaymentMethod(method.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">**** **** **** {method.last4}</p>
            <p className="text-sm text-muted-foreground">Expire {method.expiry}</p>
          </CardContent>
        </Card>
      ))}
      <Button className="w-full">
        <CreditCard className="mr-2 h-4 w-4" /> Ajouter un moyen de paiement
      </Button>
    </div>
  );
};

export default ProfilePayments;
