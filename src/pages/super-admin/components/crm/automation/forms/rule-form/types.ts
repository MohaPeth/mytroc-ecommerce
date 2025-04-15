
import { z } from 'zod';

export const ruleSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  description: z.string().min(5, { message: 'La description doit contenir au moins 5 caractères' }),
  condition: z.string().min(5, { message: 'La condition doit contenir au moins 5 caractères' }),
  target: z.string().min(1, { message: 'Sélectionnez au moins une cible' }),
  action: z.string().min(1, { message: 'Sélectionnez une action' }),
  message: z.string().min(5, { message: 'Le message doit contenir au moins 5 caractères' }),
  priority: z.enum(['high', 'medium', 'low'])
});

export type RuleFormValues = z.infer<typeof ruleSchema>;
