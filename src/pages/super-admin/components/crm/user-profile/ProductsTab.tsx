
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  stock: number;
  views: number;
  sales: number;
}

interface ProductsTabProps {
  products: Product[];
}

const ProductsTab: React.FC<ProductsTabProps> = ({ products }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits en vente</CardTitle>
        <CardDescription>Liste des produits publiés</CardDescription>
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
            {products.map((product) => (
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
  );
};

export default ProductsTab;
