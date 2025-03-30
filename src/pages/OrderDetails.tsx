
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Clock, 
  Check, 
  AlertCircle,
  PhoneCall,
  Download,
  Copy,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for the order details
const getOrderDetails = (orderId: string) => {
  const statusMap = {
    'MT2023-756': 'delivered',
    'MT2023-689': 'shipped',
    'MT2023-542': 'cancelled'
  };

  return {
    id: orderId,
    orderNumber: `#${orderId}`,
    date: orderId === 'MT2023-756' ? '15/06/2023' : orderId === 'MT2023-689' ? '28/05/2023' : '10/04/2023',
    status: statusMap[orderId as keyof typeof statusMap] || 'processing',
    totalAmount: orderId === 'MT2023-756' ? '78,90 €' : orderId === 'MT2023-689' ? '124,50 €' : '56,20 €',
    items: [
      {
        id: '1',
        name: 'T-shirt écologique en coton bio',
        price: '29,90 €',
        quantity: 1,
        image: '/placeholder.svg'
      },
      {
        id: '2',
        name: 'Gourde réutilisable 500ml',
        price: '19,90 €',
        quantity: 2,
        image: '/placeholder.svg'
      }
    ],
    shipping: {
      method: 'Livraison standard',
      cost: '4,90 €',
      address: {
        fullName: 'Jean Dupont',
        street: '15 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      },
      trackingNumber: 'FR78945612307'
    },
    payment: {
      method: 'Carte bancaire',
      cardLast4: '4242',
      subtotal: '69,70 €',
      tax: '4,30 €',
      total: orderId === 'MT2023-756' ? '78,90 €' : orderId === 'MT2023-689' ? '124,50 €' : '56,20 €'
    }
  };
};

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  // Get order details based on the orderId
  const order = getOrderDetails(orderId || '');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="h-3 w-3 mr-1" />
            Livré
          </Badge>
        );
      case 'shipped':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Package className="h-3 w-3 mr-1" />
            Expédié
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Clock className="h-3 w-3 mr-1" />
            En cours
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Annulé
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Téléchargement de la facture",
      description: "Votre facture sera téléchargée dans quelques instants.",
    });
  };

  const handleReorderItems = () => {
    toast({
      title: "Commande dupliquée",
      description: "Les articles ont été ajoutés à votre panier.",
    });
    navigate('/panier');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">Détails de la commande {order.orderNumber}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Order Summary & Items */}
            <div className="md:col-span-2 space-y-6">
              {/* Order Summary Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Résumé de la commande</CardTitle>
                    {getStatusBadge(order.status)}
                  </div>
                  <CardDescription>
                    Commandé le {order.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Order Tracking Progress Bar */}
                  {order.status !== 'cancelled' && (
                    <div className="mb-6">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Suivi de commande</p>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`absolute top-0 left-0 h-full ${
                              order.status === 'delivered' ? 'bg-green-500 w-full' : 
                              order.status === 'shipped' ? 'bg-blue-500 w-2/3' : 
                              'bg-amber-500 w-1/3'
                            }`}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Commande en cours</span>
                          <span>Expédiée</span>
                          <span>Livrée</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Articles</h3>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={handleReorderItems}>
                    <Copy className="h-4 w-4 mr-2" />
                    Commander à nouveau
                  </Button>
                  <Button onClick={handleDownloadInvoice}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger la facture
                  </Button>
                </CardFooter>
              </Card>

              {/* Shipping Information Card */}
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
                      <p className="text-sm text-gray-500">{order.shipping.method}</p>
                    </div>
                    <p className="text-sm font-medium">{order.shipping.cost}</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm font-medium">Adresse de livraison</p>
                    </div>
                    <div className="ml-6 text-sm text-gray-500 space-y-1">
                      <p>{order.shipping.address.fullName}</p>
                      <p>{order.shipping.address.street}</p>
                      <p>{order.shipping.address.postalCode} {order.shipping.address.city}</p>
                      <p>{order.shipping.address.country}</p>
                    </div>
                  </div>

                  {order.status !== 'cancelled' && (
                    <>
                      <Separator />
                      <div>
                        <div className="flex items-center mb-2">
                          <Package className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm font-medium">Numéro de suivi</p>
                        </div>
                        <div className="ml-6 flex items-center">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm mr-2">
                            {order.shipping.trackingNumber}
                          </code>
                          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => {
                            navigator.clipboard.writeText(order.shipping.trackingNumber);
                            toast({
                              title: "Numéro de suivi copié",
                              description: "Le numéro de suivi a été copié dans le presse-papier.",
                            });
                          }}>
                            Copier
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column - Payment & Support */}
            <div className="space-y-6">
              {/* Payment Information Card */}
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
                      {order.payment.method} •••• {order.payment.cardLast4}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total</span>
                      <span>{order.payment.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Frais de livraison</span>
                      <span>{order.shipping.cost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TVA</span>
                      <span>{order.payment.tax}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{order.payment.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Support Card */}
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
                  <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
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
                          Nous sommes disponibles pour vous aider concernant la commande {order.orderNumber}.
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default OrderDetails;
