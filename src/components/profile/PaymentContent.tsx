
import React from 'react';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash, 
  Percent,
  ChevronRight,
  Smartphone,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PaymentContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Méthodes de paiement</CardTitle>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded">
                  <CreditCard className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium">Visa se terminant par 4582</p>
                  <p className="text-sm text-gray-500">Expire le 06/2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Par défaut</Badge>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-2 rounded">
                  <Smartphone className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium">Orange Money</p>
                  <p className="text-sm text-gray-500">+221773027085</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-2 rounded">
                  <Smartphone className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Airtel Money</p>
                  <p className="text-sm text-gray-500">+221773027086</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded">
                  <DollarSign className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium">Paiement à la livraison</p>
                  <p className="text-sm text-gray-500">Payer lors de la réception</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded">
                  <CreditCard className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium">Mastercard se terminant par 7890</p>
                  <p className="text-sm text-gray-500">Expire le 09/2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Codes promo et réductions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-md bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-mytroc-secondary/10 rounded-md">
                  <Percent className="h-5 w-5 text-mytroc-secondary" />
                </div>
                <div>
                  <p className="font-medium">BIENVENUE10</p>
                  <p className="text-sm text-gray-600">10% de réduction sur votre prochaine commande</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-mytroc-secondary/10 text-mytroc-secondary border-mytroc-secondary/20">
                Actif
              </Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-md">
                  <Percent className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">ETE2023</p>
                  <p className="text-sm text-gray-600">15% de réduction sur les articles d'été</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-gray-100 text-gray-500">
                Expiré
              </Badge>
            </div>
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un code promo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentContent;
