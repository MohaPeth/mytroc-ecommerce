
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Save, X, AlertTriangle, MessageCircle, CheckCircle, User, LifeBuoy } from 'lucide-react';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  subject: z.string().min(3, {
    message: "Le sujet doit contenir au moins 3 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["open", "in_progress", "resolved", "closed"]),
  agent: z.string().optional(),
  orderNumber: z.string().optional(),
  customerEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  attachments: z.string().optional(),
  internalNotes: z.string().optional(),
});

interface SupportFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  initialData?: Partial<z.infer<typeof formSchema>>;
  title?: string;
  agents?: { id: string; name: string }[];
}

const SupportForm: React.FC<SupportFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  title = "Créer un ticket de support",
  agents = [
    { id: "1", name: "Marie Dubois" },
    { id: "2", name: "Thomas Martin" },
    { id: "3", name: "Sophie Bernard" },
    { id: "4", name: "Lucas Petit" },
  ]
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: initialData?.subject || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
      status: initialData?.status || 'open',
      agent: initialData?.agent || 'unassigned',
      orderNumber: initialData?.orderNumber || '',
      customerEmail: initialData?.customerEmail || '',
      attachments: initialData?.attachments || '',
      internalNotes: initialData?.internalNotes || '',
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
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sujet</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Problème de livraison" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une priorité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low" className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                          Basse
                        </SelectItem>
                        <SelectItem value="medium" className="flex items-center">
                          <MessageCircle className="mr-2 h-4 w-4 text-orange-500" />
                          Moyenne
                        </SelectItem>
                        <SelectItem value="high" className="flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                          Haute
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
                        <SelectItem value="open">Ouvert</SelectItem>
                        <SelectItem value="in_progress">En cours</SelectItem>
                        <SelectItem value="resolved">Résolu</SelectItem>
                        <SelectItem value="closed">Fermé</SelectItem>
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
                name="agent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent assigné</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unassigned">Non assigné</SelectItem>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de commande (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="CMD-00000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description du problème</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez le problème en détail..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
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
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pièces jointes (URL séparées par des virgules)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image1.jpg, https://example.com/doc.pdf" {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez les URL des pièces jointes séparées par des virgules
                  </FormDescription>
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

export default SupportForm;

