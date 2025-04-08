
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import ProductsTable from '@/components/dashboard/ProductsTable';

const ProProducts = () => {
  // Exemple de produits avec plus d'informations spécifiques pour les vendeurs Pro
  const products = [
    {
      id: 1,
      name: 'Mini Frigo',
      price: 300,
      status: 'active' as const,
      stock: 15,
      category: 'Électroménager',
      sales: 9,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Asus Zenbook',
      price: 1499,
      status: 'active' as const,
      stock: 8,
      category: 'Informatique',
      sales: 12,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Cafetière Moulinex',
      price: 1234,
      status: 'sold_out' as const,
      stock: 0,
      category: 'Électroménager',
      sales: 7,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Brosse à dent',
      price: 324,
      status: 'draft' as const,
      stock: 25,
      category: 'Santé',
      sales: 0,
      image: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Écouteurs sans fil',
      price: 149,
      status: 'active' as const,
      stock: 30,
      category: 'Audio',
      sales: 21,
      image: '/placeholder.svg'
    },
    {
      id: 6,
      name: 'Ordinateur Portable',
      price: 1299,
      status: 'active' as const,
      stock: 5,
      category: 'Informatique',
      sales: 15,
      image: '/placeholder.svg'
    },
    {
      id: 7,
      name: 'Machine à Laver',
      price: 699,
      status: 'draft' as const,
      stock: 3,
      category: 'Électroménager',
      sales: 0,
      image: '/placeholder.svg'
    },
  ];

  const handleEdit = (id: number) => {
    console.log(`Édition du produit ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Suppression du produit ${id}`);
  };

  return (
    <ProDashboardLayout title="Mes produits">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des produits</h1>
          <p className="text-muted-foreground">
            En tant que vendeur premium, vous pouvez gérer jusqu'à 500 produits
          </p>
        </div>
        <Link to="/dashboard-pro/ajouter-produit">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Ajouter un produit
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          {/* Filtres et contrôles similaires à la version standard */}
          <p className="text-sm text-muted-foreground">Fonctionnalités avancées de filtrage et de gestion disponibles pour les vendeurs premium.</p>
        </CardContent>
      </Card>

      <ProductsTable 
        products={products} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Affichage de {products.length} produits sur {products.length} au total
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Exporter en CSV</Button>
          <Button variant="outline" size="sm">Importer des produits</Button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProProducts;
