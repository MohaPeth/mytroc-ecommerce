
import React, { useEffect, useRef } from 'react';
import { generateInvoicePDF, InvoiceData } from '@/utils/invoiceGenerator';

interface PreviewInvoiceProps {
  invoice: {
    id: string;
    customerName: string;
    customerEmail: string;
    date: Date;
    amount: number;
    status: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
}

const PreviewInvoice: React.FC<PreviewInvoiceProps> = ({ invoice }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Nettoyer le contenu précédent
      canvasRef.current.innerHTML = '';
      
      // Préparer les données pour la génération de la facture
      const invoiceData: InvoiceData = {
        invoiceNumber: invoice.id,
        date: invoice.date,
        customerName: invoice.customerName,
        customerEmail: invoice.customerEmail,
        items: invoice.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: invoice.amount,
        total: invoice.amount
      };
      
      // Générer le PDF
      const doc = generateInvoicePDF(invoiceData);
      
      // Convertir le PDF en base64 pour l'afficher
      const pdfDataUri = doc.output('datauristring');
      
      // Créer un iframe pour afficher le PDF
      const iframe = document.createElement('iframe');
      iframe.src = pdfDataUri;
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      
      // Ajouter l'iframe au conteneur
      canvasRef.current.appendChild(iframe);
    }
  }, [invoice]);

  return (
    <div className="bg-white rounded-md">
      <div ref={canvasRef} className="w-full"></div>
    </div>
  );
};

export default PreviewInvoice;
