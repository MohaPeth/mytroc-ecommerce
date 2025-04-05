import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Trash, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { downloadInvoice } from '@/utils/invoiceGenerator';
import { InvoiceData, InvoiceItem } from '@/utils/invoiceGenerator';
import PreviewInvoice from './PreviewInvoice';

// Schéma de validation du formulaire
const formSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Le numéro de facture est requis" }),
  date: z.date(),
  customerName: z.string().min(1, { message: "Le nom du client est requis" }),
  customerEmail: z.string().email({ message: "Email invalide" }),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  subtotal: z.number().min(0, { message: "Le montant ne peut pas être négatif" }),
  deliveryFee: z.number().min(0, { message: "Les frais ne peuvent pas être négatifs" }).optional(),
  tax: z.number().min(0, { message: "La TVA ne peut pas être négative" }).optional(),
});

const InvoiceCreator = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: '', quantity: 1, price: 0 }
  ]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  
  // Initialiser le formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date(),
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      subtotal: 0,
      deliveryFee: 0,
      tax: 0
    },
  });
  
  // Ajouter un nouvel article
  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };
  
  // Supprimer un article
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      updateSubtotal(newItems);
    }
  };
  
  // Mettre à jour un article
  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: field === 'price' || field === 'quantity' ? Number(value) : value };
    setItems(newItems);
    updateSubtotal(newItems);
  };
  
  // Calculer le sous-total
  const updateSubtotal = (currentItems: InvoiceItem[]) => {
    const subtotal = currentItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    form.setValue('subtotal', subtotal);
  };
  
  // Calculer le total
  const calculateTotal = () => {
    const subtotal = form.getValues('subtotal') || 0;
    const deliveryFee = form.getValues('deliveryFee') || 0;
    const tax = form.getValues('tax') || 0;
    return subtotal + deliveryFee + tax;
  };

  // Prévisualiser la facture
  const handlePreview = () => {
    const data = form.getValues();
    
    if (!items.every(item => item.name.trim())) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le nom de tous les articles",
        variant: "destructive"
      });
      return;
    }
    
    // Préparer les données pour la prévisualisation
    const invoicePreview = {
      id: data.invoiceNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      date: data.date,
      amount: calculateTotal(),
      status: "draft",
      items: items
    };
    
    setPreviewData(invoicePreview);
    setPreviewOpen(true);
  };
  
  // Soumettre le formulaire
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!items.every(item => item.name.trim())) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le nom de tous les articles",
        variant: "destructive"
      });
      return;
    }
    
    // Préparer les données pour la génération de la facture
    const invoiceData: InvoiceData = {
      invoiceNumber: data.invoiceNumber,
      date: data.date,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      items: items,
      subtotal: data.subtotal,
      total: calculateTotal()
    };
    
    // Ajouter les propriétés optionnelles seulement si elles ont des valeurs
    if (data.customerPhone) {
      invoiceData.customerPhone = data.customerPhone;
    }
    
    if (data.customerAddress) {
      invoiceData.customerAddress = data.customerAddress;
    }
    
    if (data.deliveryFee) {
      invoiceData.deliveryFee = data.deliveryFee;
    }
    
    if (data.tax) {
      invoiceData.tax = data.tax;
    }
    
    try {
      downloadInvoice(invoiceData);
      toast({
        title: "Succès",
        description: "La facture a été générée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de la facture",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations de la facture */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Informations de la facture</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>N° de facture</FormLabel>
                    <FormControl>
                      <Input placeholder="INV-0001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
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
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
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
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Informations du client */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations du client</h3>
              
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du client" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="client@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 6 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse du client" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Articles et totaux */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Articles</h3>
              <Button type="button" size="sm" variant="outline" onClick={addItem}>
                <Plus className="mr-1 h-3 w-3" /> Ajouter un article
              </Button>
            </div>
            
            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline">Article {index + 1}</Badge>
                    {items.length > 1 && (
                      <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => removeItem(index)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <FormLabel>Nom de l'article</FormLabel>
                      <Input 
                        value={item.name} 
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        placeholder="Nom de l'article"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>Quantité</FormLabel>
                        <Input 
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <FormLabel>Prix unitaire (€)</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price / 100}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) * 100)}
                        />
                      </div>
                    </div>
                    
                    <div className="text-right font-semibold">
                      Total: {((item.price * item.quantity) / 100).toFixed(2)} €
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Récapitulatif</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-right text-gray-600">Sous-total:</div>
                <div className="text-right font-medium">{(form.getValues('subtotal') / 100).toFixed(2)} €</div>
                
                <div className="text-right text-gray-600">
                  <FormField
                    control={form.control}
                    name="deliveryFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frais de livraison:</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.value === undefined ? '' : field.value / 100}
                          onChange={(e) => field.onChange(parseFloat(e.target.value || '0') * 100)}
                          className="mt-1"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-right font-medium">{((form.getValues('deliveryFee') || 0) / 100).toFixed(2)} €</div>
                
                <div className="text-right text-gray-600">
                  <FormField
                    control={form.control}
                    name="tax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TVA:</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.value === undefined ? '' : field.value / 100}
                          onChange={(e) => field.onChange(parseFloat(e.target.value || '0') * 100)}
                          className="mt-1"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-right font-medium">{((form.getValues('tax') || 0) / 100).toFixed(2)} €</div>
                
                <Separator className="col-span-2 my-2" />
                
                <div className="text-right font-bold text-lg">Total:</div>
                <div className="text-right font-bold text-lg">{(calculateTotal() / 100).toFixed(2)} €</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handlePreview}>Aperçu</Button>
          <Button type="submit">Générer la facture</Button>
        </div>
      </form>

      {previewData && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Aperçu de la facture</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <PreviewInvoice invoice={previewData} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Form>
  );
};

export default InvoiceCreator;
