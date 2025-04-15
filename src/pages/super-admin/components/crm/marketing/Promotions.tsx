
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Megaphone, 
  Plus, 
  PenSquare, 
  Trash2, 
  TagIcon,
  PercentIcon,
  CalendarClock,
  ShoppingCart,
  Users,
  BarChart4
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import PromotionForm from './forms/PromotionForm';
import { toast } from 'sonner';

// Données d'exemple pour les promotions
const INITIAL_PROMOTIONS = [
  {
    id: 1,
    name: "Soldes de printemps",
    code: "SPRING25",
    discount: 25,
    discountType: "percent",
    status: "active",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    usageCount: 238,
    usageLimit: 500,
    categories: ["électronique", "maison"],
    minAmount: 50,
    createdAt: "2025-03-15"
  },
  {
    id: 2,
    name: "Bienvenue nouvel utilisateur",
    code: "WELCOME10",
    discount: 10,
    discountType: "percent",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    usageCount: 426,
    usageLimit: 0,
    categories: ["tous"],
    minAmount: 30,
    createdAt: "2025-01-01"
  },
  {
    id: 3,
    name: "Livraison gratuite",
    code: "FREESHIP",
    discount: 0,
    discountType: "shipping",
    status: "active",
    startDate: "2025-03-15",
    endDate: "2025-05-15",
    usageCount: 187,
    usageLimit: 300,
    categories: ["tous"],
    minAmount: 100,
    createdAt: "2025-03-10"
  },
  {
    id: 4,
    name: "Soldes d'été",
    code: "SUMMER30",
    discount: 30,
    discountType: "percent",
    status: "scheduled",
    startDate: "2025-06-15",
    endDate: "2025-07-15",
    usageCount: 0,
    usageLimit: 0,
    categories: ["vêtements", "accessoires"],
    minAmount: 0,
    createdAt: "2025-04-10"
  },
  {
    id: 5,
    name: "Remise fidélité",
    code: "LOYAL15",
    discount: 15,
    discountType: "percent",
    status: "expired",
    startDate: "2025-02-01",
    endDate: "2025-03-01",
    usageCount: 142,
    usageLimit: 200,
    categories: ["tous"],
    minAmount: 0,
    createdAt: "2025-01-20"
  }
];

const Promotions = () => {
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<typeof INITIAL_PROMOTIONS[0] | null>(null);

  const handleFormSubmit = (data: any) => {
    if (editingPromotion) {
      // Mise à jour d'une promotion existante
      setPromotions(promotions.map(promo => 
        promo.id === editingPromotion.id ? { 
          ...promo, 
          ...data
        } : promo
      ));
      toast.success(`La promotion "${data.name}" a été mise à jour`);
    } else {
      // Création d'une nouvelle promotion
      const newPromotion = {
        id: Math.max(0, ...promotions.map(p => p.id)) + 1,
        ...data,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPromotions([...promotions, newPromotion]);
      toast.success(`La promotion "${data.name}" a été créée`);
    }
    
    setIsFormOpen(false);
    setEditingPromotion(null);
  };

  const handleEditPromotion = (promotion: typeof INITIAL_PROMOTIONS[0]) => {
    setEditingPromotion(promotion);
    setIsFormOpen(true);
  };

  const handleDeletePromotion = (id: number) => {
    const promotionToDelete = promotions.find(p => p.id === id);
    setPromotions(promotions.filter(promotion => promotion.id !== id));
    toast.success(`La promotion "${promotionToDelete?.name}" a été supprimée`);
  };

  const handleDuplicatePromotion = (promotion: typeof INITIAL_PROMOTIONS[0]) => {
    const newPromotion = {
      ...promotion,
      id: Math.max(0, ...promotions.map(p => p.id)) + 1,
      name: `Copie de ${promotion.name}`,
      code: `${promotion.code}_COPY`,
      status: 'draft',
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPromotions([...promotions, newPromotion]);
    toast.success(`La promotion "${promotion.name}" a été dupliquée`);
  };

  const openNewPromotionForm = () => {
    setEditingPromotion(null);
    setIsFormOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Brouillon</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Programmée</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'expired':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Expirée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  const getDiscountLabel = (promotion: typeof INITIAL_PROMOTIONS[0]) => {
    switch (promotion.discountType) {
      case 'percent':
        return `${promotion.discount}% de réduction`;
      case 'amount':
        return `${promotion.discount}€ de réduction`;
      case 'shipping':
        return 'Livraison gratuite';
      default:
        return 'Réduction';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Promotions et codes promo</CardTitle>
          <CardDescription>
            Créez et gérez des codes promotionnels pour stimuler les ventes
          </CardDescription>
        </div>
        <Button onClick={openNewPromotionForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle promotion
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Réduction</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Utilisation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell className="font-medium">
                  <div>
                    {promotion.name}
                    <div className="text-xs text-muted-foreground mt-1">
                      Min. {promotion.minAmount > 0 ? `${promotion.minAmount}€` : 'aucun'}
                      {promotion.categories.length > 0 && 
                        promotion.categories[0] !== 'tous' && 
                        ` • ${promotion.categories.join(', ')}`}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {promotion.code}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {promotion.discountType === 'percent' ? (
                      <PercentIcon className="h-4 w-4 text-muted-foreground" />
                    ) : promotion.discountType === 'shipping' ? (
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <TagIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{getDiscountLabel(promotion)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      {promotion.startDate} - {promotion.endDate}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(promotion.status)}
                </TableCell>
                <TableCell>
                  {promotion.status !== 'draft' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>{promotion.usageCount} utilisations</span>
                        {promotion.usageLimit > 0 && (
                          <span className="font-medium">{Math.round(promotion.usageCount / promotion.usageLimit * 100)}%</span>
                        )}
                      </div>
                      {promotion.usageLimit > 0 ? (
                        <Progress value={promotion.usageCount / promotion.usageLimit * 100} className="h-1" />
                      ) : (
                        <span className="text-xs text-muted-foreground">Illimité</span>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditPromotion(promotion)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDuplicatePromotion(promotion)}
                    >
                      <TagIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeletePromotion(promotion.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total : {promotions.length} promotions, {promotions.filter(p => p.status === 'active').length} actives
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart4 className="h-4 w-4" />
          Analyser l'impact
        </Button>
      </CardFooter>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPromotion ? 'Modifier la promotion' : 'Créer une nouvelle promotion'}
            </DialogTitle>
            <DialogDescription>
              {editingPromotion 
                ? 'Modifiez les paramètres de la promotion existante' 
                : 'Définissez les paramètres de votre nouvelle promotion'}
            </DialogDescription>
          </DialogHeader>
          <PromotionForm 
            onSubmit={handleFormSubmit}
            initialData={editingPromotion}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Promotions;
