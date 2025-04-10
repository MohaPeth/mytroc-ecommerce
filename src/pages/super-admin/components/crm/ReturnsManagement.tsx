
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, Filter, FileText, Download, Settings, AlertTriangle, CheckCircle
} from 'lucide-react';

const ReturnsManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestion des retours et réclamations</CardTitle>
              <CardDescription>
                Gérez les demandes de retour et les réclamations des utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                En attente
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Traités
              </Button>
              <Button size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Rapports
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-md border border-dashed border-gray-200">
            <div className="text-center">
              <RotateCcw className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Module de Gestion des Retours</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Cette section permettra de gérer les demandes de retour, les réclamations, les remboursements et les litiges entre acheteurs et vendeurs.
              </p>
              <Button className="mt-4">Configurer le module</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnsManagement;
