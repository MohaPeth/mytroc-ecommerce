
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { BarChart, LineChart, AreaChart, BarChart as BarChartIcon, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface SalesAnalyticsProps {
  period: string;
}

// Données de vente simulées
const generateSalesData = (period: string) => {
  // Ajustement des données en fonction de la période
  let multiplier = 1;
  let dataPoints = 7;
  
  switch(period) {
    case '7days': 
      multiplier = 1;
      dataPoints = 7;
      break;
    case '30days': 
      multiplier = 0.8;
      dataPoints = 10;
      break;
    case '90days': 
      multiplier = 0.6;
      dataPoints = 12;
      break;
    case 'year': 
      multiplier = 0.5;
      dataPoints = 12;
      break;
    default: 
      multiplier = 0.4;
      dataPoints = 12;
  }

  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  const sales = [];
  const now = new Date();
  
  for (let i = 0; i < dataPoints; i++) {
    const sales_value = Math.floor(Math.random() * 7000 * multiplier) + 3000;
    const orders = Math.floor(sales_value / (Math.random() * 70 + 80));
    
    let name;
    if (period === '7days') {
      const dayIndex = (now.getDay() - i - 1 + 7) % 7;
      name = dayNames[dayIndex];
    } else {
      const monthIndex = (now.getMonth() - i + 12) % 12;
      name = monthNames[monthIndex];
    }
    
    sales.push({
      name,
      ventes: sales_value,
      commandes: orders,
      panier_moyen: Math.round(sales_value / orders),
      retours: Math.floor(orders * (Math.random() * 0.1))
    });
  }
  
  return sales.reverse();
};

// Données pour la répartition par catégorie
const CATEGORY_DATA = [
  { name: 'Électronique', value: 35 },
  { name: 'Vêtements', value: 25 },
  { name: 'Maison', value: 20 },
  { name: 'Sports', value: 10 },
  { name: 'Autres', value: 10 },
];

// Couleurs pour le camembert
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({ period }) => {
  const salesData = generateSalesData(period);
  
  // Calcul des métriques clés
  const totalSales = salesData.reduce((sum, data) => sum + data.ventes, 0);
  const totalOrders = salesData.reduce((sum, data) => sum + data.commandes, 0);
  const averageCart = Math.round(totalSales / totalOrders);
  
  // Calcul de la variation (fictive)
  const salesVariation = 7.8;
  const ordersVariation = 5.2;
  const cartVariation = 2.3;
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSales.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
            </div>
            <div className="flex items-center mt-1">
              {salesVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{salesVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {salesVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              {ordersVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{ordersVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {ordersVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageCart.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
            </div>
            <div className="flex items-center mt-1">
              {cartVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{cartVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {cartVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des ventes</CardTitle>
            <CardDescription>
              {period === '7days' ? 'Par jour sur les 7 derniers jours' :
               period === '30days' ? 'Par semaine sur les 30 derniers jours' :
               period === '90days' ? 'Par mois sur les 3 derniers mois' :
               'Par mois sur l\'année en cours'}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={salesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventes" name="Ventes (€)" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Commandes et retours</CardTitle>
            <CardDescription>
              Relation entre les commandes et les retours
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={salesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="commandes" 
                  name="Commandes" 
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="retours" 
                  name="Retours" 
                  stroke="#ff8042" 
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Panier moyen</CardTitle>
            <CardDescription>
              Évolution du panier moyen
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart
                data={salesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="panier_moyen" 
                  name="Panier moyen (€)" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3}
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>
              Distribution des ventes par catégorie de produit
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalytics;
