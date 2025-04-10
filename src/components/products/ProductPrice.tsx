
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DollarSign, X, MessageSquare } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const offerFormSchema = z.object({
  offerPrice: z
    .string()
    .min(1, { message: "Le prix est requis" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Le prix doit être un nombre",
    }),
  message: z.string().optional(),
});

export type OfferFormValues = z.infer<typeof offerFormSchema>;

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  offerForm: UseFormReturn<OfferFormValues>;
  offerDialogOpen: boolean;
  setOfferDialogOpen: (open: boolean) => void;
  handleOfferSubmit: (values: OfferFormValues) => void;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ 
  price, 
  originalPrice, 
  offerForm, 
  offerDialogOpen, 
  setOfferDialogOpen, 
  handleOfferSubmit 
}) => {
  return (
    <div className="mb-6">
      <div className="text-sm text-gray-500 uppercase mb-1">EUR (TOUTES TAXES COMPRISES)</div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">{price.toFixed(2)} €</span>
        {originalPrice && (
          <span className="text-lg text-gray-400 line-through">
            {originalPrice.toFixed(2)} €
          </span>
        )}
      </div>
      
      {/* Make Offer button */}
      <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
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
    </div>
  );
};

export default ProductPrice;
