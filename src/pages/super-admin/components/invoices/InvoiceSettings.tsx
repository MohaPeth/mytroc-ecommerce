
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

// Schéma de validation du formulaire
const formSchema = z.object({
  companyName: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  companyAddress: z.string().min(1, { message: "L'adresse de l'entreprise est requise" }),
  companyEmail: z.string().email({ message: "Email invalide" }),
  companyPhone: z.string().min(1, { message: "Le téléphone est requis" }),
  vatNumber: z.string().optional(),
  siretNumber: z.string().optional(),
  additionalInfo: z.string().optional(),
  autoNumbering: z.boolean().default(true),
  autoSend: z.boolean().default(false),
  invoicePrefix: z.string().optional(),
  taxRate: z.number().min(0, { message: "Le taux de TVA ne peut pas être négatif" }).max(100, { message: "Le taux de TVA ne peut pas dépasser 100%" }).optional(),
  footerText: z.string().optional(),
});

const InvoiceSettings = () => {
  // Initialiser le formulaire avec des valeurs par défaut
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: 'MyTroc SAS',
      companyAddress: '123 Rue du Commerce, 75001 Paris, France',
      companyEmail: 'contact@mytroc.fr',
      companyPhone: '+33 1 23 45 67 89',
      vatNumber: 'FR12345678900',
      siretNumber: '123456789',
      additionalInfo: '',
      autoNumbering: true,
      autoSend: false,
      invoicePrefix: 'INV-',
      taxRate: 20,
      footerText: 'Merci pour votre confiance et à bientôt sur MyTroc!',
    },
  });
  
  // Soumettre le formulaire
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres des factures ont été mis à jour avec succès.",
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8">
          {/* Informations de l'entreprise */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations de l'entreprise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'entreprise</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vatNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de TVA</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="siretNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro SIRET</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Paramètres des factures */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Paramètres des factures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoicePrefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Préfixe des factures</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Par exemple, INV- donnera INV-00001
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taux de TVA par défaut (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value || '0'))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="autoNumbering"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-md">
                    <div className="space-y-0.5">
                      <FormLabel>Numérotation automatique</FormLabel>
                      <FormDescription>
                        Attribuer automatiquement un numéro aux nouvelles factures
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="autoSend"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-md">
                    <div className="space-y-0.5">
                      <FormLabel>Envoi automatique</FormLabel>
                      <FormDescription>
                        Envoyer automatiquement les factures par email
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="footerText"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Texte de pied de page</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                    <FormDescription>
                      Ce texte apparaîtra au bas de toutes les factures
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Informations complémentaires</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormDescription>
                      Coordonnées bancaires, conditions de paiement, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Enregistrer les paramètres</Button>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceSettings;
