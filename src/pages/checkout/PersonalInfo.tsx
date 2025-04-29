
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckout, PersonalInfo as PersonalInfoType } from '@/hooks/useCheckout';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
});

const PersonalInfo = () => {
  const { user } = useAuth();
  const { checkoutState, loadUserProfile, updatePersonalInfo } = useCheckout();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    // Récupérer les données du profil utilisateur si connecté
    if (user) {
      loadUserProfile();
    }
    
    // Charger les données sauvegardées dans sessionStorage ou du profil
    const savedInfo = sessionStorage.getItem('checkoutPersonalInfo');
    
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo) as PersonalInfoType;
      form.reset(parsedInfo);
    } else if (checkoutState.personalInfo) {
      form.reset(checkoutState.personalInfo);
    }
  }, [user, checkoutState.personalInfo, form, loadUserProfile]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePersonalInfo(values);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse e-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              CONTINUER
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
