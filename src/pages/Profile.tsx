
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  User, MessageSquare, Settings, Shield, Home, Package, CreditCard, 
  RefreshCcw, Gift, Heart, BellOff, BellPlus, HeadphonesIcon, LogOut, 
  ShoppingBag, MapPin, Trash, Info, Lock, CheckCircle, Edit, Phone, Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data
  const userData = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    profileImage: "/placeholder.svg",
    orderCount: 8,
    pendingOrders: 2,
    balance: 150,
    loyaltyPoints: 350,
    wishlistCount: 12,
    notifications: 4,
    addresses: [
      { id: 1, type: 'livraison', name: 'Domicile', street: '15 Rue du Commerce', city: 'Paris', postal: '75015', country: 'France', isDefault: true },
      { id: 2, type: 'facturation', name: 'Bureau', street: '8 Avenue des Champs-Élysées', city: 'Paris', postal: '75008', country: 'France', isDefault: false }
    ],
    paymentMethods: [
      { id: 1, type: 'card', name: 'Visa se terminant par 4242', expires: '12/25', isDefault: true },
      { id: 2, type: 'paypal', name: 'PayPal', email: 'jean.dupont@example.com', isDefault: false }
    ],
    orders: [
      { id: 'CMD-2024-001', date: '15/03/2024', total: '€349.99', status: 'Livré', items: 3 },
      { id: 'CMD-2024-002', date: '28/03/2024', total: '€129.50', status: 'En cours', items: 1 },
      { id: 'CMD-2024-003', date: '02/04/2024', total: '€75.00', status: 'En préparation', items: 2 }
    ],
    returns: [
      { id: 'RET-2024-001', orderId: 'CMD-2024-001', date: '20/03/2024', status: 'Remboursé', amount: '€129.99' }
    ],
    coupons: [
      { id: 1, code: 'SUMMER25', discount: '25%', expires: '30/06/2024', isUsed: false },
      { id: 2, code: 'WELCOME10', discount: '10€', expires: '31/12/2024', isUsed: false }
    ],
    wishlist: [
      { id: 1, name: 'Machine à laver Bosch Serie 6', price: '€549.99', inStock: true },
      { id: 2, name: 'Réfrigérateur Samsung Family Hub', price: '€1299.99', inStock: true },
      { id: 3, name: 'Aspirateur Dyson V11', price: '€499.99', inStock: false }
    ],
    supportTickets: [
      { id: 'TIK-2024-001', subject: 'Question sur garantie', date: '10/03/2024', status: 'Résolu' },
      { id: 'TIK-2024-002', subject: 'Problème de livraison', date: '05/04/2024', status: 'En attente' }
    ]
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };

  const handleSaveAddress = () => {
    toast({
      title: "Adresse sauvegardée",
      description: "Votre nouvelle adresse a été enregistrée avec succès.",
    });
  };

  const handleDeleteAddress = (id: number) => {
    toast({
      title: "Adresse supprimée",
      description: "L'adresse a été supprimée avec succès.",
    });
  };

  const handleRemovePaymentMethod = (id: number) => {
    toast({
      title: "Moyen de paiement supprimé",
      description: "Le moyen de paiement a été supprimé avec succès.",
    });
  };

  const handleRequestReturn = () => {
    toast({
      title: "Demande de retour envoyée",
      description: "Votre demande de retour a été soumise avec succès. Nous la traiterons dans les plus brefs délais.",
    });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (confirmed) {
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès. Vous allez être redirigé vers la page d'accueil.",
      });
      // Redirect logic would go here
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative mr-4">
                <img 
                  src={userData.profileImage} 
                  alt="Photo de profil" 
                  className="h-16 w-16 rounded-full border-2 border-mytroc-primary"
                />
                <button className="absolute bottom-0 right-0 bg-mytroc-primary text-white rounded-full p-1 shadow-md">
                  <Edit className="h-3 w-3" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>Support</span>
              </Button>
              <Button variant="default" size="sm" className="space-x-1">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="dashboard" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-gray-100 p-1 overflow-x-auto flex flex-nowrap">
              <TabsTrigger value="dashboard" className="flex items-center space-x-1">
                <Home className="h-4 w-4 mr-1" />
                <span>Tableau de bord</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-1">
                <User className="h-4 w-4 mr-1" />
                <span>Informations</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Adresses</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-1">
                <ShoppingBag className="h-4 w-4 mr-1" />
                <span>Commandes</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center space-x-1">
                <CreditCard className="h-4 w-4 mr-1" />
                <span>Paiements</span>
              </TabsTrigger>
              <TabsTrigger value="returns" className="flex items-center space-x-1">
                <RefreshCcw className="h-4 w-4 mr-1" />
                <span>Retours</span>
              </TabsTrigger>
              <TabsTrigger value="coupons" className="flex items-center space-x-1">
                <Gift className="h-4 w-4 mr-1" />
                <span>Réductions</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center space-x-1">
                <Heart className="h-4 w-4 mr-1" />
                <span>Favoris</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-1">
                <BellPlus className="h-4 w-4 mr-1" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center space-x-1">
                <HeadphonesIcon className="h-4 w-4 mr-1" />
                <span>Support</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-1">
                <Shield className="h-4 w-4 mr-1" />
                <span>Sécurité</span>
              </TabsTrigger>
            </TabsList>

            {/* 1. TABLEAU DE BORD */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mes commandes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl font-bold text-mytroc-primary">
                    {userData.orderCount}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({userData.pendingOrders} en cours)
                    </span>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab('orders')}>
                      Voir toutes mes commandes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mon solde</CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl font-bold text-mytroc-primary">
                    {userData.balance}€
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({userData.loyaltyPoints} points)
                    </span>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab('coupons')}>
                      Voir mes avantages
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Liste de souhaits</CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl font-bold text-mytroc-primary">
                    {userData.wishlistCount}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (articles)
                    </span>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab('wishlist')}>
                      Voir ma liste de souhaits
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes récentes</CardTitle>
                    <CardDescription>Vos dernières commandes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Numéro</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userData.orders.slice(0, 3).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  order.status === 'Livré' ? 'bg-green-100 text-green-800' :
                                  order.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                      Voir toutes les commandes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>Dernières actions sur votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Commande expédiée</p>
                        <p className="text-sm text-gray-500">Votre commande CMD-2024-002 a été expédiée</p>
                        <p className="text-xs text-gray-400">Il y a 2 heures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Paiement accepté</p>
                        <p className="text-sm text-gray-500">Votre paiement pour CMD-2024-003 a été accepté</p>
                        <p className="text-xs text-gray-400">Il y a 1 jour</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <Gift className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Points de fidélité ajoutés</p>
                        <p className="text-sm text-gray-500">Vous avez gagné 50 points de fidélité</p>
                        <p className="text-xs text-gray-400">Il y a 3 jours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 2. INFORMATIONS PERSONNELLES */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Gérez vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" defaultValue={userData.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" defaultValue={userData.lastName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue={userData.phone} />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Sécurité du compte</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Changer mon mot de passe</span>
                      </Button>
                      <Button variant="outline" className="space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Activer l'authentification à deux facteurs</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <Button onClick={handleSaveProfile}>Enregistrer les modifications</Button>
                  <Button variant="destructive" size="sm" onClick={handleDeleteAccount} className="space-x-1">
                    <Trash className="h-4 w-4" />
                    <span>Supprimer mon compte</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* 3. ADRESSES */}
            <TabsContent value="addresses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {userData.addresses.map((address) => (
                  <Card key={address.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-lg">{address.name}</CardTitle>
                        <CardDescription>{address.type.charAt(0).toUpperCase() + address.type.slice(1)}</CardDescription>
                      </div>
                      {address.isDefault && (
                        <Badge className="bg-mytroc-primary hover:bg-mytroc-primary/90">Par défaut</Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{address.street}</p>
                      <p className="text-gray-700">{address.postal} {address.city}</p>
                      <p className="text-gray-700">{address.country}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Modifier</Button>
                      {!address.isDefault && (
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteAddress(address.id)}>Supprimer</Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                  <div className="text-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-full inline-block mb-2">
                      <MapPin className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium">Ajouter une adresse</h3>
                    <p className="text-sm text-gray-500">Ajoutez une nouvelle adresse de livraison ou de facturation</p>
                  </div>
                  <Button onClick={handleSaveAddress}>Ajouter une adresse</Button>
                </Card>
              </div>
            </TabsContent>

            {/* 4. HISTORIQUE DES COMMANDES */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des commandes</CardTitle>
                  <CardDescription>Retrouvez l'ensemble de vos commandes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numéro</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                order.status === 'Livré' ? 'bg-green-100 text-green-800' :
                                order.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Détails
                              </Button>
                              {order.status === 'Livré' && (
                                <Button variant="outline" size="sm" onClick={() => setActiveTab('returns')}>
                                  Retourner
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 5. MOYENS DE PAIEMENT */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Moyens de paiement</CardTitle>
                  <CardDescription>Gérez vos moyens de paiement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          {method.type === 'card' ? (
                            <CreditCard className="h-10 w-10 text-mytroc-primary mr-3" />
                          ) : (
                            <div className="bg-blue-500 text-white h-10 w-10 rounded-md flex items-center justify-center mr-3">P</div>
                          )}
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500">
                              {method.type === 'card' ? `Expire le ${method.expires}` : method.email}
                            </p>
                            {method.isDefault && (
                              <Badge className="mt-1 bg-gray-100 text-gray-800">Par défaut</Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemovePaymentMethod(method.id)}>
                          <Trash className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-6">
                    <Button>Ajouter un moyen de paiement</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 6. RETOURS ET REMBOURSEMENTS */}
            <TabsContent value="returns">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des retours</CardTitle>
                      <CardDescription>Suivez l'état de vos retours et remboursements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData.returns.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Référence</TableHead>
                              <TableHead>Commande</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Montant</TableHead>
                              <TableHead>Statut</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {userData.returns.map((returnItem) => (
                              <TableRow key={returnItem.id}>
                                <TableCell className="font-medium">{returnItem.id}</TableCell>
                                <TableCell>{returnItem.orderId}</TableCell>
                                <TableCell>{returnItem.date}</TableCell>
                                <TableCell>{returnItem.amount}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-100 text-green-800">
                                    {returnItem.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8">
                          <RefreshCcw className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700">Aucun retour</h3>
                          <p className="text-gray-500 mt-1">Vous n'avez effectué aucun retour pour le moment.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Demande de retour</CardTitle>
                      <CardDescription>Retournez un article d'une commande récente</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="orderSelect">Numéro de commande</Label>
                        <select id="orderSelect" className="w-full p-2 border rounded-md">
                          {userData.orders.map(order => (
                            <option key={order.id} value={order.id}>{order.id}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reason">Motif du retour</Label>
                        <select id="reason" className="w-full p-2 border rounded-md">
                          <option value="damaged">Produit endommagé</option>
                          <option value="wrong">Produit incorrect</option>
                          <option value="notNeeded">Produit non désiré</option>
                          <option value="other">Autre raison</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="comments">Commentaires</Label>
                        <textarea 
                          id="comments"
                          className="w-full p-2 border rounded-md h-24 resize-none"
                          placeholder="Décrivez votre problème..."
                        ></textarea>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={handleRequestReturn}>
                        Demander un retour
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 7. BONS DE RÉDUCTION ET RÉCOMPENSES */}
            <TabsContent value="coupons">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vos bons de réduction</CardTitle>
                      <CardDescription>Codes promo et réductions disponibles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.coupons.map((coupon) => (
                          <div key={coupon.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                              <Badge className="bg-mytroc-primary">{coupon.discount} de réduction</Badge>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Info className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <div>
                                <p className="font-mono font-bold text-lg">{coupon.code}</p>
                                <p className="text-xs text-gray-500">Valable jusqu'au {coupon.expires}</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => {
                                navigator.clipboard.writeText(coupon.code);
                                toast({
                                  title: "Code copié !",
                                  description: "Le code promo a été copié dans votre presse-papier.",
                                });
                              }}>
                                Copier
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Programme de fidélité</CardTitle>
                      <CardDescription>Vos points et avantages</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-mytroc-primary/10 rounded-lg">
                        <h3 className="text-4xl font-bold text-mytroc-primary">{userData.loyaltyPoints}</h3>
                        <p className="text-sm text-gray-600">points disponibles</p>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium mb-3">Récompenses disponibles</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">5€ de réduction</p>
                              <p className="text-sm text-gray-500">Sur votre prochaine commande</p>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.loyaltyPoints < 100}>
                              100 points
                            </Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">Livraison gratuite</p>
                              <p className="text-sm text-gray-500">Pour votre prochaine commande</p>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.loyaltyPoints < 200}>
                              200 points
                            </Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">15€ de réduction</p>
                              <p className="text-sm text-gray-500">Sur votre prochaine commande</p>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.loyaltyPoints < 300}>
                              300 points
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 8. LISTE DE SOUHAITS */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Liste de souhaits</CardTitle>
                  <CardDescription>Articles que vous avez sauvegardés pour plus tard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.wishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          <Package className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium line-clamp-2 h-12">{item.name}</h3>
                          <div className="flex justify-between items-center mt-3">
                            <p className="font-bold text-mytroc-primary">{item.price}</p>
                            <Badge className={item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {item.inStock ? 'En stock' : 'Rupture de stock'}
                            </Badge>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button className="flex-1" disabled={!item.inStock}>
                              Ajouter au panier
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 9. NOTIFICATIONS ET PREFERENCES */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notifications</CardTitle>
                  <CardDescription>Personnalisez les notifications que vous souhaitez recevoir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Types de notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <ShoppingBag className="h-5 w-5 text-mytroc-primary mr-2" />
                          <div>
                            <h4 className="font-medium">Notifications de commandes</h4>
                            <p className="text-sm text-gray-500">Recevez des mises à jour sur vos commandes</p>
                          </div>
                        </div>
                        <Button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-200">Activé</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 text-pink-500 mr-2" />
                          <div>
                            <h4 className="font-medium">Promotions et offres spéciales</h4>
                            <p className="text-sm text-gray-500">Recevez des offres exclusives et des promotions</p>
                          </div>
                        </div>
                        <Button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-200">Activé</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 text-gray-600 mr-2" />
                          <div>
                            <h4 className="font-medium">Notifications système</h4>
                            <p className="text-sm text-gray-500">Mises à jour importantes concernant votre compte</p>
                          </div>
                        </div>
                        <Button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-200">Activé</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Canaux de notification</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Notifications par e-mail</h4>
                          <p className="text-sm text-gray-500">Recevez des notifications par e-mail</p>
                        </div>
                        <Button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-200">Activé</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Notifications SMS</h4>
                          <p className="text-sm text-gray-500">Recevez des notifications par SMS</p>
                        </div>
                        <Button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200">Désactivé</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Notifications push</h4>
                          <p className="text-sm text-gray-500">Recevez des notifications push sur votre appareil</p>
                        </div>
                        <Button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200">Désactivé</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 10. SUPPORT ET ASSISTANCE */}
            <TabsContent value="support">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des demandes</CardTitle>
                      <CardDescription>Vos demandes d'assistance précédentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData.supportTickets.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Référence</TableHead>
                              <TableHead>Sujet</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {userData.supportTickets.map((ticket) => (
                              <TableRow key={ticket.id}>
                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                <TableCell>{ticket.subject}</TableCell>
                                <TableCell>{ticket.date}</TableCell>
                                <TableCell>
                                  <Badge className={ticket.status === 'Résolu' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                    {ticket.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">Détails</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8">
                          <HeadphonesIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-700">Aucune demande</h3>
                          <p className="text-gray-500 mt-1">Vous n'avez pas encore de demandes d'assistance.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Contactez-nous</CardTitle>
                      <CardDescription>Nous sommes là pour vous aider</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="supportSubject">Sujet</Label>
                        <Input id="supportSubject" placeholder="Ex: Question sur ma commande" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supportMessage">Message</Label>
                        <textarea 
                          id="supportMessage"
                          className="w-full p-2 border rounded-md h-24 resize-none"
                          placeholder="Comment pouvons-nous vous aider ?"
                        ></textarea>
                      </div>
                      
                      <div className="pt-2">
                        <Button className="w-full">
                          Envoyer la demande
                        </Button>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium mb-2">Autres options de contact</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <MessageSquare className="h-4 w-4 mr-2 text-mytroc-primary" />
                            <span>Chat en direct (9h-18h)</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-mytroc-primary" />
                            <span>01 43 66 19 31 (9h-18h)</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-mytroc-primary" />
                            <span>support@mytroc.com</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 11. SÉCURITÉ ET DÉCONNEXION */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                  <CardDescription>Gérez les paramètres de sécurité de votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-mytroc-primary/10 p-2 rounded-full mr-3">
                          <Lock className="h-5 w-5 text-mytroc-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Mot de passe</h3>
                          <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                        </div>
                      </div>
                      <Button variant="outline">Modifier</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-mytroc-primary/10 p-2 rounded-full mr-3">
                          <Shield className="h-5 w-5 text-mytroc-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Authentification à deux facteurs</h3>
                          <p className="text-sm text-gray-500">Non activée</p>
                        </div>
                      </div>
                      <Button variant="outline">Activer</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-mytroc-primary/10 p-2 rounded-full mr-3">
                          <Info className="h-5 w-5 text-mytroc-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Activité du compte</h3>
                          <p className="text-sm text-gray-500">Consultez les dernières connexions</p>
                        </div>
                      </div>
                      <Button variant="outline">Afficher</Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Confidentialité des données</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Vous pouvez demander une copie de vos données personnelles ou demander leur suppression conformément au RGPD.
                      </p>
                      <div className="flex space-x-3">
                        <Button variant="outline">Exporter mes données</Button>
                        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          Supprimer mes données
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Session</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Vous êtes actuellement connecté. Vous pouvez vous déconnecter de tous les appareils si vous suspectez un accès non autorisé.
                      </p>
                      <div className="flex space-x-3">
                        <Button variant="outline" className="space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>Se déconnecter</span>
                        </Button>
                        <Button variant="ghost" className="space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>Se déconnecter de tous les appareils</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default Profile;
