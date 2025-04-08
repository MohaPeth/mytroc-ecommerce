import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mail, Bell, Lock, CreditCard, Languages, Store, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProSettings = () => {
  const { toast } = useToast();

  const handleSaveSettings = (settingType: string) => {
    toast({
      title: "Paramètres mis à jour",
      description: `Vos paramètres ${settingType} ont été mis à jour avec succès.`,
    });
  };

  return (
    <ProDashboardLayout title="Paramètres">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Paramètres du compte</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre compte vendeur premium
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profil</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span>Boutique</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Paiement</span>
          </TabsTrigger>
        </TabsList>

        {/* Onglet Profil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Jean Dupont</h3>
                  <p className="text-sm text-muted-foreground">Vendeur Premium depuis Janvier 2023</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Jean" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Dupont" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <Input id="email" defaultValue="jean.dupont@example.com" readOnly />
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="+33 6 12 34 56 78" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" defaultValue="123 Rue du Commerce, 75001 Paris, France" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" defaultValue="Paris" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Code postal</Label>
                  <Input id="zip" defaultValue="75001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="be">Belgique</SelectItem>
                      <SelectItem value="ch">Suisse</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('du profil')}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Onglet Boutique */}
        <TabsContent value="store">
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
              <Button onClick={() => handleSaveSettings('de la boutique')}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Onglet Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>
                Configurez comment vous souhaitez être informé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notifications par email</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailOrders">Nouvelles commandes</Label>
                      <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouvelle commande</p>
                    </div>
                    <Switch id="emailOrders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailOffers">Nouvelles offres</Label>
                      <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouvelle offre</p>
                    </div>
                    <Switch id="emailOffers" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailReviews">Nouveaux avis</Label>
                      <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouveau avis</p>
                    </div>
                    <Switch id="emailReviews" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailMarketing">Conseils marketing</Label>
                      <p className="text-sm text-muted-foreground">Recevoir des conseils pour améliorer vos ventes</p>
                    </div>
                    <Switch id="emailMarketing" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notifications sur la plateforme</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushOrders">Nouvelles commandes</Label>
                      <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvelle commande</p>
                    </div>
                    <Switch id="pushOrders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushOffers">Nouvelles offres</Label>
                      <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvelle offre</p>
                    </div>
                    <Switch id="pushOffers" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushReviews">Nouveaux avis</Label>
                      <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau avis</p>
                    </div>
                    <Switch id="pushReviews" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushMessages">Messages des clients</Label>
                      <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau message</p>
                    </div>
                    <Switch id="pushMessages" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailDigest">Résumé d'activité</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Fréquence du résumé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Temps réel</SelectItem>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="never">Jamais</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Recevez un résumé de toutes vos activités selon la fréquence choisie
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('de notifications')}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Onglet Sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte vendeur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Mot de passe</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button variant="outline">Changer le mot de passe</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Activer l'authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez une couche de sécurité supplémentaire à votre compte
                    </p>
                  </div>
                  <Switch id="twoFactor" />
                </div>
                <Button variant="outline" disabled>Configurer l'authentification à deux facteurs</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Sessions actives</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chrome sur Windows</p>
                        <p className="text-sm text-muted-foreground">Paris, France • Dernière activité: il y a 2 minutes</p>
                      </div>
                      <Badge>Actuelle</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Safari sur iPhone</p>
                        <p className="text-sm text-muted-foreground">Paris, France • Dernière activité: hier</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Déconnecter</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Déconnecter toutes les autres sessions</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('de sécurité')}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Onglet Paiement */}
        <TabsContent value="payment">
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
              <Button onClick={() => handleSaveSettings('de paiement')}>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </ProDashboardLayout>
  );
};

export default ProSettings;
