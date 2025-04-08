
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Facebook, Instagram, Link, Tag, Twitter } from 'lucide-react';

const ProMarketing = () => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 14))
  );
  
  return (
    <ProDashboardLayout title="Marketing">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Outils marketing</h1>
          <p className="text-muted-foreground">
            Boostez vos ventes avec nos outils marketing premium
          </p>
        </div>
        <Button>Créer une nouvelle campagne</Button>
      </div>

      <Tabs defaultValue="promotions" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>

        {/* Onglet Promotions */}
        <TabsContent value="promotions">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Créer une promotion</CardTitle>
                <CardDescription>
                  Configurez une nouvelle promotion pour vos produits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="promoName">Nom de la promotion</Label>
                  <Input id="promoName" placeholder="ex: Soldes d'été" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="promoType">Type de promotion</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Pourcentage de réduction</SelectItem>
                      <SelectItem value="fixed">Montant fixe</SelectItem>
                      <SelectItem value="free-shipping">Livraison gratuite</SelectItem>
                      <SelectItem value="buy-x-get-y">Achetez X, obtenez Y</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountValue">Valeur de la réduction</Label>
                    <div className="flex">
                      <Input id="discountValue" placeholder="ex: 15" />
                      <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-gray-50">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minOrderValue">Commande minimale</Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                        €
                      </div>
                      <Input id="minOrderValue" placeholder="ex: 50" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, 'PPP', { locale: fr })
                          ) : (
                            <span>Choisir une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, 'PPP', { locale: fr })
                          ) : (
                            <span>Choisir une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="promoCode">Code promo (facultatif)</Label>
                  <div className="flex">
                    <Input id="promoCode" placeholder="ex: SUMMER25" />
                    <Button variant="outline" className="ml-2 whitespace-nowrap">
                      Générer
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Laissez vide pour une promotion automatique sans code
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Produits concernés</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner des produits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les produits</SelectItem>
                      <SelectItem value="category">Par catégorie</SelectItem>
                      <SelectItem value="specific">Produits spécifiques</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoPublish">Publication automatique</Label>
                    <p className="text-xs text-muted-foreground">
                      Publiez automatiquement la promotion à la date de début
                    </p>
                  </div>
                  <Switch id="autoPublish" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Annuler</Button>
                <Button>Créer la promotion</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promotions actives</CardTitle>
                <CardDescription>
                  Gérez vos promotions en cours et à venir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Soldes d'été</h3>
                        <p className="text-sm text-muted-foreground">15% de réduction sur tous les produits</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Code: SUMMER25 • Jusqu'au 31 juillet 2023
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Performances: </span>
                      <span>38 utilisations • 2,845€ de ventes</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Arrêter</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Livraison gratuite</h3>
                        <p className="text-sm text-muted-foreground">Pour toute commande supérieure à 50€</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sans code • Permanent
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Performances: </span>
                      <span>127 utilisations • 9,876€ de ventes</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Arrêter</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Black Friday</h3>
                        <p className="text-sm text-muted-foreground">30% de réduction sur l'électronique</p>
                      </div>
                      <Badge variant="outline">Programmée</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Code: BLACK30 • Du 25 au 29 novembre 2023
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Annuler</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Voir toutes les promotions</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Réseaux sociaux */}
        <TabsContent value="social">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Partage sur les réseaux sociaux</CardTitle>
                <CardDescription>
                  Générez et partagez du contenu sur vos réseaux sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Produit à promouvoir</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frigo">Mini Frigo</SelectItem>
                      <SelectItem value="laptop">Asus Zenbook</SelectItem>
                      <SelectItem value="coffee">Cafetière Moulinex</SelectItem>
                      <SelectItem value="earbuds">Écouteurs sans fil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postText">Texte du post</Label>
                  <Textarea 
                    id="postText"
                    placeholder="Écrivez le texte de votre publication..."
                    className="min-h-[100px]"
                    defaultValue="🔥 NOUVEAU : Notre Mini Frigo est enfin arrivé ! Compact et élégant, parfait pour votre chambre ou bureau. Profitez de -15% avec le code FRIGO15 !"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hashtags">Hashtags</Label>
                  <Input 
                    id="hashtags" 
                    placeholder="ex: #nouveau #promo #déco"
                    defaultValue="#MiniRefrigerator #HomeAppliances #DealOfTheDay #NewArrival"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Réseaux sociaux</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label htmlFor="schedulePost">Programmer la publication</Label>
                    <p className="text-xs text-muted-foreground">
                      Publiez automatiquement à une date et heure précises
                    </p>
                  </div>
                  <Switch id="schedulePost" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Aperçu</Button>
                <Button>Publier maintenant</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liens et codes de suivi</CardTitle>
                <CardDescription>
                  Créez des liens de suivi pour vos campagnes marketing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trackingProduct">Produit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frigo">Mini Frigo</SelectItem>
                      <SelectItem value="laptop">Asus Zenbook</SelectItem>
                      <SelectItem value="coffee">Cafetière Moulinex</SelectItem>
                      <SelectItem value="earbuds">Écouteurs sans fil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignSource">Source de la campagne</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Nom de la campagne</Label>
                  <Input id="campaignName" placeholder="ex: promo-ete-2023" />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Label className="mb-0">Lien de suivi</Label>
                    <Button variant="ghost" size="sm" className="h-6 ml-auto">
                      <Link className="h-3 w-3 mr-1" /> Copier
                    </Button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-sm break-all">
                    https://mytroc.com/produit/mini-frigo?utm_source=facebook&utm_medium=social&utm_campaign=promo-ete-2023
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex items-center mb-2">
                    <Label className="mb-0">Code QR</Label>
                    <Button variant="ghost" size="sm" className="h-6 ml-auto">
                      Télécharger
                    </Button>
                  </div>
                  <div className="flex justify-center py-4 bg-gray-50 rounded-md">
                    <div className="w-32 h-32 bg-white p-2 border">
                      [QR Code Placeholder]
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Générer le lien</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Campagnes actives</CardTitle>
              <CardDescription>
                Suivez les performances de vos campagnes marketing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Campagne</th>
                      <th className="text-left py-3 px-2">Source</th>
                      <th className="text-left py-3 px-2">Vues</th>
                      <th className="text-left py-3 px-2">Clics</th>
                      <th className="text-left py-3 px-2">Conversions</th>
                      <th className="text-left py-3 px-2">Taux</th>
                      <th className="text-left py-3 px-2">Revenus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">promo-ete-2023</td>
                      <td className="py-3 px-2">
                        <Badge className="bg-blue-500">Facebook</Badge>
                      </td>
                      <td className="py-3 px-2">1,245</td>
                      <td className="py-3 px-2">328</td>
                      <td className="py-3 px-2">42</td>
                      <td className="py-3 px-2">12.8%</td>
                      <td className="py-3 px-2">€3,450</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">black-friday</td>
                      <td className="py-3 px-2">
                        <Badge className="bg-pink-500">Instagram</Badge>
                      </td>
                      <td className="py-3 px-2">2,760</td>
                      <td className="py-3 px-2">512</td>
                      <td className="py-3 px-2">68</td>
                      <td className="py-3 px-2">13.3%</td>
                      <td className="py-3 px-2">€5,890</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">newsletter-juin</td>
                      <td className="py-3 px-2">
                        <Badge className="bg-gray-500">Email</Badge>
                      </td>
                      <td className="py-3 px-2">4,120</td>
                      <td className="py-3 px-2">756</td>
                      <td className="py-3 px-2">104</td>
                      <td className="py-3 px-2">13.8%</td>
                      <td className="py-3 px-2">€7,240</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Voir toutes les campagnes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Onglet Analyses */}
        <TabsContent value="analytics">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Performances marketing</CardTitle>
              <CardDescription>
                Vue d'ensemble de vos performances marketing pour le mois dernier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[
                  { label: "Vues totales", value: "15,248", change: "+12.5%" },
                  { label: "Taux de conversion", value: "3.8%", change: "+0.6%" },
                  { label: "Panier moyen", value: "€87.50", change: "+5.2%" },
                  { label: "Coût d'acquisition", value: "€12.40", change: "-3.1%" },
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} vs mois précédent
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Conseils d'optimisation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <Tag className="h-5 w-5 mr-2 text-blue-500" />
                      <p className="font-medium">Opportunités d'amélioration</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Augmentez vos taux de conversion en ajoutant plus d'images à vos fiches produits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Proposez des remises sur le premier achat pour attirer de nouveaux clients</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Utilisez des codes promos exclusifs pour vos abonnés sur les réseaux sociaux</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <Tag className="h-5 w-5 mr-2 text-purple-500" />
                      <p className="font-medium">Tendances du marché</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Les produits écologiques connaissent une hausse d'intérêt de 22% ce trimestre</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Les achats sur mobile représentent désormais 64% des transactions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Le paiement en plusieurs fois augmente le panier moyen de 18%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rapport de croissance</CardTitle>
              <CardDescription>
                Analysez votre progression et identifiez les axes d'amélioration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Votre boutique se développe à un rythme soutenu. Voici un aperçu de vos performances par rapport à la moyenne des vendeurs dans votre catégorie.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "Croissance des ventes", score: 78, avg: 65 },
                  { label: "Engagement client", score: 82, avg: 70 },
                  { label: "Optimisation SEO", score: 65, avg: 60 },
                  { label: "Taux de retour client", score: 90, avg: 55 },
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{metric.label}</p>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{metric.score}/100</span>
                        <Badge className="ml-2 bg-green-500 text-white">+{metric.score - metric.avg}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Moyenne de la catégorie: {metric.avg}/100
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Télécharger le rapport complet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </ProDashboardLayout>
  );
};

export default ProMarketing;
