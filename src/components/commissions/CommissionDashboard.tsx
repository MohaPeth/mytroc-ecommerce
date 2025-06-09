
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCommissions } from '@/hooks/useCommissions';
import { Euro, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CommissionDashboard = () => {
  const { summary, commissions, isLoading } = useCommissions();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-24" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'En attente' },
      approved: { variant: 'default' as const, label: 'Approuvée' },
      paid: { variant: 'default' as const, label: 'Payée', className: 'bg-green-500' },
      cancelled: { variant: 'destructive' as const, label: 'Annulée' }
    };

    const config = variants[status as keyof typeof variants] || variants.pending;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Résumé des commissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              En attente
            </CardTitle>
            <div className="text-2xl font-bold">
              €{summary?.total_pending?.toFixed(2) || '0.00'}
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approuvées
            </CardTitle>
            <div className="text-2xl font-bold">
              €{summary?.total_approved?.toFixed(2) || '0.00'}
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Payées
            </CardTitle>
            <div className="text-2xl font-bold">
              €{summary?.total_paid?.toFixed(2) || '0.00'}
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total gagné
            </CardTitle>
            <div className="text-2xl font-bold">
              €{summary?.total_earnings?.toFixed(2) || '0.00'}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Historique des commissions */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des commissions</CardTitle>
          <CardDescription>
            Détail de vos commissions par vente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {commissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune commission trouvée
            </div>
          ) : (
            <div className="space-y-4">
              {commissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">
                      Commission #{commission.id.slice(0, 8)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(commission.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="font-medium">
                      €{commission.commission_amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(commission.commission_rate * 100).toFixed(1)}% de €{commission.base_amount.toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    {getStatusBadge(commission.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionDashboard;
