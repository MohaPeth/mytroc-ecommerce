
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, ShoppingBag, CircleDollarSign, Mail, Edit, Download
} from 'lucide-react';

interface ProfileHeaderProps {
  userProfile: any;
  formatDate: (dateString: string) => string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfile, formatDate }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userProfile.profileImage} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{userProfile.name}</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vendeur</Badge>
                {userProfile.status === 'active' ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Actif</Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactif</Badge>
                )}
              </div>
              <CardDescription className="mt-1">
                ID: {userProfile.id} | Membre depuis {formatDate(userProfile.registrationDate)}
              </CardDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{userProfile.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{userProfile.totalSales} ventes</span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {userProfile.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Envoyer un email
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Modifier le profil
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileHeader;
