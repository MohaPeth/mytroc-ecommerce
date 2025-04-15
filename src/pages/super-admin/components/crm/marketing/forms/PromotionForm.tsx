
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DialogFooter } from '@/components/ui/dialog';

// Schéma de validation pour le formulaire de promotion
const promotionSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  code: z.string().min(3, { message: 'Le code doit contenir au moins 3 caractères' }),
  discountType: z.enum(['percent', 'amount', 'shipping']),
  discount: z.coerce.number().min(0),
  status: z.enum(['draft', 'scheduled', 'active']),
  startDate: z.union([z.string(), z.date()]),
  endDate: z.union([z.string(), z.date()]),
  usageLimit: z.coerce.number().min(0),
  categories: z.array(z.string()),
  minAmount: z.coerce.number().min(0)
});

type PromotionFormValues = z.infer<typeof promotionSchema>;

interface PromotionFormProps {
  onSubmit: (data: PromotionFormValues) => void;
  initialData?: any | null;
  onCancel: () => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionSchema),
    defaultValues: initialData || {
      name: '',
      code: '',
      discountType: 'percent',
      discount: 10,
      status: 'draft',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      usageLimit: 0,
      categories: ['tous'],
      minAmount: 0
    }
  });

  const watchDiscountType = form.watch('discountType');

  // Liste des catégories disponibles
  const CATEGORIES = [
    { id: 'tous', label: 'Toutes les catégories' },
    { id: 'électronique', label: 'Électronique' },
    { id: 'vêtements', label: 'Vêtements' },
    { id: 'maison', label: 'Maison & Jardin' },
    { id: 'sports', label: 'Sports & Loisirs' },
    { id: 'beauté', label: 'Beauté & Santé' },
    { id: 'accessoires', label: 'Accessoires' }
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la promotion</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Soldes de printemps" {...field} />
              </FormControl>
              <FormDescription>
                Un nom descriptif pour identifier cette promotion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code promotionnel</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: SPRING25" 
                  {...field} 
                  className="uppercase"
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormDescription>
                Le code que les utilisateurs devront saisir pour bénéficier de la promotion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de réduction</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de réduction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="percent">Pourcentage (%)</SelectItem>
                    <SelectItem value="amount">Montant fixe (€)</SelectItem>
                    <SelectItem value="shipping">Livraison gratuite</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchDiscountType !== 'shipping' && (
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valeur de la réduction</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0} 
                      max={watchDiscountType === 'percent' ? 100 : undefined} 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    {watchDiscountType === 'percent' 
                      ? 'Pourcentage de réduction (ex: 25 pour 25%)' 
                      : 'Montant de la réduction en euros'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="draft" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Brouillon
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="scheduled" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Programmée (selon dates)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Active immédiatement
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de début</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && typeof field.value !== 'string' ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : field.value ? (
                          String(field.value)
                        ) : (
                          <span>Sélectionnez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={typeof field.value !== 'string' ? field.value : undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Quand la promotion commencera
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && typeof field.value !== 'string' ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : field.value ? (
                          String(field.value)
                        ) : (
                          <span>Sélectionnez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={typeof field.value !== 'string' ? field.value : undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Quand la promotion se terminera
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="minAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant minimum d'achat (€)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0} 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  0 = aucun minimum requis
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usageLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite d'utilisation</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0} 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  0 = utilisations illimitées
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Catégories applicables</FormLabel>
                <FormDescription>
                  Sélectionnez les catégories auxquelles cette promotion s'applique
                </FormDescription>
              </div>
              {CATEGORIES.map((category) => (
                <FormField
                  key={category.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.id)}
                            onCheckedChange={(checked) => {
                              let updatedCategories: string[];
                              if (category.id === 'tous') {
                                // Si "Toutes les catégories" est sélectionné, ne garder que celui-ci
                                updatedCategories = checked ? ['tous'] : [];
                              } else {
                                // Sinon, gérer normalement mais supprimer "Toutes les catégories" si présent
                                updatedCategories = field.value?.filter(val => val !== 'tous') || [];
                                
                                if (checked) {
                                  updatedCategories.push(category.id);
                                } else {
                                  updatedCategories = updatedCategories.filter(
                                    (value) => value !== category.id
                                  );
                                }
                              }
                              field.onChange(updatedCategories);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {category.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Créer la promotion'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PromotionForm;
