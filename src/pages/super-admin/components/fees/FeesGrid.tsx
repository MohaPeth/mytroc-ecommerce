
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { CommissionRate, DeliveryFee } from './FeeCalculator';

interface FeesGridProps {
  commissionRates: CommissionRate[];
  setCommissionRates: React.Dispatch<React.SetStateAction<CommissionRate[]>>;
  deliveryFees: DeliveryFee[];
  setDeliveryFees: React.Dispatch<React.SetStateAction<DeliveryFee[]>>;
}

export const FeesGrid: React.FC<FeesGridProps> = ({
  commissionRates,
  setCommissionRates,
  deliveryFees,
  setDeliveryFees,
}) => {
  const [activeFeeTab, setActiveFeeTab] = useState('commission');
  
  // États pour le formulaire de commission
  const [showCommissionDialog, setShowCommissionDialog] = useState(false);
  const [commissionFormData, setCommissionFormData] = useState<{
    id?: string;
    minAmount: string;
    maxAmount: string;
    percentage: string;
  }>({
    minAmount: '',
    maxAmount: '',
    percentage: '',
  });
  const [editingCommissionId, setEditingCommissionId] = useState<string | null>(null);
  
  // États pour le formulaire de frais de livraison
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [deliveryFormData, setDeliveryFormData] = useState<{
    id?: string;
    region: string;
    minWeight: string;
    maxWeight: string;
    fee: string;
  }>({
    region: '',
    minWeight: '',
    maxWeight: '',
    fee: '',
  });
  const [editingDeliveryId, setEditingDeliveryId] = useState<string | null>(null);
  
  // Gestion des commissions
  const handleAddCommission = () => {
    setCommissionFormData({
      minAmount: '',
      maxAmount: '',
      percentage: '',
    });
    setEditingCommissionId(null);
    setShowCommissionDialog(true);
  };
  
  const handleEditCommission = (rate: CommissionRate) => {
    setCommissionFormData({
      minAmount: rate.minAmount.toString(),
      maxAmount: rate.maxAmount ? rate.maxAmount.toString() : '',
      percentage: rate.percentage.toString(),
    });
    setEditingCommissionId(rate.id);
    setShowCommissionDialog(true);
  };
  
  const handleDeleteCommission = (id: string) => {
    setCommissionRates(commissionRates.filter(rate => rate.id !== id));
    toast({
      title: "Taux supprimé",
      description: "Le taux de commission a été supprimé avec succès.",
    });
  };
  
  const handleSaveCommission = () => {
    const { minAmount, maxAmount, percentage } = commissionFormData;
    
    if (!minAmount || !percentage) {
      toast({
        title: "Champs incomplets",
        description: "Le montant minimum et le pourcentage sont obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    const minAmountNum = parseFloat(minAmount);
    const maxAmountNum = maxAmount ? parseFloat(maxAmount) : null;
    const percentageNum = parseFloat(percentage);
    
    if (isNaN(minAmountNum) || (maxAmount && isNaN(maxAmountNum)) || isNaN(percentageNum)) {
      toast({
        title: "Valeurs invalides",
        description: "Veuillez entrer des valeurs numériques valides.",
        variant: "destructive",
      });
      return;
    }
    
    if (maxAmountNum !== null && minAmountNum >= maxAmountNum) {
      toast({
        title: "Plage invalide",
        description: "Le montant minimum doit être inférieur au montant maximum.",
        variant: "destructive",
      });
      return;
    }
    
    if (percentageNum <= 0 || percentageNum > 100) {
      toast({
        title: "Pourcentage invalide",
        description: "Le pourcentage doit être compris entre 0 et 100.",
        variant: "destructive",
      });
      return;
    }
    
    const newCommissionRate: CommissionRate = {
      id: editingCommissionId || Date.now().toString(),
      minAmount: minAmountNum,
      maxAmount: maxAmountNum,
      percentage: percentageNum,
    };
    
    if (editingCommissionId) {
      setCommissionRates(commissionRates.map(rate => 
        rate.id === editingCommissionId ? newCommissionRate : rate
      ));
      toast({
        title: "Taux modifié",
        description: "Le taux de commission a été modifié avec succès.",
      });
    } else {
      setCommissionRates([...commissionRates, newCommissionRate]);
      toast({
        title: "Taux ajouté",
        description: "Le nouveau taux de commission a été ajouté avec succès.",
      });
    }
    
    setShowCommissionDialog(false);
  };
  
  // Gestion des frais de livraison
  const handleAddDelivery = () => {
    setDeliveryFormData({
      region: '',
      minWeight: '',
      maxWeight: '',
      fee: '',
    });
    setEditingDeliveryId(null);
    setShowDeliveryDialog(true);
  };
  
  const handleEditDelivery = (fee: DeliveryFee) => {
    setDeliveryFormData({
      region: fee.region,
      minWeight: fee.minWeight.toString(),
      maxWeight: fee.maxWeight ? fee.maxWeight.toString() : '',
      fee: fee.fee.toString(),
    });
    setEditingDeliveryId(fee.id);
    setShowDeliveryDialog(true);
  };
  
  const handleDeleteDelivery = (id: string) => {
    setDeliveryFees(deliveryFees.filter(fee => fee.id !== id));
    toast({
      title: "Frais supprimés",
      description: "Les frais de livraison ont été supprimés avec succès.",
    });
  };
  
  const handleSaveDelivery = () => {
    const { region, minWeight, maxWeight, fee } = deliveryFormData;
    
    if (!region || !minWeight || !fee) {
      toast({
        title: "Champs incomplets",
        description: "La région, le poids minimum et le montant sont obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    const minWeightNum = parseFloat(minWeight);
    const maxWeightNum = maxWeight ? parseFloat(maxWeight) : null;
    const feeNum = parseFloat(fee);
    
    if (isNaN(minWeightNum) || (maxWeight && isNaN(maxWeightNum)) || isNaN(feeNum)) {
      toast({
        title: "Valeurs invalides",
        description: "Veuillez entrer des valeurs numériques valides.",
        variant: "destructive",
      });
      return;
    }
    
    if (maxWeightNum !== null && minWeightNum >= maxWeightNum) {
      toast({
        title: "Plage invalide",
        description: "Le poids minimum doit être inférieur au poids maximum.",
        variant: "destructive",
      });
      return;
    }
    
    if (feeNum < 0) {
      toast({
        title: "Montant invalide",
        description: "Le montant des frais ne peut pas être négatif.",
        variant: "destructive",
      });
      return;
    }
    
    const newDeliveryFee: DeliveryFee = {
      id: editingDeliveryId || Date.now().toString(),
      region,
      minWeight: minWeightNum,
      maxWeight: maxWeightNum,
      fee: feeNum,
    };
    
    if (editingDeliveryId) {
      setDeliveryFees(deliveryFees.map(fee => 
        fee.id === editingDeliveryId ? newDeliveryFee : fee
      ));
      toast({
        title: "Frais modifiés",
        description: "Les frais de livraison ont été modifiés avec succès.",
      });
    } else {
      setDeliveryFees([...deliveryFees, newDeliveryFee]);
      toast({
        title: "Frais ajoutés",
        description: "Les nouveaux frais de livraison ont été ajoutés avec succès.",
      });
    }
    
    setShowDeliveryDialog(false);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeFeeTab} onValueChange={setActiveFeeTab}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="commission">Taux de commission</TabsTrigger>
          <TabsTrigger value="delivery">Frais de livraison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Grille des taux de commission</CardTitle>
                <CardDescription>
                  Gérez les taux de commission en fonction du montant de la transaction.
                </CardDescription>
              </div>
              <Button onClick={handleAddCommission}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Montant minimum (CFA)</TableHead>
                    <TableHead>Montant maximum (CFA)</TableHead>
                    <TableHead>Pourcentage (%)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionRates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell>{rate.minAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        {rate.maxAmount ? rate.maxAmount.toLocaleString() : 'Illimité'}
                      </TableCell>
                      <TableCell>{rate.percentage}%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCommission(rate)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCommission(rate.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {commissionRates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Aucun taux de commission défini
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Grille des frais de livraison</CardTitle>
                <CardDescription>
                  Gérez les frais de livraison en fonction de la région et du poids.
                </CardDescription>
              </div>
              <Button onClick={handleAddDelivery}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Région</TableHead>
                    <TableHead>Poids minimum (kg)</TableHead>
                    <TableHead>Poids maximum (kg)</TableHead>
                    <TableHead>Montant (CFA)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>{fee.region}</TableCell>
                      <TableCell>{fee.minWeight}</TableCell>
                      <TableCell>
                        {fee.maxWeight ? fee.maxWeight : 'Illimité'}
                      </TableCell>
                      <TableCell>{fee.fee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditDelivery(fee)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteDelivery(fee.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {deliveryFees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Aucun frais de livraison défini
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog pour ajouter/modifier une commission */}
      <Dialog open={showCommissionDialog} onOpenChange={setShowCommissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCommissionId ? 'Modifier un taux de commission' : 'Ajouter un taux de commission'}
            </DialogTitle>
            <DialogDescription>
              Définissez une tranche de montant et le pourcentage de commission associé.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAmount">Montant minimum (CFA)*</Label>
                <Input
                  id="minAmount"
                  placeholder="Ex: 0"
                  value={commissionFormData.minAmount}
                  onChange={(e) => setCommissionFormData({...commissionFormData, minAmount: e.target.value})}
                  type="number"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxAmount">Montant maximum (CFA)</Label>
                <Input
                  id="maxAmount"
                  placeholder="Laisser vide pour illimité"
                  value={commissionFormData.maxAmount}
                  onChange={(e) => setCommissionFormData({...commissionFormData, maxAmount: e.target.value})}
                  type="number"
                  min="0"
                />
                <p className="text-xs text-muted-foreground">Laisser vide pour illimité</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="percentage">Pourcentage (%)*</Label>
              <Input
                id="percentage"
                placeholder="Ex: 5"
                value={commissionFormData.percentage}
                onChange={(e) => setCommissionFormData({...commissionFormData, percentage: e.target.value})}
                type="number"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCommissionDialog(false)}>Annuler</Button>
            <Button onClick={handleSaveCommission}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour ajouter/modifier des frais de livraison */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingDeliveryId ? 'Modifier des frais de livraison' : 'Ajouter des frais de livraison'}
            </DialogTitle>
            <DialogDescription>
              Définissez les frais de livraison en fonction de la région et du poids.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="region">Région*</Label>
              <Select 
                value={deliveryFormData.region} 
                onValueChange={(value) => setDeliveryFormData({...deliveryFormData, region: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abidjan">Abidjan</SelectItem>
                  <SelectItem value="Bouaké">Bouaké</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minWeight">Poids minimum (kg)*</Label>
                <Input
                  id="minWeight"
                  placeholder="Ex: 0"
                  value={deliveryFormData.minWeight}
                  onChange={(e) => setDeliveryFormData({...deliveryFormData, minWeight: e.target.value})}
                  type="number"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxWeight">Poids maximum (kg)</Label>
                <Input
                  id="maxWeight"
                  placeholder="Laisser vide pour illimité"
                  value={deliveryFormData.maxWeight}
                  onChange={(e) => setDeliveryFormData({...deliveryFormData, maxWeight: e.target.value})}
                  type="number"
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-muted-foreground">Laisser vide pour illimité</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fee">Montant (CFA)*</Label>
              <Input
                id="fee"
                placeholder="Ex: 2000"
                value={deliveryFormData.fee}
                onChange={(e) => setDeliveryFormData({...deliveryFormData, fee: e.target.value})}
                type="number"
                min="0"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeliveryDialog(false)}>Annuler</Button>
            <Button onClick={handleSaveDelivery}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
