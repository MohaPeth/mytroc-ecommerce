
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ShoppingCart, Filter, Download, LineChart, 
} from 'lucide-react';

interface SalesToolbarProps {
  onNewSale: () => void;
}

const SalesToolbar: React.FC<SalesToolbarProps> = ({ onNewSale }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <CardTitle>Gestion des ventes</CardTitle>
        <CardDescription>
          Suivez toutes les ventes réalisées sur la plateforme
        </CardDescription>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrer
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <LineChart className="h-4 w-4" />
          Graphiques
        </Button>
        <Button size="sm" className="gap-2" onClick={onNewSale}>
          <ShoppingCart className="h-4 w-4" />
          Nouvelle vente
        </Button>
      </div>
    </div>
  );
};

export default SalesToolbar;
