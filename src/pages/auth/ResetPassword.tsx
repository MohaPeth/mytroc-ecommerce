
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Home } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
      });

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              aria-label="Retour à l'accueil"
              className="text-gray-500 hover:text-gray-700"
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>
          <CardTitle className="text-2xl text-center">
            {emailSent ? "Email envoyé" : "Mot de passe oublié"}
          </CardTitle>
          <CardDescription className="text-center">
            {emailSent 
              ? "Vérifiez votre boîte mail et suivez les instructions pour réinitialiser votre mot de passe."
              : "Entrez votre email pour recevoir un lien de réinitialisation"
            }
          </CardDescription>
        </CardHeader>
        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Envoyer le lien"}
              </Button>
              <div className="text-sm text-center">
                <p>
                  Vous vous souvenez de votre mot de passe ?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold"
                    onClick={() => navigate('/auth/login')}
                  >
                    Se connecter
                  </Button>
                </p>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              onClick={() => navigate('/auth/login')}
              className="w-full"
            >
              Retour à la connexion
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setEmailSent(false);
                setEmail('');
              }}
              className="w-full"
            >
              Renvoyer un email
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
