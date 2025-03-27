
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Truck, Wallet, Users, Package, ArrowUpRight, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  // Données pour les graphiques
  const salesData = [
    { date: 'Jan', revenue: 1200, orders: 13 },
    { date: 'Feb', revenue: 1800, orders: 17 },
    { date: 'Mar', revenue: 1600, orders: 15 },
    { date: 'Apr', revenue: 2200, orders: 22 },
    { date: 'May', revenue: 2800, orders: 25 },
    { date: 'Jun', revenue: 3200, orders: 30 },
    { date: 'Jul', revenue: 3800, orders: 35 },
  ];

  // Données pour les dernières commandes
  const recentOrders = [
    { id: 'ORD-001', customer: 'Jean Dupont', date: '12 juin 2023', status: 'Livré', total: 124.99 },
    { id: 'ORD-002', customer: 'Marie Martin', date: '10 juin 2023', status: 'Expédié', total: 89.50 },
    { id: 'ORD-003', customer: 'Paul Bernard', date: '8 juin 2023', status: 'En cours', total: 245.00 },
    { id: 'ORD-004', customer: 'Sophie Dubois', date: '5 juin 2023', status: 'Livré', total: 67.25 },
  ];

  return (
    <DashboardLayout title="Tableau de bord">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        <StatCard 
          title="Ventes hebdomadaires" 
          value="€1,250" 
          icon={<ShoppingCart className="h-5 w-5" />} 
          trend="up" 
          trendValue="12.5%" 
          description="vs semaine précédente"
          className="animate-delayed-fade-up"
        />
        
        <StatCard 
          title="Commandes en attente" 
          value="8" 
          icon={<Truck className="h-5 w-5" />} 
          description="4 à expédier aujourd'hui"
          className="animate-delayed-fade-up"
        />
        
        <StatCard 
          title="Revenus mensuels" 
          value="€4,625" 
          icon={<Wallet className="h-5 w-5" />} 
          trend="up" 
          trendValue="8.2%" 
          description="vs mois précédent"
          className="animate-delayed-fade-up"
        />
        
        <StatCard 
          title="Nouveaux clients" 
          value="24" 
          icon={<Users className="h-5 w-5" />} 
          trend="down" 
          trendValue="3.1%" 
          description="vs mois précédent"
          className="animate-delayed-fade-up"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SalesChart 
          data={salesData} 
          title="Performance des ventes" 
          description="Revenus et nombre de commandes sur les 7 derniers mois"
        />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-bold">Produits populaires</CardTitle>
              <CardDescription>Les produits les plus vendus ce mois-ci</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-mytroc-primary">
              <Package className="h-4 w-4" />
              <span>Voir tous</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md bg-mytroc-primary/10 flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Mini Frigo" className="h-8 w-8 object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Mini Frigo</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>15 vendus</span>
                        <span className="mx-2 text-green-500">•</span>
                        <span>En stock</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">€300.00</div>
                </div>
                <Progress value={75} className="h-1.5" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md bg-mytroc-primary/10 flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Asus Zenbook" className="h-8 w-8 object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Asus Zenbook</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>12 vendus</span>
                        <span className="mx-2 text-yellow-500">•</span>
                        <span>Stock faible</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">€1,499.00</div>
                </div>
                <Progress value={60} className="h-1.5" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md bg-mytroc-primary/10 flex items-center justify-center">
                      <img src="/placeholder.svg" alt="TV OLED LG C2" className="h-8 w-8 object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">TV OLED LG C2</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>8 vendus</span>
                        <span className="mx-2 text-green-500">•</span>
                        <span>En stock</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">€600.72</div>
                </div>
                <Progress value={40} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-bold">Commandes récentes</CardTitle>
              <CardDescription>Les dernières commandes reçues</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>Voir toutes</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          order.status === 'Livré' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : order.status === 'Expédié' 
                              ? 'bg-purple-500 hover:bg-purple-600' 
                              : 'bg-blue-500 hover:bg-blue-600'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">€{order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">À faire aujourd'hui</CardTitle>
            <CardDescription>Tâches importantes à accomplir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Stock faible</h4>
                  <p className="text-xs text-muted-foreground mt-1">3 produits nécessitent votre attention</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-mytroc-primary">
                    Vérifier maintenant
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Commandes en attente</h4>
                  <p className="text-xs text-muted-foreground mt-1">4 commandes à expédier aujourd'hui</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-mytroc-primary">
                    Voir les commandes
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Paiements reçus</h4>
                  <p className="text-xs text-muted-foreground mt-1">2 nouveaux paiements à valider</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-mytroc-primary">
                    Traiter les paiements
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
