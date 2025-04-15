
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DialogFooter } from '@/components/ui/dialog';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Schéma de validation pour le formulaire de campagne email
const emailCampaignSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  subject: z.string().min(5, { message: 'L\'objet doit contenir au moins 5 caractères' }),
  segment: z.string().min(1, { message: 'Sélectionnez un segment' }),
  status: z.enum(['draft', 'scheduled', 'active']),
  scheduledDate: z.union([z.string(), z.date()]),
  recipientCount: z.coerce.number()
});

type EmailCampaignFormValues = z.infer<typeof emailCampaignSchema>;

interface EmailCampaignFormProps {
  onSubmit: (data: EmailCampaignFormValues) => void;
  initialData?: any | null;
  onCancel: () => void;
}

const EmailCampaignForm: React.FC<EmailCampaignFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const form = useForm<EmailCampaignFormValues>({
    resolver: zodResolver(emailCampaignSchema),
    defaultValues: initialData || {
      name: '',
      subject: '',
      segment: 'all_users',
      status: 'draft',
      scheduledDate: 'auto',
      recipientCount: 0
    }
  });

  const watchStatus = form.watch('status');
  const watchSegment = form.watch('segment');

  // Simuler le comptage des destinataires en fonction du segment
  const getRecipientCount = (segment: string) => {
    switch (segment) {
      case 'all_users':
        return 3845;
      case 'new_users':
        return 426;
      case 'cart_abandoners':
        return 189;
      case 'recent_buyers':
        return 753;
      default:
        return 0;
    }
  };

  // Mettre à jour le nombre de destinataires lorsque le segment change
  React.useEffect(() => {
    if (watchSegment) {
      form.setValue('recipientCount', getRecipientCount(watchSegment));
    }
  }, [watchSegment, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la campagne</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Newsletter mensuelle - Avril 2025" {...field} />
              </FormControl>
              <FormDescription>
                Un nom interne pour identifier cette campagne (non visible par les destinataires)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objet de l'email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Découvrez nos nouveautés du mois d'avril" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                L'objet de l'email que verront les destinataires
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="segment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segment ciblé</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un segment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all_users">Tous les utilisateurs</SelectItem>
                  <SelectItem value="new_users">Nouveaux utilisateurs</SelectItem>
                  <SelectItem value="cart_abandoners">Paniers abandonnés</SelectItem>
                  <SelectItem value="recent_buyers">Acheteurs récents</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {form.getValues('recipientCount') > 0 && 
                  `Environ ${form.getValues('recipientCount').toLocaleString()} destinataires dans ce segment`
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut de la campagne</FormLabel>
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
                      Programmée
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Automatique (pour les emails déclenchés)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchStatus === 'scheduled' && (
          <FormField
            control={form.control}
            name="scheduledDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date d'envoi programmée</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && typeof field.value !== 'string' ? (
                          format(field.value, "PPP", { locale: fr })
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
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  La date à laquelle l'email sera envoyé
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Créer la campagne'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EmailCampaignForm;
