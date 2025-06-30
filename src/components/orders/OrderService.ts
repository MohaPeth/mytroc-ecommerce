
import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface CreateOrderData {
  items: OrderItem[];
  delivery_method: 'relay' | 'home';
  delivery_address?: any;
  relay_point_id?: string;
  payment_method: string;
  notes?: string;
}

export class OrderService {
  
  static async createOrder(orderData: CreateOrderData) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Utilisateur non connecté');
      }

      // Calculate total amount
      const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = orderData.delivery_method === 'home' ? 5.99 : 0;
      const finalTotal = totalAmount + deliveryFee;

      // Generate order number
      const orderNumber = `MT${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: finalTotal,
          delivery_fee: deliveryFee,
          delivery_method: orderData.delivery_method,
          delivery_address: orderData.delivery_address || {},
          relay_point_id: orderData.relay_point_id,
          payment_method: orderData.payment_method,
          payment_status: 'pending',
          status: 'pending',
          notes: orderData.notes,
          payment_details: {}
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { order, success: true };
    } catch (error: any) {
      console.error('Erreur création commande:', error);
      return { error: error.message, success: false };
    }
  }

  static async getUserOrders(userId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, images)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { orders: data, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  static async updateOrderStatus(orderId: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { order: data, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }
}
