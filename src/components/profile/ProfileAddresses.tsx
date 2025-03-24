
import React from 'react';
import { toast } from 'sonner';
import { MapPin, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const dummyAddresses = [
  {
    id: 1,
    type: "home",
    name: "John Doe",
    street: "123 Main Street",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    phone: "+33 1 23 45 67 89",
    isDefault: true
  },
  {
    id: 2,
    type: "work",
    name: "John Doe",
    street: "456 Business Avenue",
    city: "Lyon",
    postalCode: "69001",
    country: "France",
    phone: "+33 1 98 76 54 32",
    isDefault: false
  }
];

const ProfileAddresses = () => {
  const handleDeleteAddress = (id: number) => {
    toast.success('Adresse supprimée avec succès');
  };

  return (
    <div className="space-y-4">
      {dummyAddresses.map(address => (
        <Card key={address.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle>{address.type === 'home' ? 'Domicile' : 'Travail'}</CardTitle>
                {address.isDefault && (
                  <Badge variant="secondary">Par défaut</Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{address.name}</p>
            <p className="text-sm text-muted-foreground">{address.street}</p>
            <p className="text-sm text-muted-foreground">
              {address.postalCode} {address.city}
            </p>
            <p className="text-sm text-muted-foreground">{address.phone}</p>
          </CardContent>
        </Card>
      ))}
      <Button className="w-full">
        <MapPin className="mr-2 h-4 w-4" /> Ajouter une adresse
      </Button>
    </div>
  );
};

export default ProfileAddresses;
