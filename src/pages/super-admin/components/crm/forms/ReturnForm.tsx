
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Save, X, Package, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  orderNumber: z.string().min(3, {
    message: "Le numéro de commande doit contenir au moins 3 caractères.",
  }),
  customerName: z.string().min(2, {
    message: "Le nom du client doit contenir au moins 2 caractères.",
  }),
  customerEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  product: z.string().min(3, {
    message: "La description du produit doit contenir au moins 3 caractères.",
  }),
  returnDate: z.date({
    required_error: "La date de retour est requise.",
  }),
  reason: z.enum(["damaged", "wrong_item", "not_as_described", "change_of_mind", "other"]),
  reasonDetails: z.string().min(10, {
    message: "Les détails du motif doivent contenir au moins 10 caractères.",
  }),
  status: z.enum(["pending", "approved", "rejected", "processed"]),
  refundAmount: z.string().optional(),
  refundDate: z.date().optional(),
  acceptReturn: z.boolean().default(false),
  issueRefund: z.boolean().default(false),
  attachments: z.string().optional(),
  internalNotes: z.string().optional(),
});

interface ReturnFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  initialData?: Partial<z.infer<typeof formSchema>>;
  title?: string;
}

const ReturnForm: React.FC<ReturnFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  title = "Créer une demande de retour"
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: initialData?.orderNumber || '',
      customerName: initialData?.customerName || '',
      customerEmail: initialData?.customerEmail || '',
      product: initialData?.product || '',
      returnDate: initialData?.returnDate || new Date(),
      reason: initialData?.reason || 'damaged',
      reasonDetails: initialData?.reasonDetails || '',
      status: initialData?.status || 'pending',
      refundAmount: initialData?.refundAmount || '',
      refundDate: initialData?.refundDate,
      acceptReturn: initialData?.acceptReturn || false,
      issueRefund: initialData?.issueRefund || false,
      attachments: initialData?.attachments || '',
      internalNotes: initialData?.internalNotes || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto px-1">
      <Card className="w-full border-0 shadow-none">
        <CardHeader className="px-2 sm:px-6">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
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
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de la demande</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email du client</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="client@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produit concerné</FormLabel>
                    <FormControl>
                      <Input placeholder="Table basse vintage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motif du retour</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un motif" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="damaged" className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                            Produit endommagé
                          </SelectItem>
                          <SelectItem value="wrong_item" className="flex items-center">
                            <Package className="mr-2 h-4 w-4 text-amber-500" />
                            Mauvais produit
                          </SelectItem>
                          <SelectItem value="not_as_described" className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                            Produit non conforme
                          </SelectItem>
                          <SelectItem value="change_of_mind" className="flex items-center">
                            <RotateCcw className="mr-2 h-4 w-4 text-blue-500" />
                            Changement d'avis
                          </SelectItem>
                          <SelectItem value="other" className="flex items-center">
                            <Package className="mr-2 h-4 w-4 text-gray-500" />
                            Autre
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="approved">Approuvé</SelectItem>
                          <SelectItem value="rejected">Refusé</SelectItem>
                          <SelectItem value="processed">Traité</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reasonDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Détails du motif de retour</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Veuillez décrire en détail le motif du retour..."
                        className="min-h-[100px] resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="acceptReturn"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Accepter le retour
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="issueRefund"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Effectuer un remboursement
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="refundAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Montant du remboursement (€)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="refundDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date du remboursement</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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

              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photos / Pièces jointes (URL séparées par des virgules)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Entrez les URL des pièces jointes séparées par des virgules
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="internalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes internes (visibles uniquement par l'équipe)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Notes additionnelles pour l'équipe..."
                        className="min-h-[80px] resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                <Button variant="outline" type="button" onClick={onCancel} className="w-full sm:w-auto">
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnForm;
