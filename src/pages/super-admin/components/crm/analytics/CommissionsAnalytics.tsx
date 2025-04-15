
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, TrendingUp, PackageOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  Scatter
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CommissionsAnalyticsProps {
  period: string;
}

// Données de commissions simulées
const generateCommissionsData = (period: string) => {
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
  
  const commissionsData = [];
  const now = new Date();
  
  for (let i = 0; i < dataPoints; i++) {
    const ventes = Math.floor(Math.random() * 7000 * multiplier) + 3000;
    const commissions = Math.floor(ventes * (Math.random() * 0.03 + 0.08));
    const transactions = Math.floor(ventes / (Math.random() * 70 + 80));
    
    let name;
    if (period === '7days') {
      const dayIndex = (now.getDay() - i - 1 + 7) % 7;
      name = dayNames[dayIndex];
    } else {
      const monthIndex = (now.getMonth() - i + 12) % 12;
      name = monthNames[monthIndex];
    }
    
    commissionsData.push({
      name,
      ventes,
      commissions,
      transactions,
      taux_commission: parseFloat((commissions / ventes * 100).toFixed(1))
    });
  }
  
  return commissionsData.reverse();
};

// Top vendeurs avec commissions
const TOP_SELLERS = [
  { id: 1, name: "ElectroPlus", commissions: 2347.89, sales: 19582.50, rate: 12 },
  { id: 2, name: "Meuble Design", commissions: 1865.42, sales: 15545.20, rate: 12 },
  { id: 3, name: "SportExpress", commissions: 1543.78, sales: 12864.80, rate: 12 },
  { id: 4, name: "ModeChic", commissions: 1287.55, sales: 12875.50, rate: 10 },
  { id: 5, name: "GadgetTech", commissions: 982.67, sales: 8933.36, rate: 11 },
];

const CommissionsAnalytics: React.FC<CommissionsAnalyticsProps> = ({ period }) => {
  const commissionsData = generateCommissionsData(period);
  
  // Calcul des métriques clés
  const totalCommissions = commissionsData.reduce((sum, data) => sum + data.commissions, 0);
  const totalSales = commissionsData.reduce((sum, data) => sum + data.ventes, 0);
  const averageCommissionRate = parseFloat((totalCommissions / totalSales * 100).toFixed(1));
  
  // Calcul de la variation (fictive)
  const commissionsVariation = 15.8;
  const salesVariation = 7.2;
  const rateVariation = 1.1;
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commissions totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCommissions.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
            </div>
            <div className="flex items-center mt-1">
              {commissionsVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{commissionsVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {commissionsVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventes avec commission</CardTitle>
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
            <CardTitle className="text-sm font-medium">Taux de commission moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageCommissionRate}%
            </div>
            <div className="flex items-center mt-1">
              {rateVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{rateVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {rateVariation}%
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
            <CardTitle>Évolution des commissions</CardTitle>
            <CardDescription>
              {period === '7days' ? 'Par jour sur les 7 derniers jours' :
               period === '30days' ? 'Par semaine sur les 30 derniers jours' :
               period === '90days' ? 'Par mois sur les 3 derniers mois' :
               'Par mois sur l\'année en cours'}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={commissionsData}
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
                <Tooltip formatter={(value) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} />
                <Legend />
                <Bar dataKey="commissions" name="Commissions (€)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taux de commission</CardTitle>
            <CardDescription>
              Évolution du taux moyen de commission
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={commissionsData}
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
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="taux_commission" 
                  name="Taux de commission (%)" 
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Relation ventes et commissions</CardTitle>
            <CardDescription>
              Corrélation entre les ventes et les commissions générées
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={commissionsData}
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
                <Tooltip formatter={(value, name) => {
                  if (name === "Ventes (€)" || name === "Commissions (€)") {
                    return value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
                  }
                  return value;
                }} />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="ventes" 
                  name="Ventes (€)" 
                  fill="#82ca9d" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="commissions" 
                  name="Commissions (€)" 
                  stroke="#8884d8" 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top 5 des vendeurs par commission</CardTitle>
          <CardDescription>
            Les vendeurs ayant généré le plus de commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendeur</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>Commissions</TableHead>
                <TableHead>Taux</TableHead>
                <TableHead className="text-right">% du total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TOP_SELLERS.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell>
                    {seller.sales.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell>
                    {seller.commissions.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell>{seller.rate}%</TableCell>
                  <TableCell className="text-right">
                    {((seller.commissions / TOP_SELLERS.reduce((sum, s) => sum + s.commissions, 0)) * 100).toFixed(1)}%
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

export default CommissionsAnalytics;
