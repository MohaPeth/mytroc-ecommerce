
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLoyaltyPoints } from '@/hooks/useLoyaltyPoints';
import { Star, Clock, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const LoyaltyPointsWidget = () => {
  const { balance, history, isLoading } = useLoyaltyPoints();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-20" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Solde des points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Mes points de fidélité
          </CardTitle>
          <CardDescription>
            Gagnez des points à chaque achat et échange
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {balance?.total_points || 0}
              </div>
              <div className="text-sm text-muted-foreground">Points totaux</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold text-orange-600">
                {balance?.points_expiring_soon || 0}
              </div>
              <div className="text-sm text-muted-foreground">Expirent bientôt</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">
                {balance?.points_earned_this_month || 0}
              </div>
              <div className="text-sm text-muted-foreground">Ce mois-ci</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique récent */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Historique récent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.slice(0, 5).map((point) => (
                <div key={point.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      {point.earned_from === 'purchase' ? (
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <Star className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{point.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(point.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    +{point.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoyaltyPointsWidget;
