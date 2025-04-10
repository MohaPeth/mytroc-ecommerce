
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

interface CustomerFieldProps {
  form: UseFormReturn<SalesFormValues>;
}

const CustomerField: React.FC<CustomerFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="customerName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom du client</FormLabel>
          <FormControl>
            <Input placeholder="Jean Dupont" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomerField;
