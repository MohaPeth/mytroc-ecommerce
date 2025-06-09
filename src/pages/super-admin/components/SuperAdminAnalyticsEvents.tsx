
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart4, Search, Filter, Download, Eye, Calendar, MousePointer, ShoppingCart, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SuperAdminAnalyticsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  // Mock data pour les événements analytics
  const analyticsEvents = [
    {
      id: '1',
      event_type: 'page_view',
      user_id: 'user-1',
      product_id: 'prod-1',
      session_id: 'sess-abc123',
      ip_address: '192.168.1.1',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      properties: { page: '/shop', category: 'electronics' },
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      event_type: 'product_click',
      user_id: 'user-2',
      product_id: 'prod-2',
      session_id: 'sess-def456',
      ip_address: '192.168.1.2',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      properties: { product_name: 'iPhone 14', price: 999 },
      created_at: '2024-01-15T10:25:00Z'
    },
    {
      id: '3',
      event_type: 'purchase',
      user_id: 'user-3',
      order_id: 'order-1',
      session_id: 'sess-ghi789',
      ip_address: '192.168.1.3',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS)',
      properties: { total_amount: 1299, payment_method: 'card' },
      created_at: '2024-01-15T10:20:00Z'
    }
  ];

  // Mock data pour les graphiques
  const eventTrendsData = [
    { date: '01/01', page_views: 1200, clicks: 480, purchases: 45 },
    { date: '02/01', page_views: 1350, clicks: 520, purchases: 52 },
    { date: '03/01', page_views: 1180, clicks: 450, purchases: 38 },
    { date: '04/01', page_views: 1420, clicks: 580, purchases: 62 },
    { date: '05/01', page_views: 1380, clicks: 560, purchases: 58 },
    { date: '06/01', page_views: 1520, clicks: 620, purchases: 71 },
    { date: '07/01', page_views: 1650, clicks: 680, purchases: 79 }
  ];

  const eventTypesData = [
    { name: 'Page Views', value: 45, color: '#8884d8' },
    { name: 'Product Clicks', value: 30, color: '#82ca9d' },
    { name: 'Purchases', value: 15, color: '#ffc658' },
    { name: 'Sign-ups', value: 10, color: '#ff7300' }
  ];

  const filteredEvents = analyticsEvents.filter(event => 
    (event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.user_id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (eventTypeFilter === 'all' || event.event_type === eventTypeFilter)
  );

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'page_view': return <Eye className="h-4 w-4" />;
      case 'product_click': return <MousePointer className="h-4 w-4" />;
      case 'purchase': return <ShoppingCart className="h-4 w-4" />;
      case 'signup': return <Users className="h-4 w-4" />;
      default: return <BarChart4 className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'page_view': return 'bg-blue-100 text-blue-800';
      case 'product_click': return 'bg-green-100 text-green-800';
      case 'purchase': return 'bg-purple-100 text-purple-800';
      case 'signup': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart4 className="h-6 w-6 text-indigo-500" />
            Analytics & Événements
          </h2>
          <p className="text-muted-foreground">
            Analysez le comportement des utilisateurs et les événements de la plateforme
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exporter les données
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Événements Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,247</div>
            <p className="text-xs text-green-600">+12% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sessions Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,456</div>
            <p className="text-xs text-green-600">+8% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-red-600">-0.3% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenus Générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€24,531</div>
            <p className="text-xs text-green-600">+15% vs hier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendances des Événements</CardTitle>
            <CardDescription>Évolution des événements sur les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  page_views: { label: "Vues", color: "#8884d8" },
                  clicks: { label: "Clics", color: "#82ca9d" },
                  purchases: { label: "Achats", color: "#ffc658" }
                }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={eventTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="page_views" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="clicks" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="purchases" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Événements</CardTitle>
            <CardDescription>Distribution par type d'événement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventTypesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journal des Événements</CardTitle>
          <CardDescription>
            Historique détaillé de tous les événements de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par type d'événement ou utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type d'événement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les événements</SelectItem>
                <SelectItem value="page_view">Vues de page</SelectItem>
                <SelectItem value="product_click">Clics produit</SelectItem>
                <SelectItem value="purchase">Achats</SelectItem>
                <SelectItem value="signup">Inscriptions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Propriétés</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Badge className={getEventTypeColor(event.event_type)}>
                      {getEventTypeIcon(event.event_type)}
                      <span className="ml-1">{event.event_type}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{event.user_id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{event.session_id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {Object.entries(event.properties).map(([key, value]) => (
                        <div key={key}>{key}: {String(value)}</div>
                      )).slice(0, 2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{event.ip_address}</div>
                  </TableCell>
                  <TableCell>
                    {new Date(event.created_at).toLocaleString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminAnalyticsEvents;
