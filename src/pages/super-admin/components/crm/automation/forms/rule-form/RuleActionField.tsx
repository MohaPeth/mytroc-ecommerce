
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { RuleFormValues } from './types';

interface RuleActionFieldProps {
  form: UseFormReturn<RuleFormValues>;
}

export const RuleActionField: React.FC<RuleActionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="action"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Action à exécuter</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une action" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="send_notification">Envoyer une notification</SelectItem>
              <SelectItem value="send_email">Envoyer un email</SelectItem>
              <SelectItem value="tag_user">Tagger l'utilisateur</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            L'action à effectuer lorsque la condition est remplie
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
