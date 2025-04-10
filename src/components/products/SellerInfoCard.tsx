
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, CheckCircle2, Store } from 'lucide-react';

interface SellerInfoProps {
  seller: {
    id: string;
    name: string;
    isCertified: boolean;
    isPro: boolean;
    location: string;
    rating: number;
    salesCount: number;
  };
}

const SellerInfoCard: React.FC<SellerInfoProps> = ({ seller }) => {
  return (
    <Card className="mb-6 border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">{seller.name}</h3>
            {seller.isCertified && (
              <Badge variant="success" className="ml-2 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Certifié</span>
              </Badge>
            )}
          </div>
          
          {/* Bouton "Voir boutique" uniquement pour les vendeurs Pro */}
          {seller.isPro ? (
            <Button variant="outline" size="sm" className="text-xs" asChild>
              <Link to={`/vendeur/${seller.id}`}>
                <Store className="h-4 w-4 mr-1" />
                Voir boutique
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="text-xs">
              Voir profil
            </Button>
          )}
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{seller.location}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm">
          <div className="flex items-center mr-4">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{seller.rating}/5</span>
          </div>
          <div>
            <span className="text-gray-600">{seller.salesCount} ventes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerInfoCard;
