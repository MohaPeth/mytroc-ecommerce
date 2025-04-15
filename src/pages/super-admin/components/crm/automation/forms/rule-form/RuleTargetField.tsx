
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { RuleFormValues } from './types';

interface RuleTargetFieldProps {
  form: UseFormReturn<RuleFormValues>;
}

export const RuleTargetField: React.FC<RuleTargetFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="target"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cible de la notification</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une cible" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="admin">Administrateurs</SelectItem>
              <SelectItem value="vendor">Vendeurs</SelectItem>
              <SelectItem value="admin,vendor">Admins & Vendeurs</SelectItem>
              <SelectItem value="system">Système (action interne)</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Qui sera notifié ou quelle partie du système sera affectée
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
