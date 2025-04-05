
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types pour les données de facture
export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: Date;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  deliveryFee?: number;
  tax?: number;
  total: number;
}

export const generateInvoicePDF = (data: InvoiceData): jsPDF => {
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  
  // En-tête avec le logo (ici on simule un logo avec du texte)
  doc.setFontSize(22);
  doc.setTextColor(0, 128, 0); // Vert
  doc.text('MyTroc', 20, 20);
  
  // Titre de la facture
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('FACTURE', 105, 20, { align: 'center' });
  
  // Informations de l'entreprise
  doc.setFontSize(10);
  doc.text('MyTroc SAS', 20, 30);
  doc.text('123 Rue du Commerce', 20, 35);
  doc.text('75001 Paris, France', 20, 40);
  doc.text('contact@mytroc.fr | +33 1 23 45 67 89', 20, 45);
  
  // Numéro et date de facture
  doc.setFontSize(12);
  doc.text(`Facture N° ${data.invoiceNumber}`, 140, 30);
  doc.text(`Date: ${format(data.date, 'dd/MM/yyyy', { locale: fr })}`, 140, 35);
  
  // Ligne de séparation
  doc.setDrawColor(220, 220, 220);
  doc.line(20, 50, 190, 50);
  
  // Informations du client
  doc.setFontSize(12);
  doc.text('Facturé à:', 20, 60);
  doc.setFontSize(10);
  doc.text(data.customerName, 20, 65);
  doc.text(data.customerEmail, 20, 70);
  if (data.customerPhone) {
    doc.text(data.customerPhone, 20, 75);
  }
  if (data.customerAddress) {
    const addressLines = data.customerAddress.split(',');
    addressLines.forEach((line, index) => {
      doc.text(line.trim(), 20, 75 + (index * 5));
    });
  }
  
  // Tableau des articles
  const tableColumn = ["Produit", "Quantité", "Prix unitaire (€)", "Total (€)"];
  const tableRows = data.items.map(item => [
    item.name,
    item.quantity.toString(),
    (item.price / 100).toFixed(2),
    ((item.price * item.quantity) / 100).toFixed(2)
  ]);
  
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 90,
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] }
  });
  
  // Calcul de la position Y après le tableau
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Récapitulatif financier
  doc.text('Récapitulatif:', 130, finalY);
  doc.text(`Sous-total:`, 130, finalY + 5);
  doc.text(`${(data.subtotal / 100).toFixed(2)} €`, 170, finalY + 5, { align: 'right' });
  
  let yOffset = 10;
  if (data.deliveryFee !== undefined) {
    doc.text(`Frais de livraison:`, 130, finalY + yOffset);
    doc.text(`${(data.deliveryFee / 100).toFixed(2)} €`, 170, finalY + yOffset, { align: 'right' });
    yOffset += 5;
  }
  
  if (data.tax !== undefined) {
    doc.text(`TVA:`, 130, finalY + yOffset);
    doc.text(`${(data.tax / 100).toFixed(2)} €`, 170, finalY + yOffset, { align: 'right' });
    yOffset += 5;
  }
  
  // Total
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total:`, 130, finalY + yOffset);
  doc.text(`${(data.total / 100).toFixed(2)} €`, 170, finalY + yOffset, { align: 'right' });
  
  // Pied de page avec mentions légales
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("MyTroc SAS - SIREN 123456789 - TVA FR12345678900", 105, 280, { align: 'center' });
  doc.text("Merci pour votre confiance et à bientôt sur MyTroc!", 105, 285, { align: 'center' });
  
  return doc;
};

export const downloadInvoice = (data: InvoiceData): void => {
  const doc = generateInvoicePDF(data);
  doc.save(`Facture_${data.invoiceNumber}.pdf`);
};
