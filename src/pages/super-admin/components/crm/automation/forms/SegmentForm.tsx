
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

// Schéma de validation pour le formulaire de segment
const segmentSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  description: z.string().min(5, { message: 'La description doit contenir au moins 5 caractères' }),
  criteria: z.string().min(5, { message: 'Les critères doivent contenir au moins 5 caractères' }),
  tags: z.array(z.string()).or(z.string().transform(str => str.split(',').map(tag => tag.trim())))
});

type SegmentFormValues = z.infer<typeof segmentSchema>;

interface SegmentFormProps {
  onSubmit: (data: SegmentFormValues) => void;
  initialData?: any | null;
  onCancel: () => void;
}

const SegmentForm: React.FC<SegmentFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const form = useForm<SegmentFormValues>({
    resolver: zodResolver(segmentSchema),
    defaultValues: initialData ? {
      ...initialData,
      tags: initialData.tags.join(', ')
    } : {
      name: '',
      description: '',
      criteria: '',
      tags: ''
    }
  });

  const handleSubmit = (data: SegmentFormValues) => {
    // Si les tags sont un string, les convertir en array
    const processedData = {
      ...data,
      tags: typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) 
        : data.tags
    };
    onSubmit(processedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du segment</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Acheteurs fréquents" {...field} />
              </FormControl>
              <FormDescription>
                Un nom descriptif pour identifier ce groupe d'utilisateurs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ex: Clients ayant effectué au moins 3 achats dans les 30 derniers jours" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Une description détaillée du segment et de son objectif
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="criteria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Critères de segmentation</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ex: purchases >= 3 AND last_purchase_date >= NOW() - INTERVAL 30 DAY" 
                  {...field} 
                  className="font-mono"
                />
              </FormControl>
              <FormDescription>
                Les conditions que les utilisateurs doivent remplir pour appartenir à ce segment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (séparés par des virgules)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: vip, actif, premium" {...field} />
              </FormControl>
              <FormDescription>
                Des mots-clés pour catégoriser ce segment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Créer le segment'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SegmentForm;
