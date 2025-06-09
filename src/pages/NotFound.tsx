
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Illustration d'erreur 404 */}
          <div className="space-y-4">
            <div className="text-9xl font-bold text-mytroc-primary/20">404</div>
            <h1 className="text-3xl font-bold text-foreground">Page introuvable</h1>
            <p className="text-muted-foreground text-lg">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="w-full sm:w-auto gap-2">
                  <Home className="h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Search className="h-4 w-4" />
                  Explorer la boutique
                </Button>
              </Link>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la page précédente
            </Button>
          </div>

          {/* Suggestions */}
          <div className="text-left space-y-3 pt-8 border-t">
            <h2 className="font-semibold text-foreground">Suggestions :</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Vérifiez l'orthographe de l'URL</li>
              <li>• Utilisez notre barre de recherche</li>
              <li>• Explorez nos catégories de produits</li>
              <li>• Consultez notre page d'aide</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
