
import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  ChevronDown,
  Download,
  RefreshCw,
  PlusCircle,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

const SuperAdminProducts = () => {
  const [searchProduct, setSearchProduct] = useState('');

  // Exemple de données produits
  const products = [
    { id: 1, name: 'Mini Frigo', category: 'Électroménager', stock: 15, status: 'active', vendor: 'ElectroPlus' },
    { id: 2, name: 'Asus Zenbook', category: 'Informatique', stock: 8, status: 'active', vendor: 'TechStore' },
    { id: 3, name: 'Cafetière Moulinex', category: 'Électroménager', stock: 0, status: 'sold_out', vendor: 'ElectroPlus' },
    { id: 4, name: 'Écouteurs sans fil', category: 'Audio', stock: 30, status: 'active', vendor: 'SoundMaster' },
  ];

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    return searchProduct === '' || 
      product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.category.toLowerCase().includes(searchProduct.toLowerCase());
  });

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

  return (
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
  );
};

export default SuperAdminProducts;
