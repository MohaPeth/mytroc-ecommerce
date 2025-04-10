
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Flag, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReportProductDialogProps {
  productId: number;
  productName: string;
  sellerName: string;
  trigger?: React.ReactNode;
}

const ReportProductDialog: React.FC<ReportProductDialogProps> = ({
  productId,
  productName,
  sellerName,
  trigger
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison pour le signalement",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, this would be an API call to submit the report
    // Example: await submitReport({ productId, reason, comment, screenshot });
    console.log('Report submitted:', { productId, reason, comment, screenshot });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      
      // Reset form
      setReason('');
      setComment('');
      setScreenshot(null);
      
      toast({
        title: "Signalement envoyé",
        description: "Nous vous remercions pour votre vigilance. Notre équipe va examiner ce signalement rapidement.",
      });
    }, 1000);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <Flag className="h-4 w-4 mr-2" />
            Signaler cette annonce
          </Button>
        </DialogTrigger>
      )}
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Signaler cette annonce
          </DialogTitle>
          <DialogDescription>
            Si vous pensez que cette annonce enfreint les règles de MyTroc, veuillez la signaler à notre équipe.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="rounded-md bg-muted p-3 text-sm">
              <p><span className="font-medium">Produit :</span> {productName}</p>
              <p><span className="font-medium">Vendeur :</span> {sellerName}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason" className="font-medium">
              Raison du signalement <span className="text-red-500">*</span>
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason" className="w-full">
                <SelectValue placeholder="Sélectionnez une raison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="misleading">Contenu trompeur ou frauduleux</SelectItem>
                <SelectItem value="nonconforming">Produit non conforme à la description</SelectItem>
                <SelectItem value="pricing">Prix excessif ou suspect</SelectItem>
                <SelectItem value="inappropriate">Contenu inapproprié ou offensant</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment" className="font-medium">
              Commentaire (facultatif)
            </Label>
            <Textarea 
              id="comment" 
              placeholder="Expliquez la raison de votre signalement..." 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="screenshot" className="font-medium">
              Capture d'écran (facultatif)
            </Label>
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('screenshot')?.click()}
                className="w-full h-20 border-dashed flex flex-col items-center justify-center gap-1"
              >
                <Upload className="h-5 w-5" />
                <span className="text-xs">Cliquez pour ajouter une image</span>
                {screenshot && (
                  <span className="text-xs text-green-600 font-medium">
                    {screenshot.name}
                  </span>
                )}
              </Button>
              <input 
                id="screenshot" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !reason}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Traitement...
                </>
              ) : (
                <>
                  <Flag className="h-4 w-4" />
                  Soumettre le signalement
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportProductDialog;
