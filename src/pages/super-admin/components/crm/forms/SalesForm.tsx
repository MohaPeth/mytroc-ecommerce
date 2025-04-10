
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  orderNumber: z.string().min(3, {
    message: "Le numéro de commande doit contenir au moins 3 caractères.",
  }),
  date: z.date({
    required_error: "La date est requise.",
  }),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Le montant doit être un nombre.",
  }),
  paymentMethod: z.enum(["card", "paypal", "transfer", "other"]),
  products: z.string().min(3, {
    message: "Les produits doivent contenir au moins 3 caractères.",
  }),
  customerName: z.string().min(2, {
    message: "Le nom du client doit contenir au moins 2 caractères.",
  }),
  notes: z.string().optional(),
});

interface SalesFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  initialData?: Partial<z.infer<typeof formSchema>>;
  title?: string;
}

const SalesForm: React.FC<SalesFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  title = "Ajouter une vente"
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: initialData?.orderNumber || '',
      date: initialData?.date || new Date(),
      amount: initialData?.amount || '',
      paymentMethod: initialData?.paymentMethod || 'card',
      products: initialData?.products || '',
      customerName: initialData?.customerName || '',
      notes: initialData?.notes || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de commande</FormLabel>
                    <FormControl>
                      <Input placeholder="CMD-00000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de la vente</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Méthode de paiement</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une méthode de paiement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="card">Carte bancaire</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="transfer">Virement bancaire</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produits</FormLabel>
                    <FormControl>
                      <Input placeholder="Table basse, Chaise, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informations additionnelles sur la vente..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SalesForm;
