
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id?: string;
  properties?: Record<string, any>;
  created_at: string;
}

const AnalyticsDashboard = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['analytics-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data as AnalyticsEvent[];
    },
  });

  if (isLoading) {
    return <div>Chargement des analytics...</div>;
  }

  const pageViews = events?.filter(e => e.event_type === 'page_view').length || 0;
  const productViews = events?.filter(e => e.event_type === 'product_view').length || 0;
  const searches = events?.filter(e => e.event_type === 'search').length || 0;
  const addToCarts = events?.filter(e => e.event_type === 'add_to_cart').length || 0;

  const topSearches = events
    ?.filter(e => e.event_type === 'search')
    .reduce((acc: Record<string, number>, event) => {
      const query = event.properties?.query;
      if (typeof query === 'string') {
        acc[query] = (acc[query] || 0) + 1;
      }
      return acc;
    }, {});

  const topSearchesList = Object.entries(topSearches || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Aperçu des données d'utilisation de votre plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues de page</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews}</div>
            <p className="text-xs text-muted-foreground">
              Pages visitées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues produits</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productViews}</div>
            <p className="text-xs text-muted-foreground">
              Produits consultés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recherches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searches}</div>
            <p className="text-xs text-muted-foreground">
              Recherches effectuées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ajouts panier</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{addToCarts}</div>
            <p className="text-xs text-muted-foreground">
              Produits ajoutés
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top recherches</CardTitle>
          <CardDescription>
            Les termes les plus recherchés sur votre plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topSearchesList.length > 0 ? (
              topSearchesList.map(([query, count]) => (
                <div key={query} className="flex items-center justify-between">
                  <span className="text-sm">{query}</span>
                  <Badge variant="secondary">{count} recherche{count > 1 ? 's' : ''}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Aucune recherche enregistrée</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Événements récents</CardTitle>
          <CardDescription>
            Les dernières actions des utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events?.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-center justify-between text-sm">
                <span>{event.event_type}</span>
                <span className="text-muted-foreground">
                  {new Date(event.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
