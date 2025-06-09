
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Euro, Sparkles } from 'lucide-react';

const ProPublishTicket = () => {
  return (
    <ProDashboardLayout title="Publier un billet">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Créer un nouvel événement</h1>
          <p className="text-muted-foreground">
            Créez votre événement avec des fonctionnalités pro avancées
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'événement</CardTitle>
                <CardDescription>
                  Remplissez les détails de votre événement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de l'événement *</Label>
                    <Input 
                      id="title" 
                      placeholder="Ex: Conférence Tech 2025" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conférence</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="concert">Concert</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="theater">Théâtre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Décrivez votre événement en détail..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date et heure *</Label>
                    <Input 
                      id="date" 
                      type="datetime-local" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lieu *</Label>
                    <Input 
                      id="location" 
                      placeholder="Ex: Centre de Conférences, Paris" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix par billet (€) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="50" 
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-tickets">Nombre total de billets *</Label>
                    <Input 
                      id="total-tickets" 
                      type="number" 
                      placeholder="100" 
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-per-person">Max par personne</Label>
                    <Input 
                      id="max-per-person" 
                      type="number" 
                      placeholder="5" 
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image de l'événement</Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Pro Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Fonctionnalités Pro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Analytics avancés</Label>
                  <p className="text-sm text-muted-foreground">
                    Suivez les ventes en temps réel avec des graphiques détaillés
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Codes promo</Label>
                  <p className="text-sm text-muted-foreground">
                    Créez des codes de réduction pour booster vos ventes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Support prioritaire</Label>
                  <p className="text-sm text-muted-foreground">
                    Assistance 24/7 pour vos événements
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Date à définir</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Lieu à définir</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Places disponibles: -</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Euro className="h-4 w-4" />
                  <span>Prix: - €</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Publier l'événement
              </Button>
              <Button variant="outline" className="w-full">
                Sauvegarder comme brouillon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProPublishTicket;
