
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/hooks/useCart';
import { DeliveryAddress, DeliveryMethod, PaymentMethod, RelayPoint } from '@/types/checkout.types';
import { formatAddressForStorage, generateTempOrderNumber } from '@/utils/checkout.utils';

interface OrderData {
  user_id: string;
  total_amount: number;
  delivery_method: DeliveryMethod;
  delivery_fee: number;
  relay_point_id: string | null;
  payment_method: PaymentMethod;
  payment_details: any;
  delivery_address: any;
}

export const createOrder = async (
  userId: string,
  totalAmount: number,
  deliveryMethod: DeliveryMethod,
  deliveryFee: number,
  relayPoint: RelayPoint | null,
  useMainAddress: boolean,
  deliveryAddress: DeliveryAddress | null,
  paymentMethod: PaymentMethod,
  paymentDetails: any
) => {
  const orderData = {
    user_id: userId,
    order_number: generateTempOrderNumber(),
    total_amount: totalAmount,
    delivery_method: deliveryMethod,
    delivery_fee: deliveryFee,
    relay_point_id: relayPoint?.id ? String(relayPoint.id) : null,
    delivery_address: formatAddressForStorage(deliveryAddress, useMainAddress),
    payment_method: paymentMethod,
    payment_details: paymentDetails,
    status: 'pending',
    payment_status: paymentMethod === 'cod' ? 'pending' : 'processing'
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createOrderItems = async (orderId: string, items: CartItem[]) => {
  const orderItems = items.map(item => ({
    order_id: orderId,
    product_id: String(item.productId || item.id),
    quantity: item.quantity,
    price: item.price,
    total_price: item.price * item.quantity
  }));

  const { error } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (error) {
    throw error;
  }

  return true;
};

export const createOrderNotification = async (
  userId: string, 
  orderNumber: string
) => {
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title: 'Commande confirmée',
      message: `Votre commande #${orderNumber} a été confirmée et est en cours de traitement.`,
      type: 'order',
      action_url: `/order-details/${orderNumber}`
    });

  if (error) {
    throw error;
  }

  return true;
};
