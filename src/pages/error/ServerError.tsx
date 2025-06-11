
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-red-400 mb-4">500</div>
          <CardTitle>Erreur serveur</CardTitle>
          <CardDescription>
            Une erreur inattendue s'est produite. Nos équipes travaillent à résoudre le problème.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button onClick={handleRefresh} className="w-full gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualiser la page
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full gap-2">
                <Home className="h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerError;
