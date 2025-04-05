
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Truck, MapPin, Package } from 'lucide-react';

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingInfoCardProps {
  method: string;
  cost: string;
  address: ShippingAddress;
  trackingNumber?: string;
  status: string;
  onCopyTracking: () => void;
}

const ShippingInfoCard = ({ 
  method, 
  cost, 
  address, 
  trackingNumber, 
  status,
  onCopyTracking 
}: ShippingInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="h-5 w-5 mr-2" />
          Informations de livraison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium">Méthode de livraison</p>
            <p className="text-sm text-gray-500">{method}</p>
          </div>
          <p className="text-sm font-medium">{cost}</p>
        </div>

        <Separator />

        <div>
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <p className="text-sm font-medium">Adresse de livraison</p>
          </div>
          <div className="ml-6 text-sm text-gray-500 space-y-1">
            <p>{address.fullName}</p>
            <p>{address.street}</p>
            <p>{address.postalCode} {address.city}</p>
            <p>{address.country}</p>
          </div>
        </div>

        {status !== 'cancelled' && trackingNumber && (
          <>
            <Separator />
            <div>
              <div className="flex items-center mb-2">
                <Package className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm font-medium">Numéro de suivi</p>
              </div>
              <div className="ml-6 flex items-center">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm mr-2">
                  {trackingNumber}
                </code>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onCopyTracking}>
                  Copier
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingInfoCard;
