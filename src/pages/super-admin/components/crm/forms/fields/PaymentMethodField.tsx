
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SalesFormValues } from "../schemas/salesFormSchema";

interface PaymentMethodFieldProps {
  form: UseFormReturn<SalesFormValues>;
}

const PaymentMethodField: React.FC<PaymentMethodFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Méthode de paiement</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une méthode de paiement" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="card">Carte bancaire</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="transfer">Virement bancaire</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PaymentMethodField;
