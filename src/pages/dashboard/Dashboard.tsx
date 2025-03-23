
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Truck, Wallet, Users, Package, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Ventes hebdomadaires" 
          value="€1,250" 
          icon={<ShoppingCart className="h-5 w-5" />} 
          trend="up" 
          trendValue="12.5%" 
          description="vs semaine précédente"
        />
        
        <StatCard 
          title="Commandes en attente" 
          value="8" 
          icon={<Truck className="h-5 w-5" />} 
          description="4 à expédier aujourd'hui"
        />
        
        <StatCard 
          title="Revenus mensuels" 
          value="€4,625" 
          icon={<Wallet className="h-5 w-5" />} 
          trend="up" 
          trendValue="8.2%" 
          description="vs mois précédent"
        />
        
        <StatCard 
          title="Nouveaux clients" 
          value="24" 
          icon={<Users className="h-5 w-5" />} 
          trend="down" 
          trendValue="3.1%" 
          description="vs mois précédent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SalesChart 
          data={salesData} 
          title="Performance des ventes" 
          description="Revenus et nombre de commandes sur les 7 derniers mois"
        />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Produits populaires</CardTitle>
              <CardDescription>Les produits les plus vendus ce mois-ci</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              <Package className="h-4 w-4" />
              <span>Voir tous</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <img src="/placeholder.svg" alt="Product" className="h-10 w-10 object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Mini Frigo</p>
                    <p className="text-sm text-muted-foreground">15 vendus</p>
                  </div>
                </div>
                <div className="font-medium">€300.00</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <img src="/placeholder.svg" alt="Product" className="h-10 w-10 object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Asus Zenbook</p>
                    <p className="text-sm text-muted-foreground">12 vendus</p>
                  </div>
                </div>
                <div className="font-medium">€1,499.00</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <img src="/placeholder.svg" alt="Product" className="h-10 w-10 object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">TV OLED LG C2</p>
                    <p className="text-sm text-muted-foreground">8 vendus</p>
                  </div>
                </div>
                <div className="font-medium">€600.72</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Commandes récentes</CardTitle>
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
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          order.status === 'Livré' 
                            ? 'bg-green-500' 
                            : order.status === 'Expédié' 
                              ? 'bg-purple-500' 
                              : 'bg-blue-500'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">€{order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
