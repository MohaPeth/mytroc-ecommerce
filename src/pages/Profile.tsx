import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  User, MessageSquare, Settings, Shield, Home, Package, CreditCard, 
  RefreshCcw, Gift, Heart, BellOff, BellPlus, HeadphonesIcon, LogOut, 
  ShoppingBag, MapPin, Trash, Info, Lock, CheckCircle, Edit, Phone, Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const dummyOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: 3
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "processing",
    total: 149.50,
    items: 1
  }
];

const dummyAddresses = [
  {
    id: 1,
    type: "home",
    name: "John Doe",
    street: "123 Main Street",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    phone: "+33 1 23 45 67 89",
    isDefault: true
  },
  {
    id: 2,
    type: "work",
    name: "John Doe",
    street: "456 Business Avenue",
    city: "Lyon",
    postalCode: "69001",
    country: "France",
    phone: "+33 1 98 76 54 32",
    isDefault: false
  }
];

const dummyPaymentMethods = [
  {
    id: 1,
    type: "card",
    last4: "4242",
    expiry: "12/24",
    brand: "visa",
    isDefault: true
  },
  {
    id: 2,
    type: "card",
    last4: "8888",
    expiry: "06/25",
    brand: "mastercard",
    isDefault: false
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('tableau-de-bord');
  const isMobile = useIsMobile();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    promotional: false
  });
  
  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    toast.success(`Notifications ${notifications[type] ? 'désactivées' : 'activées'}`);
  };

  const handleDeleteAddress = (id: number) => {
    toast.success('Adresse supprimée avec succès');
  };

  const handleDeletePaymentMethod = (id: number) => {
    toast.success('Moyen de paiement supprimé avec succès');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profil mis à jour avec succès');
  };

  const renderTabMenu = () => (
    <div className={`${isMobile ? 'w-full' : 'w-64'} mr-0 md:mr-8`}>
      <Card className="sticky top-20">
        <CardContent className={`p-0 ${isMobile ? 'overflow-x-auto' : ''}`}>
          {isMobile ? (
            <ScrollArea className="whitespace-nowrap py-4">
              <TabsList className="flex w-auto pl-4 h-10 space-x-1">
                <TabsTrigger value="tableau-de-bord" className="px-3 py-1 text-xs truncate">
                  <User className="h-3 w-3 mr-1" /> Tableau
                </TabsTrigger>
                <TabsTrigger value="informations" className="px-3 py-1 text-xs truncate">
                  <Info className="h-3 w-3 mr-1" /> Profil
                </TabsTrigger>
                <TabsTrigger value="adresses" className="px-3 py-1 text-xs truncate">
                  <MapPin className="h-3 w-3 mr-1" /> Adresses
                </TabsTrigger>
                <TabsTrigger value="commandes" className="px-3 py-1 text-xs truncate">
                  <Package className="h-3 w-3 mr-1" /> Commandes
                </TabsTrigger>
                <TabsTrigger value="paiements" className="px-3 py-1 text-xs truncate">
                  <CreditCard className="h-3 w-3 mr-1" /> Paiements
                </TabsTrigger>
                <TabsTrigger value="retours" className="px-3 py-1 text-xs truncate">
                  <RefreshCcw className="h-3 w-3 mr-1" /> Retours
                </TabsTrigger>
                <TabsTrigger value="bons" className="px-3 py-1 text-xs truncate">
                  <Gift className="h-3 w-3 mr-1" /> Bons
                </TabsTrigger>
                <TabsTrigger value="souhaits" className="px-3 py-1 text-xs truncate">
                  <Heart className="h-3 w-3 mr-1" /> Souhaits
                </TabsTrigger>
                <TabsTrigger value="notifications" className="px-3 py-1 text-xs truncate">
                  <BellPlus className="h-3 w-3 mr-1" /> Notifs
                </TabsTrigger>
                <TabsTrigger value="support" className="px-3 py-1 text-xs truncate">
                  <HeadphonesIcon className="h-3 w-3 mr-1" /> Support
                </TabsTrigger>
                <TabsTrigger value="securite" className="px-3 py-1 text-xs truncate">
                  <Shield className="h-3 w-3 mr-1" /> Sécurité
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          ) : (
            <div className="space-y-1 p-4">
              <Button 
                variant={activeTab === 'tableau-de-bord' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('tableau-de-bord')}
              >
                <User className="h-4 w-4 mr-2" /> Tableau de bord
              </Button>
              <Button 
                variant={activeTab === 'informations' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('informations')}
              >
                <Info className="h-4 w-4 mr-2" /> Informations
              </Button>
              <Button 
                variant={activeTab === 'adresses' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('adresses')}
              >
                <MapPin className="h-4 w-4 mr-2" /> Adresses
              </Button>
              <Button 
                variant={activeTab === 'commandes' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('commandes')}
              >
                <Package className="h-4 w-4 mr-2" /> Commandes
              </Button>
              <Button 
                variant={activeTab === 'paiements' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('paiements')}
              >
                <CreditCard className="h-4 w-4 mr-2" /> Paiements
              </Button>
              <Button 
                variant={activeTab === 'retours' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('retours')}
              >
                <RefreshCcw className="h-4 w-4 mr-2" /> Retours
              </Button>
              <Button 
                variant={activeTab === 'bons' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('bons')}
              >
                <Gift className="h-4 w-4 mr-2" /> Bons de réduction
              </Button>
              <Button 
                variant={activeTab === 'souhaits' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('souhaits')}
              >
                <Heart className="h-4 w-4 mr-2" /> Liste de souhaits
              </Button>
              <Button 
                variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('notifications')}
              >
                <BellPlus className="h-4 w-4 mr-2" /> Notifications
              </Button>
              <Button 
                variant={activeTab === 'support' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('support')}
              >
                <HeadphonesIcon className="h-4 w-4 mr-2" /> Support
              </Button>
              <Button 
                variant={activeTab === 'securite' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('securite')}
              >
                <Shield className="h-4 w-4 mr-2" /> Sécurité
              </Button>
              <Separator className="my-2" />
              <Button variant="outline" className="w-full justify-start text-red-500">
                <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
          <CardDescription>Vos 5 dernières commandes</CardDescription>
        </CardHeader>
        <CardContent>
          {dummyOrders.map(order => (
            <div key={order.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                {order.status === 'delivered' ? 'Livré' : 'En cours'}
              </Badge>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Package className="mr-2 h-4 w-4" /> Voir toutes les commandes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adresses</CardTitle>
          <CardDescription>Vos adresses enregistrées</CardDescription>
        </CardHeader>
        <CardContent>
          {dummyAddresses.map(address => (
            <div key={address.id} className="flex items-start justify-between py-2">
              <div>
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-muted-foreground">{address.street}</p>
                <p className="text-sm text-muted-foreground">
                  {address.postalCode} {address.city}
                </p>
              </div>
              {address.isDefault && (
                <Badge variant="secondary">Par défaut</Badge>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <MapPin className="mr-2 h-4 w-4" /> Gérer les adresses
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <form onSubmit={handleUpdateProfile}>
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Mettez à jour vos informations personnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" type="tel" placeholder="+33 1 23 45 67 89" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Mettre à jour
          </Button>
        </CardFooter>
      </Card>
    </form>
  );

  const renderAddresses = () => (
    <div className="space-y-4">
      {dummyAddresses.map(address => (
        <Card key={address.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle>{address.type === 'home' ? 'Domicile' : 'Travail'}</CardTitle>
                {address.isDefault && (
                  <Badge variant="secondary">Par défaut</Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{address.name}</p>
            <p className="text-sm text-muted-foreground">{address.street}</p>
            <p className="text-sm text-muted-foreground">
              {address.postalCode} {address.city}
            </p>
            <p className="text-sm text-muted-foreground">{address.phone}</p>
          </CardContent>
        </Card>
      ))}
      <Button className="w-full">
        <MapPin className="mr-2 h-4 w-4" /> Ajouter une adresse
      </Button>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      {dummyOrders.map(order => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{order.id}</CardTitle>
              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                {order.status === 'delivered' ? 'Livré' : 'En cours'}
              </Badge>
            </div>
            <CardDescription>
              Commandé le {order.date} • {order.items} article(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Total: {order.total}€</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Voir les détails
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-4">
      {dummyPaymentMethods.map(method => (
        <Card key={method.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle>
                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)}
                </CardTitle>
                {method.isDefault && (
                  <Badge variant="secondary">Par défaut</Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeletePaymentMethod(method.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">**** **** **** {method.last4}</p>
            <p className="text-sm text-muted-foreground">Expire {method.expiry}</p>
          </CardContent>
        </Card>
      ))}
      <Button className="w-full">
        <CreditCard className="mr-2 h-4 w-4" /> Ajouter un moyen de paiement
      </Button>
    </div>
  );

  const renderNotifications = () => (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
        <CardDescription>
          Gérez vos préférences de notification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications par email</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des mises à jour par email
            </p>
          </div>
          <Switch
            checked={notifications.email}
            onCheckedChange={() => handleNotificationChange('email')}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications push</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des notifications sur votre appareil
            </p>
          </div>
          <Switch
            checked={notifications.push}
            onCheckedChange={() => handleNotificationChange('push')}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>SMS</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des notifications par SMS
            </p>
          </div>
          <Switch
            checked={notifications.sms}
            onCheckedChange={() => handleNotificationChange('sms')}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Offres promotionnelles</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des offres et promotions
            </p>
          </div>
          <Switch
            checked={notifications.promotional}
            onCheckedChange={() => handleNotificationChange('promotional')}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderSecurity = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Mot de passe</CardTitle>
          <CardDescription>
            Mettez à jour votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nouveau mot de passe</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            Mettre à jour le mot de passe
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentification à deux facteurs</CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <Lock className="mr-2 h-4 w-4" /> Configurer l'authentification 2FA
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Mon Compte</h1>
      
      {isMobile ? (
        <Tabs defaultValue="tableau-de-bord" value={activeTab} onValueChange={setActiveTab}>
          {renderTabMenu()}
          
          <div className="w-full mt-4">
            <TabsContent value="tableau-de-bord">{renderDashboard()}</TabsContent>
            <TabsContent value="informations">{renderProfile()}</TabsContent>
            <TabsContent value="adresses">{renderAddresses()}</TabsContent>
            <TabsContent value="commandes">{renderOrders()}</TabsContent>
            <TabsContent value="paiements">{renderPayments()}</TabsContent>
            <TabsContent value="notifications">{renderNotifications()}</TabsContent>
            <TabsContent value="securite">{renderSecurity()}</TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {renderTabMenu()}
          
          <div className="flex-1">
            {activeTab === 'tableau-de-bord' && renderDashboard()}
            {activeTab === 'informations' && renderProfile()}
            {activeTab === 'adresses' && renderAddresses()}
            {activeTab === 'commandes' && renderOrders()}
            {activeTab === 'paiements' && renderPayments()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'securite' && renderSecurity()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
