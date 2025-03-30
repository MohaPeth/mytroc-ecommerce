
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from '../forms/ProductForm';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  status: "active" | "draft" | "sold_out";
  vendor: string;
  description?: string;
  price: number;
}

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (product: Omit<Product, 'id'> & { id?: number }) => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onClose,
  product,
  onSave
}) => {
  const handleSubmit = (values: Omit<Product, 'id'>) => {
    // Dans un environnement réel, ce serait un appel API
    const updatedProduct = product ? { ...values, id: product.id } : values;
    onSave(updatedProduct);
    
    toast({
      title: product ? "Produit mis à jour" : "Produit créé",
      description: `Le produit ${values.name} a été ${product ? "mis à jour" : "créé"} avec succès.`
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
          <DialogDescription>
            {product 
              ? "Modifiez les informations du produit ci-dessous." 
              : "Remplissez les informations pour créer un nouveau produit."}
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
          initialData={product} 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
