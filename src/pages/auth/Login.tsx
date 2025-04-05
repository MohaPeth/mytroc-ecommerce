
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, AlertCircle, Facebook, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Structure utilisateur avec rôle typé explicitement
interface User {
  name: string;
  email: string;
  role: "client" | "vendor" | "admin";
  isLoggedIn: boolean;
}

// Base de données simulée d'utilisateurs de test
const testUsers = [
  {
    email: "client@mytroc.com",
    password: "client123",
    userData: {
      name: "Client Test",
      email: "client@mytroc.com",
      role: "client" as const,
      isLoggedIn: true
    }
  },
  {
    email: "vendeur@mytroc.com",
    password: "vendeur123",
    userData: {
      name: "Vendeur Test",
      email: "vendeur@mytroc.com",
      role: "vendor" as const,
      isLoggedIn: true
    }
  },
  {
    email: "admin@mytroc.com",
    password: "admin123",
    userData: {
      name: "Admin Test",
      email: "admin@mytroc.com",
      role: "admin" as const,
      isLoggedIn: true
    }
  }
];

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Fonction pour rediriger l'utilisateur en fonction de son rôle
  const redirectUserBasedOnRole = (user: User) => {
    switch (user.role) {
      case "client":
        navigate("/profil");
        break;
      case "vendor":
        navigate("/dashboard");
        break;
      case "admin":
        navigate("/super-admin");
        break;
      default:
        navigate("/profil");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simuler une connexion avec délai
    setTimeout(() => {
      // Rechercher l'utilisateur dans notre base de test
      const user = testUsers.find(
        u => u.email === values.email && u.password === values.password
      );
      
      if (user) {
        // Stocker les informations de connexion
        localStorage.setItem("mytroc-user", JSON.stringify(user.userData));
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${user.userData.name}`,
        });
        
        // Rediriger l'utilisateur vers son espace dédié
        redirectUserBasedOnRole(user.userData);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect. Vous pouvez utiliser un compte de test.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  }

  const loginWithTestAccount = (type: "client" | "vendor" | "admin") => {
    setSelectedUserType(type);
    const testUser = testUsers.find(user => user.userData.role === type);
    
    if (testUser) {
      form.setValue("email", testUser.email);
      form.setValue("password", testUser.password);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-subtle p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion à votre compte</h1>
          <p className="text-gray-600">Entrez vos identifiants pour accéder à votre compte</p>
        </div>

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
            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="w-full">
            <Facebook size={18} className="mr-2" />
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            <Github size={18} className="mr-2" />
            Google
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-mytroc-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 font-semibold">
                Comptes de test:
              </p>
              <div className="grid grid-cols-1 gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`justify-start text-left ${selectedUserType === "client" ? "border-blue-500 bg-blue-50" : ""}`}
                  onClick={() => loginWithTestAccount("client")}
                >
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    <span>Client: client@mytroc.com / client123</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`justify-start text-left ${selectedUserType === "vendor" ? "border-green-500 bg-green-50" : ""}`}
                  onClick={() => loginWithTestAccount("vendor")}
                >
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span>Vendeur: vendeur@mytroc.com / vendeur123</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`justify-start text-left ${selectedUserType === "admin" ? "border-red-500 bg-red-50" : ""}`}
                  onClick={() => loginWithTestAccount("admin")}
                >
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    <span>Admin: admin@mytroc.com / admin123</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
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
