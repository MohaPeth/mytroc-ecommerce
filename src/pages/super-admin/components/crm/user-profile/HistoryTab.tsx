
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HistoryTabProps {
  formatDate: (dateString: string) => string;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des interactions</CardTitle>
        <CardDescription>Toutes les interactions avec cet utilisateur</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-gray-200 pl-4 ml-3 space-y-6">
          <div className="relative mb-6">
            <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
            <div>
              <h3 className="text-base font-medium">Email de bienvenue envoyé</h3>
              <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-01-15')} - 14:30</time>
              <p className="text-sm">Email de bienvenue envoyé suite à l'inscription.</p>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
            <div>
              <h3 className="text-base font-medium">Premier produit publié</h3>
              <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-01-18')} - 10:15</time>
              <p className="text-sm">L'utilisateur a publié son premier produit : "Smartphone reconditionné".</p>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
            <div>
              <h3 className="text-base font-medium">Premier achat</h3>
              <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-02-03')} - 16:45</time>
              <p className="text-sm">Premier achat effectué sur la plateforme.</p>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-amber-500"></div>
            <div>
              <h3 className="text-base font-medium">Demande de support</h3>
              <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-03-12')} - 09:22</time>
              <p className="text-sm">L'utilisateur a contacté le support concernant un problème de livraison.</p>
              <Badge variant="outline" className="mt-2 bg-amber-50 text-amber-700 border-amber-200">
                Résolu
              </Badge>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-7 mt-1.5 h-3 w-3 rounded-full bg-green-500"></div>
            <div>
              <h3 className="text-base font-medium">Statut de vendeur professionnel</h3>
              <time className="text-xs text-muted-foreground mb-1 block">{formatDate('2024-03-28')} - 11:05</time>
              <p className="text-sm">L'utilisateur a été promu au statut de vendeur professionnel.</p>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                Statut spécial
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
