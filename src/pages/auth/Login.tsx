
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

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simuler une connexion avec délai
    setTimeout(() => {
      // Vérifier si c'est le compte démo
      if (values.email === "demo@mytroc.com" && values.password === "demo123") {
        // Stocker les informations de connexion
        localStorage.setItem("mytroc-user", JSON.stringify({ 
          name: "Utilisateur Démo",
          email: values.email,
          isLoggedIn: true 
        }));
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre compte démo MyTroc",
        });
        
        navigate("/profile");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect. Vous pouvez utiliser le compte démo.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  }

  const loginWithDemo = () => {
    form.setValue("email", "demo@mytroc.com");
    form.setValue("password", "demo123");
    
    form.handleSubmit(onSubmit)();
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
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Compte démo: </span> 
                Vous pouvez utiliser notre compte démo pour explorer le site:
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Email:</span> demo@mytroc.com | 
                <span className="font-medium"> Mot de passe:</span> demo123
              </p>
              <Button 
                variant="link"
                className="text-mytroc-primary p-0 h-auto mt-1"
                onClick={loginWithDemo}
              >
                Utiliser le compte démo
              </Button>
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
