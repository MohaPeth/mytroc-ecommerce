
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, MessageSquare, X } from 'lucide-react';

// Define schema for offer form validation
const offerFormSchema = z.object({
  offerPrice: z
    .string()
    .min(1, { message: "Le prix est requis" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Le prix doit être un nombre",
    }),
  message: z.string().optional(),
});

type OfferFormValues = z.infer<typeof offerFormSchema>;

interface OfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const OfferDialog: React.FC<OfferDialogProps> = ({ open, onOpenChange, onSuccess }) => {
  // Offer form setup
  const offerForm = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      offerPrice: "",
      message: "",
    },
  });

  // Function to submit offer
  const handleOfferSubmit = (values: OfferFormValues) => {
    // Here you would send the offer to your backend API
    console.log('Offer submitted:', values);
    
    // Close dialog and show success message
    onOpenChange(false);
    onSuccess();
    
    // Reset form after submission
    offerForm.reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="negotiation" className="w-full mt-4">
            <DollarSign className="h-4 w-4 mr-2" />
            Faire une offre
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Faire une offre</DialogTitle>
          </DialogHeader>
          <Form {...offerForm}>
            <form onSubmit={offerForm.handleSubmit(handleOfferSubmit)} className="space-y-4 py-4">
              <FormField
                control={offerForm.control}
                name="offerPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="offerPrice">Prix proposé (€)</FormLabel>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Input
                          id="offerPrice"
                          placeholder="Entrez votre prix"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={offerForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message">Message (facultatif)</FormLabel>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Précisez votre offre..."
                          className="min-h-[100px] pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:justify-between mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="gap-2">
                    <X className="h-4 w-4" />
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="submit" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  Soumettre l'offre
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OfferDialog;
