
import { z } from "zod";

export const salesFormSchema = z.object({
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

export type SalesFormValues = z.infer<typeof salesFormSchema>;
