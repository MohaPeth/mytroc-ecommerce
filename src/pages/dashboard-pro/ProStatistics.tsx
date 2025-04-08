
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ProStatistics = () => {
  // Exemple de données pour les ventes mensuelles
  const salesData = [
    { month: 'Jan', revenue: 3200, orders: 45 },
    { month: 'Fév', revenue: 4500, orders: 68 },
    { month: 'Mar', revenue: 3800, orders: 52 },
    { month: 'Avr', revenue: 5100, orders: 74 },
    { month: 'Mai', revenue: 4200, orders: 63 },
    { month: 'Juin', revenue: 6100, orders: 82 },
    { month: 'Juil', revenue: 5300, orders: 74 },
    { month: 'Août', revenue: 4800, orders: 67 },
    { month: 'Sept', revenue: 5700, orders: 78 },
    { month: 'Oct', revenue: 7200, orders: 96 },
    { month: 'Nov', revenue: 6300, orders: 85 },
    { month: 'Déc', revenue: 8500, orders: 115 },
  ];

  // Données pour la répartition des produits vendus par catégorie
  const categoryData = [
    { name: 'Électronique', value: 42 },
    { name: 'Maison', value: 28 },
    { name: 'Vêtements', value: 15 },
    { name: 'Sports', value: 8 },
    { name: 'Autres', value: 7 },
  ];

  // Données pour les origines des clients
  const customerSourceData = [
    { name: 'Recherche Directe', value: 35 },
    { name: 'Réseaux Sociaux', value: 25 },
    { name: 'Références', value: 20 },
    { name: 'Email Marketing', value: 12 },
    { name: 'Autres', value: 8 },
  ];

  // Couleurs pour les graphiques en camembert
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <ProDashboardLayout title="Statistiques">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analyses avancées</h1>
          <p className="text-muted-foreground">
            Consultez les statistiques détaillées de votre activité
          </p>
        </div>
      </div>

      <Tabs defaultValue="sales" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
        </TabsList>

        {/* Onglet Ventes */}
        <TabsContent value="sales">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenus mensuels</CardTitle>
                <CardDescription>
                  Évolution de vos revenus sur les 12 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `€${value}`} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nombre de commandes</CardTitle>
                <CardDescription>
                  Évolution du nombre de commandes sur les 12 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Produits */}
        <TabsContent value="products">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des ventes par catégorie</CardTitle>
                <CardDescription>
                  Pourcentage des ventes par catégorie de produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} produits`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 des produits les plus vendus</CardTitle>
                <CardDescription>
                  Classement de vos produits les plus populaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Mini Frigo', sales: 42, percentage: 85 },
                    { name: 'Asus Zenbook', sales: 38, percentage: 76 },
                    { name: 'Écouteurs sans fil', sales: 31, percentage: 62 },
                    { name: 'TV OLED', sales: 27, percentage: 54 },
                    { name: 'Cafetière', sales: 23, percentage: 46 },
                  ].map((product, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{product.name}</span>
                        <span className="text-sm text-muted-foreground">{product.sales} ventes</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${product.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Clients */}
        <TabsContent value="customers">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Origine des clients</CardTitle>
                <CardDescription>
                  D'où viennent vos clients ?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction client</CardTitle>
                <CardDescription>
                  Évaluation de la satisfaction de vos clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold mb-2">4.8/5</div>
                  <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-200'} fill-current`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { rating: 5, percentage: 85, count: 85 },
                    { rating: 4, percentage: 10, count: 10 },
                    { rating: 3, percentage: 3, count: 3 },
                    { rating: 2, percentage: 1, count: 1 },
                    { rating: 1, percentage: 1, count: 1 },
                  ].map((rating) => (
                    <div key={rating.rating} className="flex items-center">
                      <span className="text-sm w-8">{rating.rating}★</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                        <div 
                          className={`h-2.5 rounded-full ${rating.rating >= 4 ? 'bg-green-500' : rating.rating >= 3 ? 'bg-yellow-400' : 'bg-red-500'}`}
                          style={{ width: `${rating.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm w-8">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Analyses avancées</CardTitle>
          <CardDescription>
            Fonctionnalités analytiques accessibles aux vendeurs premium
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            En tant que vendeur premium, vous avez accès à des outils d'analyse avancés pour comprendre votre activité et optimiser vos ventes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Prévisions de ventes",
                description: "Estimations basées sur vos performances passées et les tendances du marché."
              },
              {
                title: "Segmentation client",
                description: "Analyse détaillée de votre clientèle pour cibler vos communications."
              },
              {
                title: "Rapports personnalisés",
                description: "Créez et exportez des rapports adaptés à vos besoins spécifiques."
              }
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader className="py-4">
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </ProDashboardLayout>
  );
};

export default ProStatistics;
