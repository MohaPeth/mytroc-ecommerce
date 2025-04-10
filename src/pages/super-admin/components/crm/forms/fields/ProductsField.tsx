
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SalesFormValues } from "../schemas/salesFormSchema";

interface ProductsFieldProps {
  form: UseFormReturn<SalesFormValues>;
}

const ProductsField: React.FC<ProductsFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="products"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Produits</FormLabel>
          <FormControl>
            <Input placeholder="Table basse, Chaise, etc." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductsField;
