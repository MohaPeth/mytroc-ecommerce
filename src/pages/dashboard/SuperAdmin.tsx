
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Package, 
  BarChart4, 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Ban, 
  AlertTriangle,
  ChevronDown,
  Download,
  RefreshCw,
  CheckCircle,
  Lock 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

const SuperAdmin = () => {
  const [searchUser, setSearchUser] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [userRole, setUserRole] = useState('all');
  const [userStatus, setUserStatus] = useState('all');

  // Exemple de données utilisateurs
  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-24' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com', role: 'user', status: 'active', lastLogin: '2023-05-23' },
    { id: 3, name: 'Paul Bernard', email: 'paul.bernard@example.com', role: 'vendor', status: 'inactive', lastLogin: '2023-05-20' },
    { id: 4, name: 'Sophie Dubois', email: 'sophie.dubois@example.com', role: 'user', status: 'suspended', lastLogin: '2023-05-18' },
    { id: 5, name: 'Thomas Leroy', email: 'thomas.leroy@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-22' },
  ];

  // Exemple de données produits
  const products = [
    { id: 1, name: 'Mini Frigo', category: 'Électroménager', stock: 15, status: 'active', vendor: 'ElectroPlus' },
    { id: 2, name: 'Asus Zenbook', category: 'Informatique', stock: 8, status: 'active', vendor: 'TechStore' },
    { id: 3, name: 'Cafetière Moulinex', category: 'Électroménager', stock: 0, status: 'sold_out', vendor: 'ElectroPlus' },
    { id: 4, name: 'Écouteurs sans fil', category: 'Audio', stock: 30, status: 'active', vendor: 'SoundMaster' },
  ];

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchUser === '' || 
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase());
    
    const matchesRole = userRole === 'all' || user.role === userRole;
    const matchesStatus = userStatus === 'all' || user.status === userStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    return searchProduct === '' || 
      product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.category.toLowerCase().includes(searchProduct.toLowerCase());
  });

  // Fonction pour la gestion des actions sur les utilisateurs
  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case 'edit':
        toast({
          title: "Modification d'utilisateur",
          description: `Édition de l'utilisateur ${user.name} (ID: ${userId})`,
        });
        break;
      case 'suspend':
        toast({
          title: "Compte suspendu",
          description: `Le compte de ${user.name} a été suspendu`,
          variant: "destructive",
        });
        break;
      case 'delete':
        toast({
          title: "Compte supprimé",
          description: `Le compte de ${user.name} a été supprimé`,
          variant: "destructive",
        });
        break;
      case 'promote':
        toast({
          title: "Rôle modifié",
          description: `${user.name} a été promu au rôle d'administrateur`,
        });
        break;
      default:
        break;
    }
  };

  // Fonction pour la gestion des actions sur les produits
  const handleProductAction = (action: string, productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    switch (action) {
      case 'edit':
        toast({
          title: "Modification de produit",
          description: `Édition du produit ${product.name} (ID: ${productId})`,
        });
        break;
      case 'delete':
        toast({
          title: "Produit supprimé",
          description: `Le produit ${product.name} a été supprimé`,
          variant: "destructive",
        });
        break;
      default:
        break;
    }
  };

  // Fonction pour activer l'authentification à deux facteurs
  const handle2FAToggle = (enabled: boolean) => {
    toast({
      title: enabled ? "2FA Activé" : "2FA Désactivé",
      description: enabled 
        ? "L'authentification à deux facteurs a été activée." 
        : "L'authentification à deux facteurs a été désactivée.",
      variant: enabled ? "default" : "destructive",
    });
  };

  return (
    <DashboardLayout title="Super Admin">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Interface Super Administrateur</h1>
            <p className="text-muted-foreground">Gérez tous les aspects de la plateforme</p>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1 px-3 py-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            Mode Super Admin
          </Badge>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Utilisateurs</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Produits</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              <span className="hidden sm:inline">Analyses</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Sécurité</span>
            </TabsTrigger>
          </TabsList>

          {/* Onglet Gestion des Utilisateurs */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <CardDescription>Ajoutez, modifiez ou suspendez des comptes utilisateurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un utilisateur..."
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les rôles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      <SelectItem value="admin">Administrateurs</SelectItem>
                      <SelectItem value="vendor">Vendeurs</SelectItem>
                      <SelectItem value="user">Utilisateurs</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={userStatus} onValueChange={setUserStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="inactive">Inactifs</SelectItem>
                      <SelectItem value="suspended">Suspendus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    {filteredUsers.length} utilisateurs trouvés
                  </span>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Nouvel utilisateur
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                              {user.role === 'admin' ? 'Admin' : user.role === 'vendor' ? 'Vendeur' : 'Utilisateur'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                user.status === 'active' 
                                  ? 'success' 
                                  : user.status === 'inactive' 
                                    ? 'secondary' 
                                    : 'destructive'
                              }
                            >
                              {user.status === 'active' 
                                ? 'Actif' 
                                : user.status === 'inactive' 
                                  ? 'Inactif' 
                                  : 'Suspendu'
                              }
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleUserAction('edit', user.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction('promote', user.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Changer le rôle
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction('suspend', user.id)}
                                  className="text-amber-600"
                                >
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspendre
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction('delete', user.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exporter les données
                </Button>
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Actualiser
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onglet Gestion des Produits */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Produits</CardTitle>
                <CardDescription>Gérez le catalogue de produits, les stocks et les catégories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un produit..."
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">Catégories</Button>
                    <Button className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Nouveau produit
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Vendeur</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map(product => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className={product.stock === 0 ? 'text-red-500 font-medium' : ''}>
                            {product.stock}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                product.status === 'active' 
                                  ? 'success' 
                                  : product.status === 'sold_out' 
                                    ? 'destructive' 
                                    : 'secondary'
                              }
                            >
                              {product.status === 'active' 
                                ? 'Actif' 
                                : product.status === 'sold_out' 
                                  ? 'Épuisé' 
                                  : 'Brouillon'
                              }
                            </Badge>
                          </TableCell>
                          <TableCell>{product.vendor}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleProductAction('edit', product.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Mettre à jour le stock
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleProductAction('delete', product.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exporter le catalogue
                </Button>
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Actualiser
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onglet Analyses des Performances */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analyses des Performances</CardTitle>
                <CardDescription>Statistiques sur les ventes, les avis clients et le trafic du site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Performance des ventes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-3xl font-bold">€24,780</div>
                        <Badge variant="success" className="text-xs">+12.5%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Comparé au mois précédent
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Satisfaction clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-3xl font-bold">4.8/5</div>
                        <Badge variant="success" className="text-xs">+0.3</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Basé sur 247 avis ce mois-ci
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Trafic du site</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-3xl font-bold">18,492</div>
                        <Badge variant="destructive" className="text-xs">-3.2%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Visiteurs uniques ce mois-ci
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Rapports détaillés</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                      <BarChart4 className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Analyse des ventes</div>
                        <div className="text-xs text-muted-foreground">Revenus, commandes, produits populaires</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                      <Users className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Analyse des clients</div>
                        <div className="text-xs text-muted-foreground">Acquisition, rétention, comportements</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                      <Package className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Analyse des produits</div>
                        <div className="text-xs text-muted-foreground">Performance, stocks, catégories</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                      <AlertTriangle className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Rapports d'anomalies</div>
                        <div className="text-xs text-muted-foreground">Fraudes, commandes annulées, litiges</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center md:justify-end">
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger tous les rapports
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de Sécurité</CardTitle>
                <CardDescription>Sécurisez votre plateforme avec des mesures de protection avancées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentification</h3>
                  <Separator />

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa">Authentification à deux facteurs (2FA)</Label>
                        <p className="text-sm text-muted-foreground">
                          Exiger une authentification à deux facteurs pour tous les comptes administrateurs
                        </p>
                      </div>
                      <Switch id="2fa" onCheckedChange={handle2FAToggle} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-timeout">Expiration de session</Label>
                        <p className="text-sm text-muted-foreground">
                          Déconnecter automatiquement les utilisateurs après une période d'inactivité
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 heure</SelectItem>
                          <SelectItem value="120">2 heures</SelectItem>
                          <SelectItem value="never">Jamais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Journalisation et Audit</h3>
                  <Separator />

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Action</TableHead>
                          <TableHead>Utilisateur</TableHead>
                          <TableHead>Date et heure</TableHead>
                          <TableHead>Adresse IP</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Connexion Super Admin</TableCell>
                          <TableCell>Thomas Leroy</TableCell>
                          <TableCell>2023-05-24 14:32:15</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Modification paramètres système</TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell>2023-05-24 10:12:08</TableCell>
                          <TableCell>192.168.1.2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Suspension compte utilisateur</TableCell>
                          <TableCell>Thomas Leroy</TableCell>
                          <TableCell>2023-05-23 16:45:22</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Télécharger l'historique complet
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contrôles avancés</h3>
                  <Separator />

                  <div className="grid gap-4">
                    <Button className="gap-2 bg-red-500 hover:bg-red-600 w-full sm:w-auto">
                      <Lock className="h-4 w-4" />
                      Verrouiller tous les comptes administrateurs
                    </Button>
                    
                    <Button variant="outline" className="gap-2 border-amber-500 text-amber-500 hover:bg-amber-50 w-full sm:w-auto">
                      <RefreshCw className="h-4 w-4" />
                      Réinitialiser toutes les clés API
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdmin;
