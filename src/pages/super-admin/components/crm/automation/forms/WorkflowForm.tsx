import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

// Schéma de validation pour le formulaire de workflow
const workflowSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  description: z.string().min(5, { message: 'La description doit contenir au moins 5 caractères' }),
  trigger: z.string(),
  actions: z.array(z.string()).min(1, { message: 'Sélectionnez au moins une action' }),
  condition: z.string()
});

type WorkflowFormValues = z.infer<typeof workflowSchema>;

interface WorkflowFormProps {
  onSubmit: (data: WorkflowFormValues) => void;
  initialData?: any | null;
  onCancel: () => void;
}

const WorkflowForm: React.FC<WorkflowFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const form = useForm<WorkflowFormValues>({
    resolver: zodResolver(workflowSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      trigger: 'cart_abandonment',
      actions: ['send_email'],
      condition: 'all'
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du workflow</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Rappel de panier abandonné" {...field} />
                </FormControl>
                <FormDescription>
                  Un nom court et descriptif pour identifier ce workflow
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trigger"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Déclencheur</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un déclencheur" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cart_abandonment">Panier abandonné</SelectItem>
                    <SelectItem value="low_stock">Stock faible</SelectItem>
                    <SelectItem value="user_registration">Inscription utilisateur</SelectItem>
                    <SelectItem value="order_confirmed">Commande confirmée</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  L'événement qui déclenche ce workflow
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ex: Envoie un email aux clients qui ont abandonné leur panier" 
                  {...field} 
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormDescription>
                Une description détaillée de ce que fait ce workflow
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="actions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actions</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange([value])} 
                  defaultValue={field.value[0]}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="send_email">Envoyer un email</SelectItem>
                    <SelectItem value="send_notification">Envoyer une notification</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  L'action à exécuter quand le déclencheur est activé
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
                <FormLabel>Condition (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: cart_value > 50 ou all" {...field} />
                </FormControl>
                <FormDescription>
                  Condition pour exécuter le workflow (utilisez "all" pour exécuter sans condition)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Créer le workflow'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default WorkflowForm;
