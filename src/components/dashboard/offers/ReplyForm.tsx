
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const replyFormSchema = z.object({
  response: z.string().min(1, "Veuillez entrer une réponse")
});

type ReplyFormValues = z.infer<typeof replyFormSchema>;

interface ReplyFormProps {
  sellerResponse?: string;
  onSubmit: (response: string) => void;
  isReadOnly?: boolean;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ 
  sellerResponse, 
  onSubmit, 
  isReadOnly = false 
}) => {
  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
      response: sellerResponse || ''
    }
  });

  const handleSubmit = (values: ReplyFormValues) => {
    onSubmit(values.response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Répondre au client..." 
                  className="min-h-[100px]"
                  readOnly={isReadOnly}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isReadOnly && (
          <Button type="submit" className="w-full">
            Envoyer la réponse
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ReplyForm;
