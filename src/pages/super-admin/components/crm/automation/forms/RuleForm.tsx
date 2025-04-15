
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RuleActionField } from './rule-form/RuleActionField';
import { RuleTargetField } from './rule-form/RuleTargetField';
import { RulePriorityField } from './rule-form/RulePriorityField';
import { ruleSchema, type RuleFormValues } from './rule-form/types';

interface RuleFormProps {
  onSubmit: (data: RuleFormValues) => void;
  initialData?: any | null;
  onCancel: () => void;
}

const RuleForm: React.FC<RuleFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      condition: '',
      target: 'admin',
      action: 'send_notification',
      message: '',
      priority: 'medium'
    }
  });

  const watchAction = form.watch('action');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ScrollArea className="h-[calc(80vh-8rem)] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la règle</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Alerte stock critique" {...field} />
                    </FormControl>
                    <FormDescription>
                      Un nom court et descriptif pour identifier cette règle
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <RuleTargetField form={form} />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ex: Notifie quand un produit a moins de 3 articles en stock" 
                      {...field} 
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Une description détaillée de ce que fait cette règle
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ex: stock < 3" 
                      {...field} 
                      className="font-mono min-h-[80px]"
                    />
                  </FormControl>
                  <FormDescription>
                    La condition qui doit être remplie pour déclencher la règle
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RuleActionField form={form} />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {watchAction === 'tag_user' ? 'Tag à appliquer' : 'Message'}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={
                          watchAction === 'tag_user' 
                            ? "Ex: inactive_customer" 
                            : "Ex: Stock critique pour le produit {product_name}. Il ne reste que {stock} unité(s)."
                        } 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {watchAction === 'tag_user' 
                        ? "Le tag qui sera appliqué à l'utilisateur" 
                        : "Le message qui sera envoyé. Utilisez {variable} pour les valeurs dynamiques"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <RulePriorityField form={form} />
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Créer la règle'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default RuleForm;
