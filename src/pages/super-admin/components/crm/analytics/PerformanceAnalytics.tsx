
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, MousePointerClick, Clock, Star } from 'lucide-react';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface PerformanceAnalyticsProps {
  period: string;
}

// Données de performance simulées
const generatePerformanceData = (period: string) => {
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
  
  const performanceData = [];
  const now = new Date();
  
  for (let i = 0; i < dataPoints; i++) {
    const taux_clics = (Math.random() * 5 + 2).toFixed(1);
    const temps_site = Math.floor(Math.random() * 300) + 120;
    const satisfaction = (Math.random() * 1 + 4).toFixed(1);
    
    let name;
    if (period === '7days') {
      const dayIndex = (now.getDay() - i - 1 + 7) % 7;
      name = dayNames[dayIndex];
    } else {
      const monthIndex = (now.getMonth() - i + 12) % 12;
      name = monthNames[monthIndex];
    }
    
    performanceData.push({
      name,
      taux_clics: parseFloat(taux_clics),
      temps_site,
      satisfaction: parseFloat(satisfaction),
      conversion: Math.random() * 3 + 2
    });
  }
  
  return performanceData.reverse();
};

// Données pour le radar chart
const radarData = [
  { subject: 'Facilité d\'utilisation', A: 120, B: 110, fullMark: 150 },
  { subject: 'Navigation', A: 98, B: 130, fullMark: 150 },
  { subject: 'Design', A: 86, B: 130, fullMark: 150 },
  { subject: 'Vitesse', A: 99, B: 100, fullMark: 150 },
  { subject: 'Fonctionnalités', A: 85, B: 90, fullMark: 150 },
  { subject: 'Service client', A: 65, B: 85, fullMark: 150 },
];

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ period }) => {
  const performanceData = generatePerformanceData(period);
  
  // Calcul des métriques clés
  const clickRate = parseFloat((performanceData.reduce((sum, data) => sum + data.taux_clics, 0) / performanceData.length).toFixed(1));
  const avgTimeOnSite = Math.round(performanceData.reduce((sum, data) => sum + data.temps_site, 0) / performanceData.length);
  const satisfactionRate = parseFloat((performanceData.reduce((sum, data) => sum + data.satisfaction, 0) / performanceData.length).toFixed(1));
  
  // Calcul de la variation (fictive)
  const clickRateVariation = 3.2;
  const timeOnSiteVariation = 8.5;
  const satisfactionVariation = -0.3;
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de clics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clickRate}%
            </div>
            <div className="flex items-center mt-1">
              {clickRateVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{clickRateVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {clickRateVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Temps moyen sur le site</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(avgTimeOnSite / 60)}m {avgTimeOnSite % 60}s</div>
            <div className="flex items-center mt-1">
              {timeOnSiteVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{timeOnSiteVariation}%
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {timeOnSiteVariation}%
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {satisfactionRate}/5
            </div>
            <div className="flex items-center mt-1">
              {satisfactionVariation > 0 ? (
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{satisfactionVariation}
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  {satisfactionVariation}
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
            <CardTitle>Taux de clics</CardTitle>
            <CardDescription>
              Pourcentage de clics sur les éléments interactifs
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
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
                <Bar dataKey="taux_clics" name="Taux de clics (%)" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Temps sur le site</CardTitle>
            <CardDescription>
              Durée moyenne passée sur la plateforme en secondes
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
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
                  dataKey="temps_site" 
                  name="Temps sur le site (secondes)" 
                  stroke="#4ade80" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction client</CardTitle>
            <CardDescription>
              Note moyenne des évaluations clients (sur 5)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="satisfaction" 
                  name="Satisfaction (sur 5)" 
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analyse comparative</CardTitle>
            <CardDescription>
              Comparaison avec l'année précédente
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="2025" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="2024" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
