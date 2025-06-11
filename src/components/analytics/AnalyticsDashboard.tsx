
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, ShoppingCart, Search, TrendingUp } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

interface AnalyticsData {
  page_views: number;
  add_to_cart: number;
  searches: number;
  purchases: number;
  top_products: Array<{ product_id: string; count: number; }>;
  popular_searches: Array<{ query: string; count: number; }>;
  daily_stats: Array<{ date: string; views: number; events: number; }>;
}

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('7');

  useEffect(() => {
    if (!user) return;
    
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const daysAgo = parseInt(timePeriod);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysAgo);

        // Fetch analytics data
        const { data: analyticsData, error } = await supabase
          .from('analytics_events')
          .select('*')
          .gte('created_at', startDate.toISOString());

        if (error) {
          console.error('Erreur lors du chargement des analytics:', error);
          return;
        }

        // Process data
        const processedData: AnalyticsData = {
          page_views: analyticsData.filter(event => event.event_type === 'page_view').length,
          add_to_cart: analyticsData.filter(event => event.event_type === 'add_to_cart').length,
          searches: analyticsData.filter(event => event.event_type === 'search').length,
          purchases: analyticsData.filter(event => event.event_type === 'purchase').length,
          top_products: [],
          popular_searches: [],
          daily_stats: []
        };

        // Top products
        const productViews = analyticsData
          .filter(event => event.event_type === 'product_view' && event.product_id)
          .reduce((acc, event) => {
            acc[event.product_id] = (acc[event.product_id] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

        processedData.top_products = Object.entries(productViews)
          .map(([product_id, count]) => ({ product_id, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Popular searches
        const searchQueries = analyticsData
          .filter(event => event.event_type === 'search' && event.properties?.query)
          .reduce((acc, event) => {
            const query = event.properties.query;
            acc[query] = (acc[query] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

        processedData.popular_searches = Object.entries(searchQueries)
          .map(([query, count]) => ({ query, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Daily stats
        const dailyStats = analyticsData.reduce((acc, event) => {
          const date = new Date(event.created_at).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = { date, views: 0, events: 0 };
          }
          if (event.event_type === 'page_view') {
            acc[date].views++;
          }
          acc[date].events++;
          return acc;
        }, {} as Record<string, { date: string; views: number; events: number; }>);

        processedData.daily_stats = Object.values(dailyStats).sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setData(processedData);
      } catch (error) {
        console.error('Erreur inattendue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, timePeriod]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCard
              key={i}
              title="Chargement..."
              value="..."
              icon={<TrendingUp className="h-5 w-5" />}
              loading={true}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Aucune donnée disponible</p>
        </CardContent>
      </Card>
    );
  }

  const COLORS = ['#16a34a', '#3b82f6', '#a855f7', '#f97316', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 derniers jours</SelectItem>
            <SelectItem value="30">30 derniers jours</SelectItem>
            <SelectItem value="90">90 derniers jours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vues de pages"
          value={data.page_views.toString()}
          icon={<Eye className="h-5 w-5" />}
          description="Pages visitées"
        />
        <StatCard
          title="Ajouts au panier"
          value={data.add_to_cart.toString()}
          icon={<ShoppingCart className="h-5 w-5" />}
          description="Produits ajoutés"
        />
        <StatCard
          title="Recherches"
          value={data.searches.toString()}
          icon={<Search className="h-5 w-5" />}
          description="Recherches effectuées"
        />
        <StatCard
          title="Achats"
          value={data.purchases.toString()}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Commandes finalisées"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité quotidienne</CardTitle>
            <CardDescription>Vues de pages et événements par jour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.daily_stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#16a34a" name="Vues" />
                  <Bar dataKey="events" fill="#3b82f6" name="Événements" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recherches populaires</CardTitle>
            <CardDescription>Les requêtes les plus fréquentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.popular_searches.slice(0, 5).map((search, index) => (
                <div key={search.query} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{search.query}</span>
                  <span className="text-sm text-muted-foreground">{search.count} recherches</span>
                </div>
              ))}
              {data.popular_searches.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune recherche enregistrée</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
