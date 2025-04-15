import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-mytroc-lightgray pt-32">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 inline-block p-6 rounded-full bg-mytroc-primary/10">
            <h1 className="text-8xl font-bold text-mytroc-primary">404</h1>
          </div>
          <h2 className="text-2xl font-semibold text-mytroc-darkgray mb-3">
            Page introuvable
          </h2>
          <p className="text-mytroc-darkgray/80 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="mytroc-btn-primary inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </Link>
            
            <div className="pt-2 text-sm text-mytroc-darkgray/60">
              Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
