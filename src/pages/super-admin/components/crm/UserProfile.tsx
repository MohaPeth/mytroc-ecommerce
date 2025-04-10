
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  User, Edit, ShoppingBag, CircleDollarSign, Mail, Phone, MapPin, Calendar, 
  Star, Clock, Send, Download, Pencil
} from 'lucide-react';
import SalesChart from '@/components/dashboard/SalesChart';

// Mock data for a user profile
const USER_PROFILE = {
  id: '2',
  name: 'Thomas Durand',
  email: 'thomas.durand@example.com',
  phone: '07 98 76 54 32',
  address: '15 Rue des Fleurs, 75001 Paris',
  type: 'seller',
  status: 'active',
  registrationDate: '2024-01-15',
  lastActivity: '2025-04-09',
  notes: 'Vendeur professionnel très actif',
  rating: 4.7,
  totalSales: 42,
  totalPurchases: 3,
  totalRevenue: 3450.75,
  profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
  sellerDetails: {
    companyName: 'Durand Électronique',
    siret: '12345678901234',
    vatNumber: 'FR12345678901',
    storeUrl: '/vendeur/thomas-durand',
    productCategories: ['Électronique', 'Informatique'],
    averageResponseTime: '2h'
  }
};

// Mock data for products
const PRODUCTS_DATA = [
  {
    id: 'P1',
    name: 'Smartphone reconditionné',
    price: 299.99,
    status: 'active',
    stock: 5,
    views: 1243,
    sales: 18
  },
  {
    id: 'P2',
    name: 'Casque audio sans fil',
    price: 89.99,
    status: 'active',
    stock: 12,
    views: 876,
    sales: 14
  },
  {
    id: 'P3',
    name: 'Tablette 10 pouces',
    price: 199.99,
    status: 'inactive',
    stock: 0,
    views: 432,
    sales: 6
  },
  {
    id: 'P4',
    name: 'Souris ergonomique',
    price: 49.99,
    status: 'active',
    stock: 8,
    views: 354,
    sales: 4
  }
];

// Mock data for transactions
const TRANSACTIONS_DATA = [
  {
    id: 'T1',
    date: '2025-04-02',
    type: 'sale',
    product: 'Smartphone reconditionné',
    amount: 299.99,
    status: 'completed',
    customer: 'Sophie Martin'
  },
  {
    id: 'T2',
    date: '2025-03-28',
    type: 'sale',
    product: 'Casque audio sans fil',
    amount: 89.99,
    status: 'completed',
    customer: 'Lucas Bernard'
  },
  {
    id: 'T3',
    date: '2025-03-25',
    type: 'sale',
    product: 'Smartphone reconditionné',
    amount: 299.99,
    status: 'completed',
    customer: 'Emma Dubois'
  },
  {
    id: 'T4',
    date: '2025-03-20',
    type: 'purchase',
    product: 'Écouteurs sans fil',
    amount: 59.99,
    status: 'completed',
    customer: 'Hugo Moreau'
  }
];

// Mock data for ratings
const RATINGS_DATA = [
  {
    id: 'R1',
    date: '2025-04-03',
    rating: 5,
    comment: 'Excellent vendeur, livraison rapide et produit conforme à la description !',
    from: 'Sophie Martin'
  },
  {
    id: 'R2',
    date: '2025-03-29',
    rating: 4,
    comment: 'Bon vendeur, produit de qualité.',
    from: 'Lucas Bernard'
  },
  {
    id: 'R3',
    date: '2025-03-26',
    rating: 5,
    comment: 'Très satisfaite de mon achat, je recommande !',
    from: 'Emma Dubois'
  }
];

// Mock data for sales chart
const SALES_CHART_DATA = [
  { date: '01/03', revenue: 350, orders: 2 },
  { date: '08/03', revenue: 290, orders: 1 },
  { date: '15/03', revenue: 580, orders: 3 },
  { date: '22/03', revenue: 390, orders: 2 },
  { date: '29/03', revenue: 690, orders: 4 },
  { date: '05/04', revenue: 300, orders: 1 },
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={USER_PROFILE.profileImage} alt={USER_PROFILE.name} />
                <AvatarFallback>{USER_PROFILE.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{USER_PROFILE.name}</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vendeur</Badge>
                  {USER_PROFILE.status === 'active' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Actif</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactif</Badge>
                  )}
                </div>
                <CardDescription className="mt-1">
                  ID: {USER_PROFILE.id} | Membre depuis {formatDate(USER_PROFILE.registrationDate)}
                </CardDescription>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{USER_PROFILE.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{USER_PROFILE.totalSales} ventes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{USER_PROFILE.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Envoyer un email
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Modifier le profil
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="ratings">Évaluations</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{USER_PROFILE.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Téléphone</div>
                    <div className="text-sm text-muted-foreground">{USER_PROFILE.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Adresse</div>
                    <div className="text-sm text-muted-foreground">{USER_PROFILE.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Inscription</div>
                    <div className="text-sm text-muted-foreground">{formatDate(USER_PROFILE.registrationDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Dernière activité</div>
                    <div className="text-sm text-muted-foreground">{formatDate(USER_PROFILE.lastActivity)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informations vendeur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Nom de l'entreprise</div>
                  <div className="text-sm text-muted-foreground">{USER_PROFILE.sellerDetails.companyName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">SIRET</div>
                  <div className="text-sm text-muted-foreground">{USER_PROFILE.sellerDetails.siret}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Numéro de TVA</div>
                  <div className="text-sm text-muted-foreground">{USER_PROFILE.sellerDetails.vatNumber}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Catégories de produits</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {USER_PROFILE.sellerDetails.productCategories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Temps de réponse moyen</div>
                  <div className="text-sm text-muted-foreground">{USER_PROFILE.sellerDetails.averageResponseTime}</div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Voir la boutique
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notes administratives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[100px] border rounded-md p-3 text-sm">
                  {USER_PROFILE.notes || "Aucune note pour le moment."}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Pencil className="h-4 w-4" />
                  Modifier les notes
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Évolution des ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <SalesChart 
                  data={SALES_CHART_DATA} 
                  title="Évolution des ventes" 
                  description="Les 30 derniers jours"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produits en vente</CardTitle>
              <CardDescription>Liste des produits publiés par {USER_PROFILE.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Vues</TableHead>
                    <TableHead>Ventes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PRODUCTS_DATA.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                      </TableCell>
                      <TableCell>
                        {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </TableCell>
                      <TableCell>
                        {product.status === 'active' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Actif</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactif</Badge>
                        )}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.views}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Voir</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Historique des transactions</CardTitle>
              <CardDescription>Dernières transactions effectuées</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Client/Vendeur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TRANSACTIONS_DATA.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>
                        {transaction.type === 'sale' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vente</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Achat</Badge>
                        )}
                      </TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell>
                        {transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Terminée
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ratings">
          <Card>
            <CardHeader>
              <CardTitle>Évaluations reçues</CardTitle>
              <CardDescription>Note moyenne : {USER_PROFILE.rating}/5</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RATINGS_DATA.map((rating) => (
                  <div key={rating.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < rating.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">{rating.from}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{formatDate(rating.date)}</div>
                    </div>
                    <p className="mt-2 text-sm">{rating.comment}</p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="text-xs gap-1">
                        <Send className="h-3 w-3" />
                        Répondre
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des interactions</CardTitle>
              <CardDescription>Toutes les interactions avec cet utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-gray-200 pl-4 ml-3 space-y-6">
                <div className="relative mb-6">
                  <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="text-base font-medium">Email de bienvenue envoyé</h3>
                    <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-01-15')} - 14:30</time>
                    <p className="text-sm">Email de bienvenue envoyé suite à l'inscription.</p>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="text-base font-medium">Premier produit publié</h3>
                    <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-01-18')} - 10:15</time>
                    <p className="text-sm">L'utilisateur a publié son premier produit : "Smartphone reconditionné".</p>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="text-base font-medium">Premier achat</h3>
                    <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-02-03')} - 16:45</time>
                    <p className="text-sm">Premier achat effectué sur la plateforme.</p>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-amber-500"></div>
                  <div>
                    <h3 className="text-base font-medium">Demande de support</h3>
                    <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-03-12')} - 09:22</time>
                    <p className="text-sm">L'utilisateur a contacté le support concernant un problème de livraison.</p>
                    <Badge variant="outline" className="mt-2 bg-amber-50 text-amber-700 border-amber-200">
                      Résolu
                    </Badge>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-green-500"></div>
                  <div>
                    <h3 className="text-base font-medium">Statut de vendeur professionnel</h3>
                    <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-03-28')} - 11:05</time>
                    <p className="text-sm">L'utilisateur a été promu au statut de vendeur professionnel.</p>
                    <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                      Statut spécial
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
