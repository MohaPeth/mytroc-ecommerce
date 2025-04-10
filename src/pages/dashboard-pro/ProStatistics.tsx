
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Download, Filter, Search } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';

const ProStatistics = () => {
  // États pour les filtres
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('');

  // Exemple de données pour les vues et conversions (données quotidiennes sur un mois)
  const viewsAndConversionsData = [
    { date: '01/04', views: 120, clicks: 45, conversions: 8, revenue: 1200 },
    { date: '02/04', views: 140, clicks: 52, conversions: 12, revenue: 1800 },
    { date: '03/04', views: 110, clicks: 40, conversions: 10, revenue: 1400 },
    { date: '04/04', views: 160, clicks: 65, conversions: 16, revenue: 2200 },
    { date: '05/04', views: 190, clicks: 72, conversions: 18, revenue: 2600 },
    { date: '06/04', views: 150, clicks: 60, conversions: 13, revenue: 1900 },
    { date: '07/04', views: 210, clicks: 85, conversions: 20, revenue: 2900 },
    { date: '08/04', views: 170, clicks: 68, conversions: 15, revenue: 2250 },
    { date: '09/04', views: 185, clicks: 73, conversions: 17, revenue: 2550 },
    { date: '10/04', views: 150, clicks: 58, conversions: 14, revenue: 2000 },
    { date: '11/04', views: 195, clicks: 78, conversions: 19, revenue: 2800 },
    { date: '12/04', views: 165, clicks: 66, conversions: 16, revenue: 2300 },
    { date: '13/04', views: 155, clicks: 62, conversions: 14, revenue: 2100 },
    { date: '14/04', views: 180, clicks: 72, conversions: 17, revenue: 2500 },
    { date: '15/04', views: 200, clicks: 80, conversions: 21, revenue: 3000 },
    { date: '16/04', views: 170, clicks: 68, conversions: 16, revenue: 2400 },
    { date: '17/04', views: 160, clicks: 63, conversions: 15, revenue: 2200 },
    { date: '18/04', views: 190, clicks: 76, conversions: 18, revenue: 2700 },
    { date: '19/04', views: 210, clicks: 84, conversions: 22, revenue: 3100 },
    { date: '20/04', views: 180, clicks: 72, conversions: 17, revenue: 2500 },
    { date: '21/04', views: 170, clicks: 68, conversions: 16, revenue: 2300 },
    { date: '22/04', views: 160, clicks: 64, conversions: 14, revenue: 2100 },
    { date: '23/04', views: 150, clicks: 60, conversions: 13, revenue: 1900 },
    { date: '24/04', views: 175, clicks: 70, conversions: 16, revenue: 2400 },
    { date: '25/04', views: 190, clicks: 76, conversions: 18, revenue: 2600 },
    { date: '26/04', views: 200, clicks: 80, conversions: 19, revenue: 2800 },
    { date: '27/04', views: 185, clicks: 74, conversions: 17, revenue: 2500 },
    { date: '28/04', views: 170, clicks: 68, conversions: 15, revenue: 2200 },
    { date: '29/04', views: 195, clicks: 78, conversions: 18, revenue: 2700 },
    { date: '30/04', views: 220, clicks: 88, conversions: 23, revenue: 3300 },
  ];

  // Répartition des ventes par catégorie
  const categorySalesData = [
    { name: 'Électronique', value: 42, revenue: 15400 },
    { name: 'Maison', value: 28, revenue: 9800 },
    { name: 'Vêtements', value: 15, revenue: 5200 },
    { name: 'Sports', value: 8, revenue: 2800 },
    { name: 'Autres', value: 7, revenue: 2300 },
  ];

  // Données pour le taux de conversion par produit
  const conversionRateData = [
    { name: 'Mini Frigo', conversionRate: 8.5, views: 425, conversions: 36 },
    { name: 'TV OLED', conversionRate: 7.2, views: 320, conversions: 23 },
    { name: 'Asus Zenbook', conversionRate: 6.9, views: 290, conversions: 20 },
    { name: 'Écouteurs sans fil', conversionRate: 5.4, views: 260, conversions: 14 },
    { name: 'Cafetière', conversionRate: 4.8, views: 210, conversions: 10 },
  ];

  // Top produits performants
  const topProductsData = [
    { id: 1, name: 'Mini Frigo', views: 425, clicks: 120, conversions: 36, revenue: 10800, conversionRate: 8.5 },
    { id: 2, name: 'TV OLED', views: 320, clicks: 85, conversions: 23, revenue: 27600, conversionRate: 7.2 },
    { id: 3, name: 'Asus Zenbook', views: 290, clicks: 75, conversions: 20, revenue: 30000, conversionRate: 6.9 },
    { id: 4, name: 'Écouteurs sans fil', views: 260, clicks: 60, conversions: 14, revenue: 2030, conversionRate: 5.4 },
    { id: 5, name: 'Cafetière', views: 210, clicks: 50, conversions: 10, revenue: 1200, conversionRate: 4.8 },
  ];

  // Calcul des indicateurs globaux
  const totalViews = viewsAndConversionsData.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = viewsAndConversionsData.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = viewsAndConversionsData.reduce((sum, item) => sum + item.conversions, 0);
  const totalRevenue = viewsAndConversionsData.reduce((sum, item) => sum + item.revenue, 0);
  const avgConversionRate = (totalConversions / totalClicks * 100).toFixed(2);

  // Couleurs pour les graphiques
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Fonction pour exporter les données
  const handleExportData = (format) => {
    // Logique d'exportation (à implémenter avec une lib comme jspdf ou file-saver)
    console.log(`Exporting data as ${format}`);
  };

  // Configurations pour les charts
  const performanceChartConfig = {
    views: {
      label: "Vues",
      color: "#8884d8"
    },
    clicks: {
      label: "Clics",
      color: "#82ca9d"
    },
    conversions: {
      label: "Conversions",
      color: "#ffc658"
    }
  };

  const revenueChartConfig = {
    revenue: {
      label: "Revenus",
      color: "#0088FE"
    }
  };

  const categorySalesConfig = {
    value: {
      label: "Pourcentage",
      color: "#0088FE"
    }
  };

  const conversionRateConfig = {
    conversionRate: {
      label: "Taux de conversion",
      color: "#82ca9d"
    }
  };

  return (
    <ProDashboardLayout title="Statistiques">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Performances des annonces</h1>
          <p className="text-muted-foreground">
            Consultez et analysez les performances de vos produits
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExportData('csv')}>
            <Download className="h-4 w-4 mr-1" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExportData('pdf')}>
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="electronics">Électronique</SelectItem>
                  <SelectItem value="home">Maison</SelectItem>
                  <SelectItem value="clothing">Vêtements</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="other">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Rechercher un produit..." 
                  className="pl-9" 
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vue d'ensemble - KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Vues totales', value: totalViews, change: '+12%', type: 'views' },
          { label: 'Clics', value: totalClicks, change: '+8%', type: 'clicks' },
          { label: 'Conversions', value: totalConversions, change: '+15%', type: 'conversions' },
          { label: 'Revenus', value: `${(totalRevenue).toLocaleString()} €`, change: '+10%', type: 'revenue' },
          { label: 'Taux de conversion', value: `${avgConversionRate}%`, change: '+2%', type: 'rate' }
        ].map((kpi, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-muted-foreground mb-1 text-xs uppercase">{kpi.label}</div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className={`text-xs mt-1 flex items-center ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change}
                <span className="text-muted-foreground ml-1">vs période précédente</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="products">Par produit</TabsTrigger>
          <TabsTrigger value="detailed">Données détaillées</TabsTrigger>
        </TabsList>

        {/* Onglet Vue d'ensemble */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Graphique d'évolution des vues et conversions */}
            <Card>
              <CardHeader>
                <CardTitle>Évolution des performances</CardTitle>
                <CardDescription>
                  Suivi des vues, clics et conversions au fil du temps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={performanceChartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={viewsAndConversionsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="clicks" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="conversions" stackId="3" stroke="#ffc658" fill="#ffc658" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graphique d'évolution des revenus */}
            <Card>
              <CardHeader>
                <CardTitle>Revenus générés</CardTitle>
                <CardDescription>
                  Évolution des revenus (en €) au cours de la période
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={revenueChartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={viewsAndConversionsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => `€${value}`} />
                        <Bar dataKey="revenue" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Répartition des ventes par catégorie */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des ventes par catégorie</CardTitle>
                <CardDescription>
                  Distribution des ventes entre vos différentes catégories de produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={categorySalesConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categorySalesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categorySalesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [`${value}% (${props.payload.revenue} €)`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Taux de conversion par produit */}
            <Card>
              <CardHeader>
                <CardTitle>Taux de conversion par produit</CardTitle>
                <CardDescription>
                  Pourcentage de conversions pour vos produits les plus performants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={conversionRateConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={conversionRateData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 10]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip 
                          formatter={(value, name) => {
                            return [`${value}%`, 'Taux de conversion'];
                          }}
                          labelFormatter={(value) => `Produit: ${value}`}
                        />
                        <Bar dataKey="conversionRate" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Par produit */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 des produits les plus performants</CardTitle>
              <CardDescription>
                Classement des annonces par nombre de vues, clics et conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead className="text-right">Vues</TableHead>
                    <TableHead className="text-right">Clics</TableHead>
                    <TableHead className="text-right">Conversions</TableHead>
                    <TableHead className="text-right">Taux</TableHead>
                    <TableHead className="text-right">Revenus (€)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProductsData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{product.views}</TableCell>
                      <TableCell className="text-right">{product.clicks}</TableCell>
                      <TableCell className="text-right">{product.conversions}</TableCell>
                      <TableCell className="text-right">{product.conversionRate}%</TableCell>
                      <TableCell className="text-right">{product.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Cards produits individuels */}
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {topProductsData.slice(0, 4).map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    Performance détaillée du produit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Vues</div>
                      <div className="text-xl font-bold">{product.views}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Conversions</div>
                      <div className="text-xl font-bold">{product.conversions}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Taux</div>
                      <div className="text-xl font-bold">{product.conversionRate}%</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-1">Performance relative</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${Math.min(product.conversionRate * 10, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0%</span>
                      <span>Performance moyenne: 6.5%</span>
                      <span>10%+</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium">Revenus générés</div>
                    <div className="text-2xl font-bold">{product.revenue.toLocaleString()} €</div>
                    <div className="text-xs text-green-500">
                      +{Math.floor(Math.random() * 20 + 5)}% vs période précédente
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Onglet Données détaillées */}
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Données détaillées par jour</CardTitle>
              <CardDescription>
                Historique complet des performances pendant la période sélectionnée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Vues</TableHead>
                    <TableHead className="text-right">Clics</TableHead>
                    <TableHead className="text-right">Conversions</TableHead>
                    <TableHead className="text-right">Taux de conversion</TableHead>
                    <TableHead className="text-right">Revenus (€)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viewsAndConversionsData.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell className="text-right">{day.views}</TableCell>
                      <TableCell className="text-right">{day.clicks}</TableCell>
                      <TableCell className="text-right">{day.conversions}</TableCell>
                      <TableCell className="text-right">
                        {((day.conversions / day.clicks) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">{day.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Suggestions et alertes */}
      <Card>
        <CardHeader>
          <CardTitle>Alertes et suggestions</CardTitle>
          <CardDescription>
            Des recommandations personnalisées basées sur vos données
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="font-medium text-amber-800 mb-1">Opportunité détectée</div>
              <p className="text-sm text-amber-700">
                Votre produit "Mini Frigo" a reçu 50% de vues supplémentaires cette semaine. 
                Envisagez d'augmenter votre stock pour répondre à la demande potentielle.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium text-blue-800 mb-1">Suggestion d'optimisation</div>
              <p className="text-sm text-blue-700">
                Le taux de conversion de "Écouteurs sans fil" est inférieur à la moyenne.
                Essayez d'améliorer les photos du produit ou d'ajouter plus de détails dans la description.
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-green-800 mb-1">Performance exceptionnelle</div>
              <p className="text-sm text-green-700">
                Félicitations ! Votre produit "TV OLED" figure dans le top 10 des produits les plus vendus de sa catégorie ce mois-ci.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ProDashboardLayout>
  );
};

export default ProStatistics;
