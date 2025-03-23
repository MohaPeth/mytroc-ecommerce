
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  status: 'active' | 'draft' | 'sold_out';
  stock: number;
  category: string;
  sales: number;
  image: string;
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, onEdit, onDelete }) => {
  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Actif</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      case 'sold_out':
        return <Badge variant="secondary" className="bg-red-100 text-red-600 hover:bg-red-100">Épuisé</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Ventes</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="truncate max-w-[150px]">{product.name}</span>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>€{product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell>{getStatusBadge(product.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link to={`/produit/${product.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(product.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
