
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { usePaymentMethods, PaymentMethod } from '@/hooks/usePaymentMethods';

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ open, onOpenChange }) => {
  const [type, setType] = useState<'card' | 'mobile_money' | 'cash_on_delivery'>('card');
  const [name, setName] = useState('');
  const [details, setDetails] = useState<Record<string, any>>({});
  const [isDefault, setIsDefault] = useState(false);
  const { addPaymentMethod, loading } = usePaymentMethods();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await addPaymentMethod({
      type,
      name,
      details,
      is_default: isDefault,
    });

    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setType('card');
    setName('');
    setDetails({});
    setIsDefault(false);
  };

  const handleDetailsChange = (key: string, value: string) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une méthode de paiement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Carte bancaire</SelectItem>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                <SelectItem value="cash_on_delivery">Paiement à la livraison</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Visa se terminant par 1234"
              required
            />
          </div>

          {type === 'card' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="card-number">Numéros de fin de carte</Label>
                <Input
                  id="card-number"
                  value={details.lastFourDigits || ''}
                  onChange={(e) => handleDetailsChange('lastFourDigits', e.target.value)}
                  placeholder="1234"
                  maxLength={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Date d'expiration</Label>
                <Input
                  id="expiry"
                  value={details.expiryDate || ''}
                  onChange={(e) => handleDetailsChange('expiryDate', e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
            </>
          )}

          {type === 'mobile_money' && (
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input
                id="phone"
                value={details.phoneNumber || ''}
                onChange={(e) => handleDetailsChange('phoneNumber', e.target.value)}
                placeholder="+221773027085"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="is-default"
              checked={isDefault}
              onCheckedChange={setIsDefault}
            />
            <Label htmlFor="is-default">Définir comme méthode par défaut</Label>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentMethodModal;
