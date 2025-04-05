
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadInvoice } from '@/utils/invoiceGenerator';
import { toast } from '@/hooks/use-toast';

interface InvoiceDownloadButtonProps {
  order: {
    id: string;
    date: Date;
    customerName: string;
    customerEmail: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    subtotal?: number;
    deliveryFee?: number;
    tax?: number;
  };
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const InvoiceDownloadButton: React.FC<InvoiceDownloadButtonProps> = ({ 
  order, 
  variant = "outline", 
  size = "default",
  className
}) => {
  const handleDownload = () => {
    try {
      // Prépare les données pour la génération de la facture
      const invoiceData = {
        invoiceNumber: `INV-${order.id}`,
        date: order.date || new Date(),
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        subtotal: order.subtotal || order.total,
        deliveryFee: order.deliveryFee,
        tax: order.tax,
        total: order.total
      };
      
      // Télécharge la facture
      downloadInvoice(invoiceData);
      
      toast({
        title: "Téléchargement réussi",
        description: "La facture a été générée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la génération de la facture:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de la facture",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleDownload}
      className={className}
    >
      <Download className={size === "icon" ? "h-4 w-4" : "mr-2 h-4 w-4"} />
      {size !== "icon" && "Télécharger la facture"}
    </Button>
  );
};

export default InvoiceDownloadButton;
