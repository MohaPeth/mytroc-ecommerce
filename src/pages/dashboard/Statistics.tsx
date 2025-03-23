
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SalesChart from '@/components/dashboard/SalesChart';
import StatCard from '@/components/dashboard/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ShoppingCart, TrendingUp, Users, MousePointerClick, ArrowUpRight, Download, BarChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Statistics = () => {
  const [timePeriod, setTimePeriod] = useState('30');

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

  // Données pour le graphique circulaire
  const categoryData = [
    { name: 'Électronique', value: 35 },
    { name: 'Électroménager', value: 25 },
    { name: 'Informatique', value: 20 },
    { name: 'Audio', value: 15 },
    { name: 'Santé', value: 5 },
  ];
  
  const COLORS = ['#16a34a', '#3b82f6', '#a855f7', '#f97316', '#ef4444'];

  // Données pour les produits les plus vendus
  const topProducts = [
    { name: 'Mini Frigo', category: 'Électroménager', sales: 15, revenue: 4500 },
    { name: 'Asus Zenbook', category: 'Informatique', sales: 12, revenue: 17988 },
    { name: 'TV OLED LG C2', category: 'Électronique', sales: 8, revenue: 4806 },
    { name: 'Écouteurs sans fil', category: 'Audio', sales: 21, revenue: 3129 },
    { name: 'Ordinateur Portable', category: 'Informatique', sales: 15, revenue: 19485 },
  ];

  return (
    <DashboardLayout title="Statistiques">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analyse des performances</h1>
          <p className="text-muted-foreground">Statistiques et indicateurs de performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 derniers jours</SelectItem>
              <SelectItem value="30">30 derniers jours</SelectItem>
              <SelectItem value="90">90 derniers jours</SelectItem>
              <SelectItem value="365">12 derniers mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Chiffre d'affaires" 
          value="€14,589" 
          icon={<TrendingUp className="h-5 w-5" />} 
          trend="up" 
          trendValue="18.2%" 
          description="vs période précédente"
        />
        
        <StatCard 
          title="Nombre de commandes" 
          value="124" 
          icon={<ShoppingCart className="h-5 w-5" />} 
          trend="up" 
          trendValue="12.3%" 
          description="vs période précédente"
        />
        
        <StatCard 
          title="Nouveaux clients" 
          value="48" 
          icon={<Users className="h-5 w-5" />} 
          trend="down" 
          trendValue="3.1%" 
          description="vs période précédente"
        />
        
        <StatCard 
          title="Taux de conversion" 
          value="3.2%" 
          icon={<MousePointerClick className="h-5 w-5" />} 
          trend="up" 
          trendValue="0.8%" 
          description="vs période précédente"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <SalesChart 
            data={salesData} 
            title="Performances des ventes" 
            description={`Revenus et nombre de commandes sur les ${timePeriod} derniers jours`}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>Pourcentage des ventes par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Produits les plus vendus</CardTitle>
            <CardDescription>Les produits les plus performants pour cette période</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            <BarChart className="h-4 w-4" />
            <span>Rapport détaillé</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Unités vendues</TableHead>
                <TableHead className="text-right">Revenu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell className="text-right">€{product.revenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>Voir tous les produits</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Statistics;
