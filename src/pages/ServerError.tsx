
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/footer';

const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Illustration d'erreur 500 */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <AlertTriangle className="h-24 w-24 text-red-500" />
            </div>
            <div className="text-6xl font-bold text-red-500/20">500</div>
            <h1 className="text-3xl font-bold text-foreground">Erreur serveur</h1>
            <p className="text-muted-foreground text-lg">
              Une erreur inattendue s'est produite sur nos serveurs. 
              Nous travaillons à la résoudre rapidement.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleRefresh} className="w-full sm:w-auto gap-2">
                <RefreshCw className="h-4 w-4" />
                Actualiser la page
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Home className="h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>

          {/* Informations d'aide */}
          <div className="text-left space-y-3 pt-8 border-t">
            <h2 className="font-semibold text-foreground">Que faire ?</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Actualisez la page dans quelques minutes</li>
              <li>• Vérifiez votre connexion internet</li>
              <li>• Contactez notre support si le problème persiste</li>
              <li>• Nous vous tiendrons informés sur nos réseaux sociaux</li>
            </ul>
          </div>

          {/* Contact support */}
          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Si le problème persiste, contactez notre{' '}
              <Link to="/support" className="text-mytroc-primary hover:underline">
                équipe support
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServerError;
