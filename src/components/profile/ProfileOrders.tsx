
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

const ProfileOrders = () => {
  return (
    <div className="space-y-4">
      {dummyOrders.map(order => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{order.id}</CardTitle>
              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                {order.status === 'delivered' ? 'Livré' : 'En cours'}
              </Badge>
            </div>
            <CardDescription>
              Commandé le {order.date} • {order.items} article(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Total: {order.total}€</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Voir les détails
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProfileOrders;
