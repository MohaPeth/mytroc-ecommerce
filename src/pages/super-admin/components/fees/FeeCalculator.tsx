
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { FeesGrid } from './FeesGrid';

// Types pour la grille tarifaire
export type CommissionRate = {
  id: string;
  minAmount: number;
  maxAmount: number | null;
  percentage: number;
};

export type DeliveryFee = {
  id: string;
  region: string;
  minWeight: number;
  maxWeight: number | null;
  fee: number;
};

// Données fictives pour la grille tarifaire
const initialCommissionRates: CommissionRate[] = [
  { id: '1', minAmount: 0, maxAmount: 50000, percentage: 5 },
  { id: '2', minAmount: 50000, maxAmount: 100000, percentage: 7 },
  { id: '3', minAmount: 100000, maxAmount: null, percentage: 10 },
];

const initialDeliveryFees: DeliveryFee[] = [
  { id: '1', region: 'Abidjan', minWeight: 0, maxWeight: 5, fee: 2000 },
  { id: '2', region: 'Abidjan', minWeight: 5, maxWeight: 10, fee: 2500 },
  { id: '3', region: 'Abidjan', minWeight: 10, maxWeight: null, fee: 3000 },
  { id: '4', region: 'Bouaké', minWeight: 0, maxWeight: 5, fee: 2000 },
  { id: '5', region: 'Bouaké', minWeight: 5, maxWeight: 10, fee: 3000 },
  { id: '6', region: 'Bouaké', minWeight: 10, maxWeight: null, fee: 4000 },
  { id: '7', region: 'Autre', minWeight: 0, maxWeight: 5, fee: 3000 },
  { id: '8', region: 'Autre', minWeight: 5, maxWeight: 10, fee: 4000 },
  { id: '9', region: 'Autre', minWeight: 10, maxWeight: null, fee: 5000 },
];

// Régions disponibles
const regions = ['Abidjan', 'Bouaké', 'Autre'];

const FeeCalculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  
  // États pour le calculateur
  const [amount, setAmount] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [results, setResults] = useState<{
    commission: number;
    deliveryFee: number;
    total: number;
    commissionDetails: string;
    deliveryDetails: string;
  } | null>(null);

  // États pour la grille tarifaire
  const [commissionRates, setCommissionRates] = useState<CommissionRate[]>(initialCommissionRates);
  const [deliveryFees, setDeliveryFees] = useState<DeliveryFee[]>(initialDeliveryFees);

  // Fonction pour calculer les frais
  const calculateFees = () => {
    if (!amount || !weight || !region) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const amountValue = parseFloat(amount);
    const weightValue = parseFloat(weight);

    if (isNaN(amountValue) || isNaN(weightValue)) {
      toast({
        title: "Valeurs invalides",
        description: "Le montant et le poids doivent être des nombres valides.",
        variant: "destructive",
      });
      return;
    }

    // Calcul de la commission
    const applicableCommissionRate = commissionRates.find(
      rate => amountValue >= rate.minAmount && (rate.maxAmount === null || amountValue < rate.maxAmount)
    );

    if (!applicableCommissionRate) {
      toast({
        title: "Erreur de calcul",
        description: "Impossible de trouver un taux de commission applicable.",
        variant: "destructive",
      });
      return;
    }

    const commission = (amountValue * applicableCommissionRate.percentage) / 100;
    const commissionDetails = `${applicableCommissionRate.percentage}% de ${amountValue.toLocaleString()} CFA`;

    // Calcul des frais de livraison
    const applicableDeliveryFee = deliveryFees.find(
      fee => fee.region === region && 
             weightValue >= fee.minWeight && 
             (fee.maxWeight === null || weightValue < fee.maxWeight)
    );

    if (!applicableDeliveryFee) {
      toast({
        title: "Erreur de calcul",
        description: "Impossible de trouver des frais de livraison applicables pour cette région et ce poids.",
        variant: "destructive",
      });
      return;
    }

    const deliveryFee = applicableDeliveryFee.fee;
    const deliveryDetails = `${deliveryFee.toLocaleString()} CFA (pour ${region}, ${weightValue} kg)`;

    // Total des frais
    const total = commission + deliveryFee;

    // Mettre à jour les résultats
    setResults({
      commission,
      deliveryFee,
      total,
      commissionDetails,
      deliveryDetails,
    });

    toast({
      title: "Calcul effectué",
      description: "Les frais ont été calculés avec succès.",
    });
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setAmount('');
    setWeight('');
    setRegion('');
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des frais</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="calculator">Calculateur de frais</TabsTrigger>
          <TabsTrigger value="grid">Grille tarifaire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculateur de frais</CardTitle>
              <CardDescription>
                Calculez automatiquement les frais (commission + livraison) pour une transaction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant de la transaction (CFA) *</Label>
                  <Input
                    id="amount"
                    placeholder="Ex: 100000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Poids du colis (kg) *</Label>
                  <Input
                    id="weight"
                    placeholder="Ex: 5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="region">Région de livraison *</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une région" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>Réinitialiser</Button>
              <Button onClick={calculateFees}>Calculer les frais</Button>
            </CardFooter>
          </Card>
          
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Résultats du calcul</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Commission</h3>
                    <p className="text-xl font-bold">{results.commission.toLocaleString()} CFA</p>
                    <p className="text-sm text-muted-foreground">{results.commissionDetails}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Frais de livraison</h3>
                    <p className="text-xl font-bold">{results.deliveryFee.toLocaleString()} CFA</p>
                    <p className="text-sm text-muted-foreground">{results.deliveryDetails}</p>
                  </div>
                  
                  <div className="md:col-span-2 border-t pt-4">
                    <h3 className="font-medium text-sm text-muted-foreground">Total des frais</h3>
                    <p className="text-2xl font-bold text-primary">{results.total.toLocaleString()} CFA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="grid">
          <FeesGrid 
            commissionRates={commissionRates}
            setCommissionRates={setCommissionRates}
            deliveryFees={deliveryFees}
            setDeliveryFees={setDeliveryFees}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeeCalculator;
