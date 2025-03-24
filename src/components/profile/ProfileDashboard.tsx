
import React from 'react';
import { Package, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dummy data for the dashboard
const dummyOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: 3
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "processing",
    total: 149.50,
    items: 1
  }
];

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

const ProfileDashboard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
          <CardDescription>Vos 5 dernières commandes</CardDescription>
        </CardHeader>
        <CardContent>
          {dummyOrders.map(order => (
            <div key={order.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                {order.status === 'delivered' ? 'Livré' : 'En cours'}
              </Badge>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Package className="mr-2 h-4 w-4" /> Voir toutes les commandes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adresses</CardTitle>
          <CardDescription>Vos adresses enregistrées</CardDescription>
        </CardHeader>
        <CardContent>
          {dummyAddresses.map(address => (
            <div key={address.id} className="flex items-start justify-between py-2">
              <div>
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-muted-foreground">{address.street}</p>
                <p className="text-sm text-muted-foreground">
                  {address.postalCode} {address.city}
                </p>
              </div>
              {address.isDefault && (
                <Badge variant="secondary">Par défaut</Badge>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <MapPin className="mr-2 h-4 w-4" /> Gérer les adresses
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileDashboard;
