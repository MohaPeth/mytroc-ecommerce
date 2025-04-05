
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import PreviewInvoice from '../PreviewInvoice';
import { Invoice } from './InvoicesTable';

interface InvoicePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInvoice: Invoice | null;
  onDownload: (invoice: Invoice) => void;
}

const InvoicePreviewDialog: React.FC<InvoicePreviewDialogProps> = ({
  open,
  onOpenChange,
  selectedInvoice,
  onDownload
}) => {
  if (!selectedInvoice) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Aperçu de la facture {selectedInvoice.id}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <PreviewInvoice invoice={selectedInvoice} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button onClick={() => onDownload(selectedInvoice)}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePreviewDialog;
