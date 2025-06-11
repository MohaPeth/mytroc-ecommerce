
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Activity, Clock, Zap, Gauge } from 'lucide-react';

const PerformanceMonitor = () => {
  const { metrics, logMetrics } = usePerformanceMonitor();

  const formatTime = (time: number) => {
    if (time < 1000) return `${time.toFixed(0)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  const getScoreColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.fair) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Performance Monitor</h1>
        <Button onClick={logMetrics} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Log Metrics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Page Load Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Load Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.pageLoadTime || 0, { good: 1000, fair: 3000 })}`}>
              {metrics.pageLoadTime ? formatTime(metrics.pageLoadTime) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Good: &lt;1s, Fair: &lt;3s
            </p>
          </CardContent>
        </Card>

        {/* First Contentful Paint */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">First Contentful Paint</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.firstContentfulPaint || 0, { good: 1800, fair: 3000 })}`}>
              {metrics.firstContentfulPaint ? formatTime(metrics.firstContentfulPaint) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Good: &lt;1.8s, Fair: &lt;3s
            </p>
          </CardContent>
        </Card>

        {/* Largest Contentful Paint */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Largest Contentful Paint</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.largestContentfulPaint || 0, { good: 2500, fair: 4000 })}`}>
              {metrics.largestContentfulPaint ? formatTime(metrics.largestContentfulPaint) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Good: &lt;2.5s, Fair: &lt;4s
            </p>
          </CardContent>
        </Card>

        {/* Cumulative Layout Shift */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumulative Layout Shift</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.cumulativeLayoutShift || 0, { good: 0.1, fair: 0.25 })}`}>
              {metrics.cumulativeLayoutShift?.toFixed(3) || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Good: &lt;0.1, Fair: &lt;0.25
            </p>
          </CardContent>
        </Card>

        {/* DOM Content Loaded */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DOM Content Loaded</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.domContentLoadedTime || 0, { good: 800, fair: 1600 })}`}>
              {metrics.domContentLoadedTime ? formatTime(metrics.domContentLoadedTime) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Good: &lt;0.8s, Fair: &lt;1.6s
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Optimize images with proper formats (WebP, AVIF) and lazy loading</li>
            <li>• Implement code splitting and dynamic imports for large bundles</li>
            <li>• Use React.memo() and useMemo() for expensive computations</li>
            <li>• Minimize DOM manipulations and use virtual scrolling for long lists</li>
            <li>• Implement proper caching strategies for API calls</li>
            <li>• Use CDN for static assets and enable compression (gzip/brotli)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
