
import React from 'react';
import { 
  Package, 
  ShoppingCart,
  ExternalLink, 
  RotateCcw,
  X,
  Check,
  Download
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const OrdersContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewOrderDetails = (orderId: string) => {
    navigate(`/order-details/${orderId}`);
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Téléchargement de la facture",
      description: "Votre facture sera téléchargée dans quelques instants."
    });

    // Simuler un délai avant le téléchargement
    setTimeout(() => {
      // Importer dynamiquement le générateur de facture
      import('@/utils/invoiceGenerator').then(({ downloadInvoice }) => {
        // Simuler des données de commande - en production, ces données viendraient de la base de données
        const orderData = {
          id: orderId,
          customerName: "Jean Dupont",
          customerEmail: "jean.dupont@example.com",
          customerAddress: "123 Rue des Exemples, 75001 Paris, France",
          items: [
            { name: "T-shirt écologique en coton bio", quantity: 2, price: 2990 },
            { name: "Gourde réutilisable 500ml", quantity: 1, price: 1990 }
          ],
          subtotal: 7970,
          deliveryFee: 490,
          tax: 1430,
          total: orderId === "MT2023-756" ? 7890 : orderId === "MT2023-689" ? 12450 : 5620
        };

        // Générer et télécharger la facture
        downloadInvoice({
          invoiceNumber: `INV-${orderId}`,
          date: new Date(),
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerAddress: orderData.customerAddress,
          items: orderData.items,
          subtotal: orderData.subtotal,
          deliveryFee: orderData.deliveryFee,
          tax: orderData.tax,
          total: orderData.total
        });
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historique des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="processing">En cours</TabsTrigger>
              <TabsTrigger value="shipped">Expédiées</TabsTrigger>
              <TabsTrigger value="delivered">Livrées</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commande</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#MT2023-756</TableCell>
                    <TableCell>15/06/2023</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Check className="h-3 w-3 mr-1" />
                        Livré
                      </Badge>
                    </TableCell>
                    <TableCell>78,90 €</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice("MT2023-756")}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Facture
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewOrderDetails("MT2023-756")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#MT2023-689</TableCell>
                    <TableCell>28/05/2023</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <Package className="h-3 w-3 mr-1" />
                        Expédié
                      </Badge>
                    </TableCell>
                    <TableCell>124,50 €</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice("MT2023-689")}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Facture
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewOrderDetails("MT2023-689")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#MT2023-542</TableCell>
                    <TableCell>10/04/2023</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        <X className="h-3 w-3 mr-1" />
                        Annulé
                      </Badge>
                    </TableCell>
                    <TableCell>56,20 €</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice("MT2023-542")}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Facture
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewOrderDetails("MT2023-542")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Retours et remboursements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <RotateCcw className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucun retour en cours</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-4">
              Vous n'avez aucun retour en cours actuellement. Consultez notre politique de retour si vous souhaitez retourner un article.
            </p>
            <Button variant="outline">Voir la politique de retour</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersContent;
