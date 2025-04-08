
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { FileUpload, X, Info, DollarSign, Percent, BarChart3, PackagePlus, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ProAddProduct = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout de produit
    toast({
      title: "Produit ajouté",
      description: "Votre produit a été ajouté avec succès à votre catalogue.",
    });
  };

  return (
    <ProDashboardLayout title="Ajouter un produit">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Créer un nouveau produit</h1>
          <p className="text-muted-foreground">
            Ajoutez un nouveau produit à votre catalogue avec toutes les informations nécessaires
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Annuler</Button>
          <Button type="submit" form="product-form">Publier le produit</Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="w-full">
          <div className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                <span>Général</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <FileUpload className="h-4 w-4" />
                <span>Médias</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Prix</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <PackagePlus className="h-4 w-4" />
                <span>Stock</span>
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>SEO</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Onglet Informations générales */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du produit</CardTitle>
                    <CardDescription>
                      Entrez les informations de base de votre produit
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du produit</Label>
                      <Input id="name" placeholder="Nom du produit" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Description détaillée du produit..." 
                        className="min-h-32" 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Électronique</SelectItem>
                            <SelectItem value="clothing">Vêtements</SelectItem>
                            <SelectItem value="home">Maison & Jardin</SelectItem>
                            <SelectItem value="beauty">Beauté & Santé</SelectItem>
                            <SelectItem value="sports">Sports & Loisirs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Sous-catégorie</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une sous-catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smartphones">Smartphones</SelectItem>
                            <SelectItem value="laptops">Ordinateurs portables</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="tv">Télévisions</SelectItem>
                            <SelectItem value="accessories">Accessoires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marque</Label>
                      <Input id="brand" placeholder="Marque du produit" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">État du produit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner l'état" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Neuf</SelectItem>
                          <SelectItem value="like-new">Comme neuf</SelectItem>
                          <SelectItem value="good">Bon état</SelectItem>
                          <SelectItem value="used">Utilisé</SelectItem>
                          <SelectItem value="refurbished">Reconditionné</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Spécifications techniques</CardTitle>
                    <CardDescription>
                      Ajoutez les caractéristiques techniques de votre produit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="color">Couleur</Label>
                          <Input id="color" placeholder="ex: Noir, Blanc..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="size">Taille/Dimensions</Label>
                          <Input id="size" placeholder="ex: M, L, 15cm..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Poids</Label>
                          <Input id="weight" placeholder="ex: 250g, 1.5kg..." />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Caractéristiques additionnelles</Label>
                        <Textarea placeholder="Ajoutez d'autres spécifications techniques..." />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statut & Visibilité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Publier</Label>
                        <p className="text-sm text-muted-foreground">Rendre le produit visible dans la boutique</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Mettre en avant</Label>
                        <p className="text-sm text-muted-foreground">Afficher dans la section "À la une"</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Étiquettes</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          Nouveau <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          Tendance <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                        <Button variant="outline" size="sm" className="h-7">+ Ajouter</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Avantages premium</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="premium1" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="premium1">Visibilité accrue</Label>
                        <p className="text-xs text-muted-foreground">Produit mis en avant dans les résultats de recherche</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="premium2" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="premium2">Badge vendeur vérifié</Label>
                        <p className="text-xs text-muted-foreground">Affiche un badge de confiance sur votre produit</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="premium3" />
                      <div className="space-y-1">
                        <Label htmlFor="premium3">Publicité marketing</Label>
                        <p className="text-xs text-muted-foreground">Inclure dans les campagnes d'emails</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Médias */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Images et médias</CardTitle>
                <CardDescription>
                  Ajoutez des photos et vidéos de votre produit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <FileUpload className="h-10 w-10 text-muted-foreground" />
                    <h3 className="font-medium">Glissez-déposez vos fichiers</h3>
                    <p className="text-sm text-muted-foreground">ou</p>
                    <Button>Parcourir les fichiers</Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, WEBP jusqu'à 5MB (max 8 images)
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Vidéo du produit (facultatif)</Label>
                  <Input placeholder="URL YouTube ou Vimeo" />
                  <p className="text-xs text-muted-foreground">
                    Les vendeurs premium peuvent ajouter des vidéos à leurs produits pour une meilleure présentation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Prix */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Tarification</CardTitle>
                <CardDescription>
                  Définissez le prix et les options de votre produit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix (€)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="price" type="number" className="pl-9" placeholder="0.00" min="0" step="0.01" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="compare-price">Prix barré (€) - Facultatif</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="compare-price" type="number" className="pl-9" placeholder="0.00" min="0" step="0.01" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Utilisé pour afficher un prix réduit. Le prix barré sera affiché à côté du prix actuel.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="discount">Réduction (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="discount" type="number" className="pl-9" placeholder="0" min="0" max="100" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tax">Taux de TVA (%)</Label>
                      <Select defaultValue="20">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un taux" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0% - Exonéré</SelectItem>
                          <SelectItem value="5.5">5.5% - Taux réduit</SelectItem>
                          <SelectItem value="10">10% - Taux intermédiaire</SelectItem>
                          <SelectItem value="20">20% - Taux normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="inline-flex items-center">
                        Offres spéciales
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                              <Info className="h-3 w-3" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <p className="text-xs">
                              Les vendeurs premium peuvent proposer des offres spéciales et des promotions
                            </p>
                          </PopoverContent>
                        </Popover>
                      </Label>
                      <p className="text-sm text-muted-foreground">Proposer des prix dégressifs ou des offres groupées</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2 pl-4 border-l-2 border-muted">
                    <div className="grid grid-cols-4 gap-2">
                      <Label className="self-center text-sm">Quantité</Label>
                      <Label className="self-center text-sm">Prix unitaire (€)</Label>
                      <Label className="self-center text-sm">Réduction (%)</Label>
                      <div></div>
                      
                      <Input type="number" defaultValue="5" min="2" placeholder="Qté min" />
                      <Input type="number" defaultValue="280" placeholder="Prix" />
                      <Input type="number" defaultValue="7" placeholder="%" />
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <Input type="number" defaultValue="10" min="2" placeholder="Qté min" />
                      <Input type="number" defaultValue="250" placeholder="Prix" />
                      <Input type="number" defaultValue="17" placeholder="%" />
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-2">
                      + Ajouter un palier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Stock & Livraison */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Stock & Livraison</CardTitle>
                <CardDescription>
                  Gérez le stock et les options de livraison
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Gestion du stock</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sku">Référence (SKU)</Label>
                      <Input id="sku" placeholder="ex: PROD-12345" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inventory">Quantité en stock</Label>
                      <Input id="inventory" type="number" min="0" defaultValue="10" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Suivre le stock</Label>
                        <p className="text-sm text-muted-foreground">Modifier automatiquement la disponibilité</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="threshold">Seuil d'alerte stock bas</Label>
                      <Input id="threshold" type="number" min="0" defaultValue="3" />
                      <p className="text-xs text-muted-foreground">
                        Vous recevrez une notification lorsque le stock atteindra ce niveau
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Options de livraison</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="delivery1" defaultChecked />
                        <div className="space-y-1">
                          <Label htmlFor="delivery1">Livraison standard</Label>
                          <p className="text-xs text-muted-foreground">3-5 jours ouvrés</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="delivery2" defaultChecked />
                        <div className="space-y-1">
                          <Label htmlFor="delivery2">Livraison express</Label>
                          <p className="text-xs text-muted-foreground">1-2 jours ouvrés</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="delivery3" />
                        <div className="space-y-1">
                          <Label htmlFor="delivery3">Retrait en point relais</Label>
                          <p className="text-xs text-muted-foreground">Disponible en 24h</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="shipping-cost">Frais de livraison (€)</Label>
                      <Input id="shipping-cost" type="number" min="0" step="0.01" defaultValue="4.99" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Livraison gratuite</Label>
                        <p className="text-sm text-muted-foreground">À partir de 50€ d'achat</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet SEO */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>Optimisation pour les moteurs de recherche</CardTitle>
                <CardDescription>
                  Améliorez la visibilité de votre produit dans les résultats de recherche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Titre SEO</Label>
                  <Input id="meta-title" placeholder="Titre optimisé pour les moteurs de recherche" />
                  <p className="text-xs text-muted-foreground">
                    60-70 caractères recommandés. Le titre apparaîtra dans les résultats de recherche.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Description SEO</Label>
                  <Textarea 
                    id="meta-description" 
                    placeholder="Description optimisée pour les moteurs de recherche..." 
                    className="min-h-20" 
                  />
                  <p className="text-xs text-muted-foreground">
                    150-160 caractères recommandés. Cette description apparaîtra dans les résultats de recherche.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Mots-clés</Label>
                  <Input id="keywords" placeholder="ex: smartphone, android, 5G, appareil photo..." />
                  <p className="text-xs text-muted-foreground">
                    Séparez les mots-clés par des virgules. Incluez des termes pertinents pour améliorer la visibilité.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url-handle">URL personnalisée</Label>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">mytroc.com/produit/</span>
                    <Input id="url-handle" placeholder="nom-du-produit" className="flex-1" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Utilisez des tirets pour séparer les mots, sans espaces ni caractères spéciaux.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline">Enregistrer comme brouillon</Button>
          <Button type="submit">Publier le produit</Button>
        </div>
      </form>
    </ProDashboardLayout>
  );
};

export default ProAddProduct;
