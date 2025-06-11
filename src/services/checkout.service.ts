import { supabase } from '@/integrations/supabase/client';
import { DeliveryMethod, PaymentMethod, DeliveryAddress, RelayPoint } from '@/types/checkout.types';
import { AnalyticsService } from './analytics.service';

export const createOrderNotification = async (userId: string, orderNumber: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert([{
        user_id: userId,
        title: 'Nouvelle commande créée !',
        message: `Votre commande #${orderNumber} a été créée avec succès.`,
        type: 'order',
      }]);

    if (error) {
      console.error('Erreur lors de la création de la notification de commande:', error);
    }
  } catch (error) {
    console.error('Erreur inattendue lors de la création de la notification de commande:', error);
  }
};

export const createOrderItems = async (orderId: string, items: any[]) => {
  try {
    // Préparer les données pour l'insertion en masse
    const orderItemsData = items.map(item => ({
      order_id: orderId,
      product_id: item.productId || item.id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      image: item.image,
    }));

    // Insérer en masse les articles de la commande
    const { error } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (error) {
      throw new Error(`Erreur lors de la création des articles de la commande: ${error.message}`);
    }
  } catch (error: any) {
    console.error('Erreur lors de la création des articles de la commande:', error.message);
    throw error;
  }
};

export const createOrder = async (
  userId: string,
  totalAmount: number,
  deliveryMethod: DeliveryMethod,
  deliveryFee: number,
  relayPoint?: RelayPoint | null,
  useMainAddress?: boolean,
  deliveryAddress?: DeliveryAddress | null,
  paymentMethod?: PaymentMethod,
  paymentDetails?: Record<string, any>
): Promise<{ id: string; order_number: string }> => {
  if (!userId) {
    throw new Error('L\'ID utilisateur est requis pour créer une commande.');
  }

  if (totalAmount <= 0) {
    throw new Error('Le montant total de la commande doit être supérieur à zéro.');
  }

  const orderNumber = Math.random().toString(36).substring(2, 15).toUpperCase();

  const { data: orderData, error } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      total_amount: totalAmount,
      delivery_method: deliveryMethod,
      delivery_fee: deliveryFee,
      relay_point_id: relayPoint?.id || null,
      delivery_address: useMainAddress ? null : deliveryAddress,
      payment_method: paymentMethod || 'card',
      payment_details: paymentDetails || {},
      status: 'pending',
      payment_status: 'pending',
      order_number: orderNumber
    }])
    .select('id, order_number')
    .single();

  if (error) {
    throw new Error(`Erreur lors de la création de la commande: ${error.message}`);
  }

  // Track purchase in analytics
  AnalyticsService.trackPurchase(orderData.id, totalAmount);

  return orderData;
};
