
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, Phone, MapPin, Calendar, Clock, Pencil
} from 'lucide-react';
import SalesChart from '@/components/dashboard/SalesChart';

interface ProfileOverviewProps {
  userProfile: any;
  formatDate: (dateString: string) => string;
  salesChartData: any[];
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ 
  userProfile, 
  formatDate,
  salesChartData
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Email</div>
                <div className="text-sm text-muted-foreground">{userProfile.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Téléphone</div>
                <div className="text-sm text-muted-foreground">{userProfile.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Adresse</div>
                <div className="text-sm text-muted-foreground">{userProfile.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Inscription</div>
                <div className="text-sm text-muted-foreground">{formatDate(userProfile.registrationDate)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Dernière activité</div>
                <div className="text-sm text-muted-foreground">{formatDate(userProfile.lastActivity)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations vendeur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium">Nom de l'entreprise</div>
              <div className="text-sm text-muted-foreground">{userProfile.sellerDetails.companyName}</div>
            </div>
            <div>
              <div className="text-sm font-medium">SIRET</div>
              <div className="text-sm text-muted-foreground">{userProfile.sellerDetails.siret}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Numéro de TVA</div>
              <div className="text-sm text-muted-foreground">{userProfile.sellerDetails.vatNumber}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Catégories de produits</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {userProfile.sellerDetails.productCategories.map((category: string) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Temps de réponse moyen</div>
              <div className="text-sm text-muted-foreground">{userProfile.sellerDetails.averageResponseTime}</div>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Voir la boutique
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notes administratives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[100px] border rounded-md p-3 text-sm">
              {userProfile.notes || "Aucune note pour le moment."}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Pencil className="h-4 w-4" />
              Modifier les notes
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Évolution des ventes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <SalesChart 
              data={salesChartData} 
              title="Évolution des ventes" 
              description="Les 30 derniers jours"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
