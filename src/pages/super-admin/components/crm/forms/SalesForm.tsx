
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { salesFormSchema, SalesFormValues } from './schemas/salesFormSchema';
import OrderField from './fields/OrderField';
import DateField from './fields/DateField';
import AmountField from './fields/AmountField';
import PaymentMethodField from './fields/PaymentMethodField';
import CustomerField from './fields/CustomerField';
import ProductsField from './fields/ProductsField';
import NotesField from './fields/NotesField';
import SalesFormActions from './SalesFormActions';

interface SalesFormProps {
  onSubmit: (data: SalesFormValues) => void;
  onCancel: () => void;
  initialData?: Partial<SalesFormValues>;
  title?: string;
}

const SalesForm: React.FC<SalesFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  title = "Ajouter une vente"
}) => {
  const form = useForm<SalesFormValues>({
    resolver: zodResolver(salesFormSchema),
    defaultValues: {
      orderNumber: initialData?.orderNumber || '',
      date: initialData?.date || new Date(),
      amount: initialData?.amount || '',
      paymentMethod: initialData?.paymentMethod || 'card',
      products: initialData?.products || '',
      customerName: initialData?.customerName || '',
      notes: initialData?.notes || '',
    },
  });

  const handleSubmit = (values: SalesFormValues) => {
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
                <OrderField form={form} />
                <DateField form={form} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AmountField form={form} />
                <PaymentMethodField form={form} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomerField form={form} />
                <ProductsField form={form} />
              </div>

              <NotesField form={form} />
              
              <SalesFormActions onCancel={onCancel} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesForm;
