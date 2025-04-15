import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Schéma de validation pour le formulaire de règle
const ruleSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  description: z.string().min(5, { message: 'La description doit contenir au moins 5 caractères' }),
  condition: z.string().min(5, { message: 'La condition doit contenir au moins 5 caractères' }),
  target: z.string().min(1, { message: 'Sélectionnez au moins une cible' }),
  action: z.string().min(1, { message: 'Sélectionnez une action' }),
  message: z.string().min(5, { message: 'Le message doit contenir au moins 5 caractères' }),
  priority: z.enum(['high', 'medium', 'low'])
});

type RuleFormValues = z.infer<typeof ruleSchema>;

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
