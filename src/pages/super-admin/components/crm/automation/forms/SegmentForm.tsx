
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
  tags: z.union([
    z.string(),
    z.array(z.string())
  ])
});

type SegmentFormValues = z.infer<typeof segmentSchema>;

interface SegmentFormProps {
  onSubmit: (data: SegmentFormValues) => void;
  initialData?: any | null;
  onCancel: () => void;
}

const SegmentForm: React.FC<SegmentFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // Prepare the tags value for the form
  const prepareTagsValue = (): string => {
    if (!initialData || !initialData.tags) return '';
    
    if (Array.isArray(initialData.tags)) {
      return initialData.tags.join(', ');
    }
    
    return String(initialData.tags || '');
  };
  
  const form = useForm<SegmentFormValues>({
    resolver: zodResolver(segmentSchema),
    defaultValues: initialData ? {
      ...initialData,
      tags: prepareTagsValue()
    } : {
      name: '',
      description: '',
      criteria: '',
      tags: ''
    }
  });

  const handleSubmit = (data: SegmentFormValues) => {
    // Process the tags to ensure they're in array format
    const processedData = {
      ...data,
      tags: typeof data.tags === 'string' 
        ? (data.tags as string).split(',').map(tag => tag.trim()).filter(tag => tag) 
        : (Array.isArray(data.tags) ? data.tags : [])
    };
    onSubmit(processedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        <div className="space-y-6">
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
                    className="min-h-[100px]"
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
                    className="font-mono min-h-[100px]"
                  />
                </FormControl>
                <FormDescription>
                  Les conditions que les utilisateurs doivent remplir pour appartenir à ce segment
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
            {initialData ? 'Mettre à jour' : 'Créer le segment'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SegmentForm;
