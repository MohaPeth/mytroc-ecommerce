
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePromoCodes } from '@/hooks/usePromoCodes';

interface AddPromoCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPromoCodeModal: React.FC<AddPromoCodeModalProps> = ({ open, onOpenChange }) => {
  const [code, setCode] = useState('');
  const { addPromoCode, loading } = usePromoCodes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) return;

    const success = await addPromoCode({ code: code.trim().toUpperCase() });
    
    if (success) {
      onOpenChange(false);
      setCode('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un code promo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="promo-code">Code promo</Label>
            <Input
              id="promo-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Entrez votre code promo"
              className="uppercase"
              required
            />
            <p className="text-sm text-gray-500">
              Entrez un code promo valide pour bénéficier de réductions
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading || !code.trim()}>
              {loading ? "Vérification..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPromoCodeModal;
