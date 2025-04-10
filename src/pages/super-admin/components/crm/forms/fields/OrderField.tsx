
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

interface OrderFieldProps {
  form: UseFormReturn<SalesFormValues>;
}

const OrderField: React.FC<OrderFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="orderNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Numéro de commande</FormLabel>
          <FormControl>
            <Input placeholder="CMD-00000" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default OrderField;
