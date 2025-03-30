
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';
import ProductDialog, { Product } from './dialogs/ProductDialog';

const SuperAdminProducts = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  // Exemple de données produits
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Mini Frigo', category: 'Électroménager', stock: 15, status: 'active', vendor: 'ElectroPlus', price: 129.99 },
    { id: 2, name: 'Asus Zenbook', category: 'Informatique', stock: 8, status: 'active', vendor: 'TechStore', price: 899.99 },
    { id: 3, name: 'Cafetière Moulinex', category: 'Électroménager', stock: 0, status: 'sold_out', vendor: 'ElectroPlus', price: 49.99 },
    { id: 4, name: 'Écouteurs sans fil', category: 'Audio', stock: 30, status: 'active', vendor: 'SoundMaster', price: 79.99 },
  ]);

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
        setCurrentProduct(product);
        setIsEditProductOpen(true);
        break;
      case 'delete':
        setCurrentProduct(product);
        setIsDeleteDialogOpen(true);
        break;
      case 'update-stock':
        const updatedProducts = products.map(p => 
          p.id === productId ? { ...p, stock: p.stock > 0 ? p.stock + 5 : 5, status: 'active' as const } : p
        );
        setProducts(updatedProducts);
        toast({
          title: "Stock mis à jour",
          description: `Le stock du produit ${product.name} a été mis à jour (+5 unités)`
        });
        break;
      default:
        break;
    }
  };

  // Fonction pour la création d'un produit
  const handleCreateProduct = (productData: Omit<Product, 'id'> & { id?: number }) => {
    const newProduct = {
      ...productData,
      id: products.length ? Math.max(...products.map(product => product.id)) + 1 : 1
    };
    
    setProducts([...products, newProduct]);
  };

  // Fonction pour la mise à jour d'un produit
  const handleUpdateProduct = (productData: Product) => {
    const updatedProducts = products.map(product => 
      product.id === productData.id ? productData : product
    );
    setProducts(updatedProducts);
  };

  // Fonction pour la suppression d'un produit
  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    
    toast({
      title: "Produit supprimé",
      description: `Le produit ${currentProduct.name} a été supprimé`,
      variant: "destructive",
    });
    
    setIsDeleteDialogOpen(false);
    setCurrentProduct(undefined);
  };

  // Fonction pour la gestion de la sauvegarde des produits
  const handleSaveProduct = (productData: Omit<Product, 'id'> & { id?: number }) => {
    if (productData.id) {
      handleUpdateProduct(productData as Product);
    } else {
      handleCreateProduct(productData);
    }
  };

  return (
    <>
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
              <Button className="gap-2" onClick={() => setIsAddProductOpen(true)}>
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
                  <TableHead>Prix</TableHead>
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
                    <TableCell>{product.price.toFixed(2)} €</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          product.status === 'active' 
                            ? 'default' 
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
                          <DropdownMenuItem onClick={() => handleProductAction('update-stock', product.id)}>
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

      {/* Dialog pour l'ajout d'un produit */}
      <ProductDialog 
        isOpen={isAddProductOpen} 
        onClose={() => setIsAddProductOpen(false)} 
        onSave={handleSaveProduct}
      />

      {/* Dialog pour l'édition d'un produit */}
      <ProductDialog 
        isOpen={isEditProductOpen} 
        onClose={() => {
          setIsEditProductOpen(false);
          setCurrentProduct(undefined);
        }} 
        product={currentProduct}
        onSave={handleSaveProduct}
      />

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce produit ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement le produit {currentProduct?.name} du catalogue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentProduct(undefined)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 text-white hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SuperAdminProducts;
