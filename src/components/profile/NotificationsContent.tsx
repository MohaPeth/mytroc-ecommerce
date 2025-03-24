
import React from 'react';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Heart,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const NotificationsContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Préférences de notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Type de notification</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>SMS</TableHead>
                <TableHead>Application</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Commandes et livraisons</TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Promotions et offres spéciales</TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Produits de retour en stock</TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nouveaux produits</TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch /></TableCell>
                <TableCell><Switch defaultChecked /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Articles favoris</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex space-x-4 border rounded-md p-3">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Produit Écologique {item}</h4>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">29,99 €</p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline">Voir le détail</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full">
              Voir tous les favoris
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsContent;
