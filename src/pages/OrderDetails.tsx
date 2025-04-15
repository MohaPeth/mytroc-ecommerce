
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getOrderDetails } from '@/components/orders/OrderDetailService';
import OrderSummaryCard from '@/components/orders/OrderSummaryCard';
import ShippingInfoCard from '@/components/orders/ShippingInfoCard';
import PaymentInfoCard from '@/components/orders/PaymentInfoCard';
import CustomerSupportCard from '@/components/orders/CustomerSupportCard';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  // Get order details based on the orderId
  const order = getOrderDetails(orderId || '');

  const handleDownloadInvoice = () => {
    toast({
      title: "Téléchargement de la facture",
      description: "Votre facture sera téléchargée dans quelques instants."
    });

    // Simuler un délai avant le téléchargement
    setTimeout(() => {
      // Importer dynamiquement le générateur de facture pour réduire la taille du bundle initial
      import('@/utils/invoiceGenerator').then(({ downloadInvoice }) => {
        // Extraire les articles de la commande pour la facture
        const items = order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price.replace(' €', '').replace(',', '.')) * 100
        }));

        // Calculer les valeurs à partir des données de la commande
        const subtotal = parseFloat(order.payment.subtotal.replace(' €', '').replace(',', '.')) * 100;
        const tax = parseFloat(order.payment.tax.replace(' €', '').replace(',', '.')) * 100;
        const total = parseFloat(order.payment.total.replace(' €', '').replace(',', '.')) * 100;
        const deliveryFee = parseFloat(order.shipping.cost.replace(' €', '').replace(',', '.')) * 100;

        // Générer et télécharger la facture
        downloadInvoice({
          invoiceNumber: `INV-${orderId}`,
          date: new Date(),
          customerName: order.shipping.address.fullName,
          customerEmail: "client@example.com", // Normalement, cela viendrait de la base de données
          customerPhone: "", // Normalement, cela viendrait de la base de données
          customerAddress: `${order.shipping.address.street}, ${order.shipping.address.postalCode} ${order.shipping.address.city}, ${order.shipping.address.country}`,
          items: items,
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          tax: tax,
          total: total
        });
      });
    }, 500);
  };

  const handleReorderItems = () => {
    toast({
      title: "Commande dupliquée",
      description: "Les articles ont été ajoutés à votre panier."
    });
    navigate('/panier');
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.shipping.trackingNumber);
    toast({
      title: "Numéro de suivi copié",
      description: "Le numéro de suivi a été copié dans le presse-papier."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 animate-fade-in py-[164px]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">Détails de la commande {order.orderNumber}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Order Summary & Items */}
            <div className="md:col-span-2 space-y-6">
              <OrderSummaryCard 
                orderNumber={order.orderNumber}
                date={order.date}
                status={order.status}
                items={order.items}
                onReorder={handleReorderItems}
                onDownloadInvoice={handleDownloadInvoice}
              />

              <ShippingInfoCard 
                method={order.shipping.method}
                cost={order.shipping.cost}
                address={order.shipping.address}
                trackingNumber={order.shipping.trackingNumber}
                status={order.status}
                onCopyTracking={handleCopyTracking}
              />
            </div>

            {/* Right column - Payment & Support */}
            <div className="space-y-6">
              <PaymentInfoCard 
                method={order.payment.method}
                cardLast4={order.payment.cardLast4}
                subtotal={order.payment.subtotal}
                shippingCost={order.shipping.cost}
                tax={order.payment.tax}
                total={order.payment.total}
              />

              <CustomerSupportCard 
                orderNumber={order.orderNumber}
                isDialogOpen={contactDialogOpen}
                onDialogOpenChange={setContactDialogOpen}
              />
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
