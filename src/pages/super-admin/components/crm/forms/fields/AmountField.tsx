
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

interface AmountFieldProps {
  form: UseFormReturn<SalesFormValues>;
}

const AmountField: React.FC<AmountFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Montant (€)</FormLabel>
          <FormControl>
            <Input type="number" step="0.01" placeholder="0.00" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AmountField;
