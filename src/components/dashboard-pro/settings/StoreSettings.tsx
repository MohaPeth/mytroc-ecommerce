
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Languages, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StoreSettingsProps {
  onSave: () => void;
}

const StoreSettings: React.FC<StoreSettingsProps> = ({ onSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de la boutique</CardTitle>
        <CardDescription>
          Gérez les informations de votre boutique
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="storeName">Nom de la boutique</Label>
          <Input id="storeName" defaultValue="Électronique Premium" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeDescription">Description de la boutique</Label>
          <Textarea 
            id="storeDescription" 
            defaultValue="Boutique spécialisée dans les produits électroniques de haute qualité. Nous proposons une large gamme de produits à des prix compétitifs."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="storeURL">URL de la boutique</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                mytroc.com/
              </span>
              <Input id="storeURL" defaultValue="electronique-premium" className="rounded-l-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeCategory">Catégorie principale</Label>
            <Select defaultValue="electronics">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Électronique</SelectItem>
                <SelectItem value="clothing">Vêtements</SelectItem>
                <SelectItem value="home">Maison & Jardin</SelectItem>
                <SelectItem value="beauty">Beauté & Santé</SelectItem>
                <SelectItem value="toys">Jouets & Jeux</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeLanguages">Langues supportées</Label>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              Français <X className="h-3 w-3 cursor-pointer" />
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              Anglais <X className="h-3 w-3 cursor-pointer" />
            </Badge>
            <Button variant="outline" size="sm" className="h-7">
              <Languages className="h-3 w-3 mr-1" /> Ajouter
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Options de la boutique</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableReviews">Activer les avis</Label>
                <p className="text-sm text-muted-foreground">Permettre aux clients de laisser des avis sur vos produits</p>
              </div>
              <Switch id="enableReviews" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableOffers">Activer les offres</Label>
                <p className="text-sm text-muted-foreground">Permettre aux clients de faire des offres sur vos produits</p>
              </div>
              <Switch id="enableOffers" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showStock">Afficher le stock</Label>
                <p className="text-sm text-muted-foreground">Montrer aux clients combien d'articles sont disponibles</p>
              </div>
              <Switch id="showStock" />
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

export default StoreSettings;
