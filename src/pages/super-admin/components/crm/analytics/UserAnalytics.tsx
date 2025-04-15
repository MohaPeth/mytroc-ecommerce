
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, UserPlus, Users, UserMinus, UserCheck } from 'lucide-react';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface UserAnalyticsProps {
  period: string;
}

// Données d'utilisateurs simulées
const generateUserData = (period: string) => {
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
  
  const userData = [];
  const now = new Date();
  
  for (let i = 0; i < dataPoints; i++) {
    const nouveaux = Math.floor(Math.random() * 50 * multiplier) + 10;
    const actifs = Math.floor(Math.random() * 500 * multiplier) + 100;
    const inactifs = Math.floor(Math.random() * 100 * multiplier) + 20;
    
    let name;
    if (period === '7days') {
      const dayIndex = (now.getDay() - i - 1 + 7) % 7;
      name = dayNames[dayIndex];
    } else {
      const monthIndex = (now.getMonth() - i + 12) % 12;
      name = monthNames[monthIndex];
    }
    
    userData.push({
      name,
      nouveaux,
      actifs,
      inactifs,
      taux_conversion: Math.random() * 5 + 2
    });
  }
  
  return userData.reverse();
};

// Données pour la répartition par statut
const USER_STATUS_DATA = [
  { name: 'Actifs', value: 65 },
  { name: 'Inactifs', value: 20 },
  { name: 'Nouveaux', value: 15 }
];

// Couleurs pour le camembert
const COLORS = ['#4ade80', '#f87171', '#60a5fa'];

const UserAnalytics: React.FC<UserAnalyticsProps> = ({ period }) => {
  const userData = generateUserData(period);
  
  // Calcul des métriques clés
  const totalNewUsers = userData.reduce((sum, data) => sum + data.nouveaux, 0);
  const totalActiveUsers = userData[userData.length - 1].actifs;
  const conversionRate = parseFloat((userData.reduce((sum, data) => sum + data.taux_conversion, 0) / userData.length).toFixed(1));
  
  // Calcul de la variation (fictive)
  const newUsersVariation = 12.3;
  const activeUsersVariation = 5.7;
  const conversionVariation = -1.2;
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalNewUsers.toLocaleString()}
            </div>
            <div className="flex items-center mt-1">
              {newUsersVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{newUsersVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {newUsersVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveUsers.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              {activeUsersVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{activeUsersVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {activeUsersVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversionRate}%
            </div>
            <div className="flex items-center mt-1">
              {conversionVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{conversionVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {conversionVariation}%
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
            <CardTitle>Nouveaux utilisateurs</CardTitle>
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
                data={userData}
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
                <Bar dataKey="nouveaux" name="Nouveaux utilisateurs" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs actifs vs inactifs</CardTitle>
            <CardDescription>
              Tendance de l'activité des utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userData}
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
                <Line 
                  type="monotone" 
                  dataKey="actifs" 
                  name="Utilisateurs actifs" 
                  stroke="#4ade80" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="inactifs" 
                  name="Utilisateurs inactifs" 
                  stroke="#f87171" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Taux de conversion</CardTitle>
            <CardDescription>
              Pourcentage des utilisateurs qui réalisent un achat
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userData}
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
                  dataKey="taux_conversion" 
                  name="Taux de conversion (%)" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par statut</CardTitle>
            <CardDescription>
              Distribution des utilisateurs par statut d'activité
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={USER_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {USER_STATUS_DATA.map((entry, index) => (
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

export default UserAnalytics;
