
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  event_type: string;
  user_id?: string;
  product_id?: string;
  order_id?: string;
  properties?: Record<string, any>;
  session_id?: string;
  user_agent?: string;
}

export class AnalyticsService {
  private static sessionId = Math.random().toString(36).substring(2, 15);

  static async trackEvent(event: AnalyticsEvent) {
    try {
      const eventData = {
        ...event,
        session_id: event.session_id || this.sessionId,
        user_agent: event.user_agent || navigator.userAgent,
        properties: event.properties || {},
      };

      const { error } = await supabase
        .from('analytics_events')
        .insert([eventData]);

      if (error) {
        console.error('Erreur lors du tracking:', error);
      }
    } catch (error) {
      console.error('Erreur analytics:', error);
    }
  }

  static trackPageView(page: string, userId?: string) {
    this.trackEvent({
      event_type: 'page_view',
      user_id: userId,
      properties: { page }
    });
  }

  static trackProductView(productId: string, userId?: string) {
    this.trackEvent({
      event_type: 'product_view',
      user_id: userId,
      product_id: productId
    });
  }

  static trackAddToCart(productId: string, quantity: number, userId?: string) {
    this.trackEvent({
      event_type: 'add_to_cart',
      user_id: userId,
      product_id: productId,
      properties: { quantity }
    });
  }

  static trackPurchase(orderId: string, amount: number, userId?: string) {
    this.trackEvent({
      event_type: 'purchase',
      user_id: userId,
      order_id: orderId,
      properties: { amount }
    });
  }

  static trackSearch(query: string, resultsCount: number, userId?: string) {
    this.trackEvent({
      event_type: 'search',
      user_id: userId,
      properties: { query, resultsCount }
    });
  }
}
