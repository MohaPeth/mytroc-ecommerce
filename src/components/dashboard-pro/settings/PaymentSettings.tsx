
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentSettingsProps {
  onSave: () => void;
}

const PaymentSettings: React.FC<PaymentSettingsProps> = ({ onSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Méthodes de paiement</CardTitle>
        <CardDescription>
          Gérez vos informations de paiement et votre facturation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Coordonnées bancaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nom de la banque</Label>
              <Input id="bankName" defaultValue="Banque Nationale" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountName">Nom du titulaire</Label>
              <Input id="accountName" defaultValue="Jean Dupont" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input id="iban" defaultValue="FR76 1234 5678 9012 3456 7890 123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bic">BIC/SWIFT</Label>
              <Input id="bic" defaultValue="BNPAFR12345" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Informations de facturation</h3>
          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de l'entreprise (facultatif)</Label>
            <Input id="companyName" defaultValue="Électronique Premium SARL" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vatNumber">Numéro de TVA (facultatif)</Label>
            <Input id="vatNumber" defaultValue="FR12345678901" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingAddress">Adresse de facturation</Label>
            <Textarea id="billingAddress" defaultValue="123 Rue du Commerce, 75001 Paris, France" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Paramètres de paiement</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoWithdraw">Retraits automatiques</Label>
                <p className="text-sm text-muted-foreground">Transférer automatiquement vos revenus vers votre compte bancaire</p>
              </div>
              <Switch id="autoWithdraw" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="withdrawThreshold">Seuil de retrait</Label>
              <Select defaultValue="100">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un seuil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50 €</SelectItem>
                  <SelectItem value="100">100 €</SelectItem>
                  <SelectItem value="200">200 €</SelectItem>
                  <SelectItem value="500">500 €</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Les retraits automatiques seront effectués lorsque votre solde dépasse ce seuil
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSave}>Enregistrer les modifications</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSettings;
