
import { useState, useEffect } from 'react';
import { OrderService, CreateOrderData } from '@/components/orders/OrderService';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useOrders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await OrderService.getUserOrders(user.id);
      if (result.success && result.orders) {
        setOrders(result.orders);
      } else {
        console.error('Error fetching orders:', result.error);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderData) => {
    setCreating(true);
    try {
      const result = await OrderService.createOrder(orderData);
      
      if (result.success) {
        toast({
          title: "Commande créée",
          description: "Votre commande a été créée avec succès !",
        });
        await fetchOrders(); // Refresh orders
        return result.order;
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la création de la commande",
          variant: "destructive"
        });
        return null;
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    creating,
    createOrder,
    fetchOrders
  };
};
