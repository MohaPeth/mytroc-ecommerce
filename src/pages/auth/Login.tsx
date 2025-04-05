
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, AlertCircle, Facebook, Github, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, testUsers } from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn, currentUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Si l'utilisateur est déjà connecté, afficher un message
  React.useEffect(() => {
    if (isLoggedIn && currentUser) {
      toast({
        title: "Déjà connecté",
        description: `Vous êtes connecté en tant que ${currentUser.name} (${currentUser.role})`,
      });
    }
  }, [isLoggedIn, currentUser, toast]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Utiliser la fonction login du contexte d'authentification
    const success = login(values.email);
    
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect. Utilisez un des comptes de test.",
      });
    }
    
    setIsLoading(false);
  }

  const loginWithTestAccount = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password"); // Mot de passe fictif car nous vérifions uniquement l'email
    
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-subtle p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion à votre compte</h1>
          <p className="text-gray-600">Entrez vos identifiants pour accéder à votre compte</p>
        </div>

        {isLoggedIn && currentUser && (
          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <div className="flex gap-2">
              <Info size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  Vous êtes déjà connecté en tant que {currentUser.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Rôle: {currentUser.role === 'super-admin' ? 'Super Admin' : 
                         currentUser.role === 'vendor' ? 'Vendeur' : 'Client'}
                </p>
                <Link to="/profile">
                  <Button 
                    variant="link"
                    className="text-mytroc-primary p-0 h-auto mt-1"
                  >
                    Voir votre profil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input placeholder="votreemail@exemple.com" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Mot de passe</FormLabel>
                    <Link to="/auth/reset-password" className="text-sm text-mytroc-primary hover:underline">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">Se souvenir de moi</FormLabel>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-mytroc-primary" 
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou utiliser un compte de test</span>
          </div>
        </div>

        <div className="grid gap-3 mb-6">
          {testUsers.map((user) => (
            <div 
              key={user.id} 
              className={`p-3 border rounded-lg flex items-center cursor-pointer hover:bg-gray-50 ${
                user.role === 'super-admin' ? 'border-red-200 bg-red-50 hover:bg-red-100' : 
                user.role === 'vendor' ? 'border-amber-200 bg-amber-50 hover:bg-amber-100' : 
                'border-green-200 bg-green-50 hover:bg-green-100'
              }`}
              onClick={() => loginWithTestAccount(user.email)}
            >
              <div className="mr-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  user.role === 'super-admin' ? 'bg-red-500' : 
                  user.role === 'vendor' ? 'bg-amber-500' : 'bg-green-500'
                }`}>
                  <span className="text-white font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="text-xs px-2 py-1 rounded-full font-medium capitalize 
                text-gray-700 self-start mt-1
                bg-gray-100">
                {user.role === 'super-admin' ? 'Super Admin' : 
                 user.role === 'vendor' ? 'Vendeur' : 'Client'}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">Vous n'avez pas de compte? </span>
          <Link to="/auth/register" className="text-mytroc-primary font-medium hover:underline">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
