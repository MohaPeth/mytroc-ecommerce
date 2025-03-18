
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
});

const ResetPasswordPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simuler une réinitialisation avec délai
    setTimeout(() => {
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.",
      });
      
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-subtle p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Réinitialiser votre mot de passe</h1>
          <p className="text-gray-600">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {!isSubmitted ? (
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

              <Button 
                type="submit" 
                className="w-full bg-mytroc-primary" 
                disabled={isLoading}
              >
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center">
            <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
              <p>Un email contenant un lien de réinitialisation a été envoyé à l'adresse indiquée si un compte existe avec cette adresse.</p>
              <p className="mt-2">Vérifiez votre boîte de réception et suivez les instructions.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitted(false)}
              className="mt-4"
            >
              Essayer une autre adresse
            </Button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/auth/login" className="inline-flex items-center text-mytroc-primary hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Retour à la page de connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
