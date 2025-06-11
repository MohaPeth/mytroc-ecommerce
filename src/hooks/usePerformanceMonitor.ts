
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoadedTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    // Page Load Time
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationTiming) {
      setMetrics(prev => ({
        ...prev,
        pageLoadTime: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        domContentLoadedTime: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart
      }));
    }

    // Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }));
            }
            break;
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, largestContentfulPaint: entry.startTime }));
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setMetrics(prev => ({ 
                ...prev, 
                cumulativeLayoutShift: (prev.cumulativeLayoutShift || 0) + (entry as any).value 
              }));
            }
            break;
        }
      }
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);

  const logMetrics = () => {
    console.table(metrics);
  };

  return { metrics, logMetrics };
}
