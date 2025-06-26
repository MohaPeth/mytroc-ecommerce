
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { EnhancedProductsTable } from '@/components/dashboard/enhanced/EnhancedProductsTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, FilterX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/search/SearchInput';
import { Breadcrumbs } from '@/components/ui/navigation/Breadcrumbs';

const EnhancedMyProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Exemple de produits
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
  ];

  // Filtre des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || 
      product.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'all' || 
      product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Catégories uniques pour le filtre
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleEdit = (id: number) => {
    console.log(`Édition du produit ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Suppression du produit ${id}`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Mes produits', current: true }
  ];

  return (
    <DashboardLayout title="Mes produits">
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion des produits</h1>
            <p className="text-muted-foreground">
              Gérez vos produits et suivez leurs performances
            </p>
          </div>
          <Link to="/dashboard/ajouter-produit">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Ajouter un produit
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SearchInput
                placeholder="Rechercher un produit..."
                onSearch={setSearchQuery}
                className="md:col-span-1"
              />
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.filter(c => c !== 'all').map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="draft">Brouillons</SelectItem>
                  <SelectItem value="sold_out">Épuisés</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={resetFilters} className="gap-2">
                <FilterX className="h-4 w-4" />
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        <EnhancedProductsTable 
          products={filteredProducts} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          loading={loading}
        />
        
        <div className="text-center text-sm text-muted-foreground">
          Affichage de {filteredProducts.length} produits sur {products.length} au total
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedMyProducts;
