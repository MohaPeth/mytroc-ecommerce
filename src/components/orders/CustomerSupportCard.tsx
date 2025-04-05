
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhoneCall, MessageCircle } from 'lucide-react';

interface CustomerSupportCardProps {
  orderNumber: string;
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
}

const CustomerSupportCard = ({ 
  orderNumber, 
  isDialogOpen, 
  onDialogOpenChange 
}: CustomerSupportCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PhoneCall className="h-5 w-5 mr-2" />
          Besoin d'aide ?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Un problème avec votre commande ? Notre service client est là pour vous aider.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contacter le service client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contacter le service client</DialogTitle>
              <DialogDescription>
                Nous sommes disponibles pour vous aider concernant la commande {orderNumber}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <PhoneCall className="h-5 w-5 mr-3 text-green-600" />
                <div>
                  <p className="font-medium">Par téléphone</p>
                  <p className="text-sm text-gray-500">+33 (0)1 23 45 67 89</p>
                  <p className="text-xs text-gray-500">Lun-Ven, 9h-18h</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <MessageCircle className="h-5 w-5 mr-3 text-blue-600" />
                <div>
                  <p className="font-medium">Par email</p>
                  <p className="text-sm text-gray-500">support@mytroc.fr</p>
                  <p className="text-xs text-gray-500">Réponse sous 24h</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CustomerSupportCard;
