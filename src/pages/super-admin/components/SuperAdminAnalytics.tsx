
import React from 'react';
import { 
  BarChart4, 
  Users, 
  Package, 
  AlertTriangle,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SuperAdminAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyses des Performances</CardTitle>
        <CardDescription>Statistiques sur les ventes, les avis clients et le trafic du site</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Performance des ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">€24,780</div>
                <Badge variant="success" className="text-xs">+12.5%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Comparé au mois précédent
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Satisfaction clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">4.8/5</div>
                <Badge variant="success" className="text-xs">+0.3</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Basé sur 247 avis ce mois-ci
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Trafic du site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">18,492</div>
                <Badge variant="destructive" className="text-xs">-3.2%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Visiteurs uniques ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Rapports détaillés</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <BarChart4 className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Analyse des ventes</div>
                <div className="text-xs text-muted-foreground">Revenus, commandes, produits populaires</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Analyse des clients</div>
                <div className="text-xs text-muted-foreground">Acquisition, rétention, comportements</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <Package className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Analyse des produits</div>
                <div className="text-xs text-muted-foreground">Performance, stocks, catégories</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <AlertTriangle className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Rapports d'anomalies</div>
                <div className="text-xs text-muted-foreground">Fraudes, commandes annulées, litiges</div>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center md:justify-end">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Télécharger tous les rapports
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuperAdminAnalytics;
