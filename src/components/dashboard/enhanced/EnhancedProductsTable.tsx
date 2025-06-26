
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/ui/loading-states/LoadingSpinner';
import { EmptyState } from '@/components/ui/feedback/EmptyState';
import { ConfirmDialog } from '@/components/ui/feedback/ConfirmDialog';

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

interface EnhancedProductsTableProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const EnhancedProductsTable: React.FC<EnhancedProductsTableProps> = ({ 
  products, 
  onEdit, 
  onDelete,
  loading = false
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    productId: number | null;
    productName: string;
  }>({
    open: false,
    productId: null,
    productName: ''
  });

  const handleDeleteClick = (product: Product) => {
    setDeleteConfirm({
      open: true,
      productId: product.id,
      productName: product.name
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.productId) {
      onDelete(deleteConfirm.productId);
    }
    setDeleteConfirm({ open: false, productId: null, productName: '' });
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Actif</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      case 'sold_out':
        return <Badge variant="secondary" className="bg-red-100 text-red-600 hover:bg-red-100">Épuisé</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Chargement des produits..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<div className="text-6xl">📦</div>}
        title="Aucun produit trouvé"
        description="Vous n'avez pas encore de produits. Commencez par en ajouter un pour développer votre catalogue."
        action={{
          label: "Ajouter un produit",
          onClick: () => window.location.href = '/dashboard/ajouter-produit'
        }}
      />
    );
  }

  return (
    <>
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
                <TableCell>
                  <span className={product.stock === 0 ? 'text-red-600 font-medium' : ''}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/produit/${product.id}`} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-600 focus:text-red-600"
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

      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm(prev => ({ ...prev, open }))}
        title="Supprimer le produit"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteConfirm.productName}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </>
  );
};
