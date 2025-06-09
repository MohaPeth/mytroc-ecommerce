
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Activity, Search, Filter, Calendar, Users, Eye, Trash2, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SuperAdminAnalyticsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  // Mock data
  const events = [
    {
      id: '1',
      user_id: 'user-1',
      user_name: 'Jean Dupont',
      event_type: 'page_view',
      event_data: { page: '/produit/123', product_name: 'iPhone 14 Pro' },
      timestamp: '2024-01-15T10:30:00Z',
      session_id: 'session-abc123'
    },
    {
      id: '2',
      user_id: 'user-2',
      user_name: 'Marie Martin',
      event_type: 'purchase',
      event_data: { order_id: 'ORD-456', amount: 899.99 },
      timestamp: '2024-01-15T09:45:00Z',
      session_id: 'session-def456'
    },
    {
      id: '3',
      user_id: 'user-3',
      user_name: 'Pierre Bernard',
      event_type: 'add_to_cart',
      event_data: { product_id: 'prod-789', quantity: 2 },
      timestamp: '2024-01-15T09:20:00Z',
      session_id: 'session-ghi789'
    },
    {
      id: '4',
      user_id: 'anonymous',
      user_name: 'Utilisateur anonyme',
      event_type: 'search',
      event_data: { query: 'macbook pro', results_count: 24 },
      timestamp: '2024-01-15T08:55:00Z',
      session_id: 'session-jkl012'
    }
  ];

  const filteredEvents = events.filter(event => 
    (event.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     JSON.stringify(event.event_data).toLowerCase().includes(searchTerm.toLowerCase())) &&
    (eventFilter === 'all' || event.event_type === eventFilter)
  );

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'page_view': return 'bg-blue-100 text-blue-800';
      case 'purchase': return 'bg-green-100 text-green-800';
      case 'add_to_cart': return 'bg-orange-100 text-orange-800';
      case 'search': return 'bg-purple-100 text-purple-800';
      case 'click': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'page_view': return 'Vue de page';
      case 'purchase': return 'Achat';
      case 'add_to_cart': return 'Ajout panier';
      case 'search': return 'Recherche';
      case 'click': return 'Clic';
      default: return type;
    }
  };

  const formatEventData = (data: any) => {
    if (data.page) return `Page: ${data.page}`;
    if (data.order_id) return `Commande: ${data.order_id} (${data.amount}€)`;
    if (data.product_id) return `Produit: ${data.product_id} (x${data.quantity})`;
    if (data.query) return `"${data.query}" (${data.results_count} résultats)`;
    return JSON.stringify(data).substring(0, 50) + '...';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6 text-purple-500" />
            Événements Analytics
          </h2>
          <p className="text-muted-foreground">
            Analysez les événements et comportements des utilisateurs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Événements Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% vs hier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vues de Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432</div>
            <p className="text-xs text-muted-foreground">65% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-green-600">Taux: 1.8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sessions Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,156</div>
            <p className="text-xs text-blue-600">En temps réel</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flux d'Événements en Temps Réel</CardTitle>
          <CardDescription>
            Surveillez les événements des utilisateurs en direct
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par utilisateur, type d'événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type d'événement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les événements</SelectItem>
                <SelectItem value="page_view">Vues de pages</SelectItem>
                <SelectItem value="purchase">Achats</SelectItem>
                <SelectItem value="add_to_cart">Ajouts panier</SelectItem>
                <SelectItem value="search">Recherches</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="yesterday">Hier</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Type d'Événement</TableHead>
                <TableHead>Données</TableHead>
                <TableHead>Heure</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {event.user_id !== 'anonymous' && <Users className="h-4 w-4" />}
                      <div className="font-medium">{event.user_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getEventTypeColor(event.event_type)}>
                      {getEventTypeLabel(event.event_type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-sm">
                      {formatEventData(event.event_data)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(event.timestamp).toLocaleTimeString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground font-mono">
                      {event.session_id.substring(0, 10)}...
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
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
