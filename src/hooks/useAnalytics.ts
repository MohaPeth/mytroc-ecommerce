
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_type: string;
  product_id?: string;
  order_id?: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = async (event: AnalyticsEvent) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from('analytics_events')
        .insert({
          event_type: event.event_type,
          user_id: user?.id || null,
          product_id: event.product_id || null,
          order_id: event.order_id || null,
          properties: event.properties || {},
          session_id: sessionStorage.getItem('session_id') || 'anonymous',
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Erreur lors du tracking analytics:', error);
      // Ne pas afficher d'erreur à l'utilisateur pour l'analytics
    }
  };

  // Helper functions for common events
  const trackPageView = (page: string) => {
    trackEvent({
      event_type: 'page_view',
      properties: { page }
    });
  };

  const trackProductView = (productId: string, productName: string) => {
    trackEvent({
      event_type: 'product_view',
      product_id: productId,
      properties: { product_name: productName }
    });
  };

  const trackAddToCart = (productId: string, productName: string, price: number) => {
    trackEvent({
      event_type: 'add_to_cart',
      product_id: productId,
      properties: { product_name: productName, price }
    });
  };

  const trackPurchase = (orderId: string, totalAmount: number, itemCount: number) => {
    trackEvent({
      event_type: 'purchase',
      order_id: orderId,
      properties: { total_amount: totalAmount, item_count: itemCount }
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackProductView,
    trackAddToCart,
    trackPurchase
  };
};
