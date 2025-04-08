import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  Star, 
  MessageSquare, 
  ArrowUpRight, 
  Bell, 
  DollarSign 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SalesChart from '@/components/dashboard/SalesChart';

const StatCard = ({ title, value, icon: Icon, trend, description, linkTo }: any) => {
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
            <ArrowUpRight className={`ml-1 h-3 w-3 ${trend > 0 ? "text-green-500" : "text-red-500"}`} />
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

const RecentActivity = () => {
  const activities = [
    { 
      id: 1, 
      type: 'order', 
      title: 'Nouvelle commande #ORD-001', 
      description: 'Jean Dupont a commandé 2 produits',
      time: 'Il y a 25 minutes',
      icon: Package,
      link: '/dashboard-pro/commandes'
    },
    { 
      id: 2, 
      type: 'review', 
      title: 'Nouvel avis 5★', 
      description: 'Marie Martin a laissé un avis positif',
      time: 'Il y a 1 heure',
      icon: Star,
      link: '/dashboard-pro/avis'
    },
    { 
      id: 3, 
      type: 'message', 
      title: 'Nouveau message', 
      description: 'Paul Bernard a envoyé une question sur un produit',
      time: 'Il y a 3 heures',
      icon: MessageSquare,
      link: '/dashboard-pro/offres'
    },
    { 
      id: 4, 
      type: 'notification', 
      title: 'Promotion crée', 
      description: 'Votre promotion d\'été a été créée avec succès',
      time: 'Il y a 5 heures',
      icon: Bell,
      link: '/dashboard-pro/marketing'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>
          Restez informé de toutes vos activités récentes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${
              activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
              activity.type === 'review' ? 'bg-green-100 text-green-600' :
              activity.type === 'message' ? 'bg-purple-100 text-purple-600' :
              'bg-amber-100 text-amber-600'
            }`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <time className="text-xs text-muted-foreground">{activity.time}</time>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <Link to={activity.link} className="text-xs text-mytroc-primary hover:underline">
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const TopProducts = () => {
  const products = [
    { 
      id: 1, 
      name: 'Mini Frigo Samsung', 
      sales: 42, 
      revenue: '12,600€',
      image: '/placeholder.svg'
    },
    { 
      id: 2, 
      name: 'Asus Zenbook Pro', 
      sales: 38, 
      revenue: '56,962€',
      image: '/placeholder.svg'
    },
    { 
      id: 3, 
      name: 'TV OLED LG C2', 
      sales: 27, 
      revenue: '16,219€',
      image: '/placeholder.svg'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits les plus vendus</CardTitle>
        <CardDescription>
          Les produits qui génèrent le plus de revenus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 rounded-md">
              <AvatarImage src={product.image} />
              <AvatarFallback className="rounded-md">PD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{product.name}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{product.sales} ventes</span>
                <span className="mx-2">•</span>
                <span>{product.revenue}</span>
              </div>
            </div>
            <Link to={`/dashboard-pro/produits`}>
              <Button variant="ghost" size="sm">
                Voir
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const RecentReviews = () => {
  const reviews = [
    { 
      id: 1, 
      customer: 'Marie Martin', 
      product: 'Mini Frigo Samsung',
      rating: 5,
      comment: 'Excellent produit, expédition rapide !',
      date: 'Il y a 2 jours',
      avatar: '/placeholder.svg'
    },
    { 
      id: 2, 
      customer: 'Thomas Dubois', 
      product: 'Asus Zenbook Pro',
      rating: 4,
      comment: 'Très bon rapport qualité-prix, je recommande.',
      date: 'Il y a 3 jours',
      avatar: '/placeholder.svg'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avis récents</CardTitle>
        <CardDescription>
          Les derniers avis laissés par vos clients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{review.customer}</p>
                  <p className="text-xs text-muted-foreground">{review.product}</p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm">{review.comment}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{review.date}</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Répondre
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/dashboard-pro/avis">Voir tous les avis</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const DashboardPro = () => {
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

      <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TopProducts />
        </div>
        <div className="lg:col-span-1">
          <RecentReviews />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance marketing</CardTitle>
            <CardDescription>
              Suivi de vos campagnes et promotions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Promotion estivale</p>
                    <p className="text-xs text-muted-foreground">25% de réduction</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progrès: 64%</span>
                    <span>16/25 jours</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Ventes: 28</span>
                  <span>Revenus: 8,245€</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Black Friday</p>
                    <p className="text-xs text-muted-foreground">30% de réduction</p>
                  </div>
                  <Badge className="bg-amber-500">Programmée</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Commence dans: 45 jours</span>
                    <span>0/5 jours</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4" asChild>
              <Link to="/dashboard-pro/marketing">Gérer les promotions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support H24</CardTitle>
            <CardDescription>
              Assistance personnalisée disponible 24h/24 et 7j/7
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Support prioritaire</p>
                <p className="text-sm text-muted-foreground">Temps de réponse moyen: 15 minutes</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">3 conseillers en ligne</span>
              </div>
              <p className="text-xs text-muted-foreground">
                En tant que vendeur premium, vous bénéficiez d'un accès prioritaire à notre équipe de support technique et commercial.
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1" asChild>
                <Link to="/dashboard-pro/support">Contacter le support</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/faq">FAQ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProDashboardLayout>
  );
};

export default DashboardPro;
