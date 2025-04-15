
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { RuleFormValues } from './types';

interface RulePriorityFieldProps {
  form: UseFormReturn<RuleFormValues>;
}

export const RulePriorityField: React.FC<RulePriorityFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Priorité</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="high" />
                </FormControl>
                <FormLabel className="font-normal text-red-600">
                  Haute
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="medium" />
                </FormControl>
                <FormLabel className="font-normal text-amber-600">
                  Moyenne
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="low" />
                </FormControl>
                <FormLabel className="font-normal text-green-600">
                  Basse
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription>
            La priorité détermine l'importance visuelle de l'alerte
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
