
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { SalesFormValues } from "../schemas/salesFormSchema";

interface NotesFieldProps {
  form: UseFormReturn<SalesFormValues>;
}

const NotesField: React.FC<NotesFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Informations additionnelles sur la vente..."
              className="min-h-[80px] resize-y"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NotesField;
