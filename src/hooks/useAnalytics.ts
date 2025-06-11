
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { AnalyticsService } from '@/services/analytics.service';

export const useAnalytics = () => {
  const { user } = useAuth();

  // Track page view automatically
  const trackPageView = (page: string) => {
    AnalyticsService.trackPageView(page, user?.id);
  };

  // Track product interactions
  const trackProductView = (productId: string) => {
    AnalyticsService.trackProductView(productId, user?.id);
  };

  const trackAddToCart = (productId: string, quantity: number) => {
    AnalyticsService.trackAddToCart(productId, quantity, user?.id);
  };

  // Track search
  const trackSearch = (query: string, resultsCount: number) => {
    AnalyticsService.trackSearch(query, resultsCount, user?.id);
  };

  // Track purchase
  const trackPurchase = (orderId: string, amount: number) => {
    AnalyticsService.trackPurchase(orderId, amount, user?.id);
  };

  // Track custom events
  const trackEvent = (eventType: string, properties?: Record<string, any>) => {
    AnalyticsService.trackEvent({
      event_type: eventType,
      user_id: user?.id,
      properties
    });
  };

  return {
    trackPageView,
    trackProductView,
    trackAddToCart,
    trackSearch,
    trackPurchase,
    trackEvent
  };
};
