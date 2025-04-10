
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ShoppingBag, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SalesChart from '@/components/dashboard/SalesChart';

const StatCard = ({ title, value, icon: Icon, trend, description, linkTo }: { 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  trend?: number; 
  description?: string; 
  linkTo?: string 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
            <span className="ml-1">depuis le mois dernier</span>
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {linkTo && (
          <Button variant="link" className="p-0 h-auto mt-2 text-sm" asChild>
            <Link to={linkTo}>En savoir plus</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const ProDashboard = () => {
  // Sample data for the SalesChart
  const salesData = [
    { date: "01/04", revenue: 1200, orders: 8 },
    { date: "02/04", revenue: 1800, orders: 12 },
    { date: "03/04", revenue: 1400, orders: 10 },
    { date: "04/04", revenue: 2200, orders: 16 },
    { date: "05/04", revenue: 2600, orders: 18 },
    { date: "06/04", revenue: 1900, orders: 13 },
    { date: "07/04", revenue: 2900, orders: 20 },
  ];

  return (
    <ProDashboardLayout title="Tableau de bord Pro">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Revenus du mois" 
          value="24,532 €" 
          icon={DollarSign}
          trend={12.5}
          linkTo="/dashboard-pro/statistiques"
        />
        <StatCard 
          title="Commandes" 
          value="43" 
          icon={ShoppingBag}
          trend={8.2}
          linkTo="/dashboard-pro/commandes"
        />
        <StatCard 
          title="Nouveaux clients" 
          value="18" 
          icon={Users}
          trend={-2.3}
          linkTo="/dashboard-pro/statistiques"
        />
        <StatCard 
          title="Note moyenne" 
          value="4.8/5" 
          icon={Star}
          description="93% de satisfaction client"
          linkTo="/dashboard-pro/avis"
        />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Vue d'ensemble des ventes</CardTitle>
            <CardDescription>
              Analyse des ventes pour les 30 derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart 
              data={salesData}
              title="Ventes mensuelles"
              description="Vue d'ensemble de vos ventes et commandes"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenue sur votre espace vendeur pro</CardTitle>
            <CardDescription>
              Gérez votre boutique et suivez vos performances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Cette page est en cours de construction. Plus de fonctionnalités seront disponibles prochainement.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link to="/dashboard-pro/produits">Gérer mes produits</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/dashboard-pro/commandes">Voir mes commandes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProDashboardLayout>
  );
};

export default ProDashboard;
