
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Upload, Info, AlertCircle } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  eventName: z.string().min(3, { message: 'Le nom de l\'événement doit comporter au moins 3 caractères' }),
  eventDate: z.string().min(1, { message: 'La date est obligatoire' }),
  eventTime: z.string().min(1, { message: 'L\'heure est obligatoire' }),
  eventLocation: z.string().min(5, { message: 'Le lieu doit comporter au moins 5 caractères' }),
  category: z.string().min(1, { message: 'La catégorie est obligatoire' }),
  ticketType: z.string().min(1, { message: 'Le type de billet est obligatoire' }),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { 
    message: 'Le prix doit être un nombre positif' 
  }),
  quantity: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { 
    message: 'La quantité doit être un nombre positif' 
  }),
  description: z.string().optional(),
  // Normally would include file validation, simplified for now
});

type FormValues = z.infer<typeof formSchema>;

const PublishTicket = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      category: '',
      ticketType: '',
      price: '',
      quantity: '1',
      description: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const onSubmit = async (data: FormValues) => {
    // In a real app, here we would submit to an API endpoint
    console.log('Form submitted', data, selectedFile);
    
    // Show success toast
    toast({
      title: "Annonce publiée avec succès",
      description: "Votre annonce a été soumise pour validation et sera publiée prochainement.",
    });
    
    // Redirect to the tickets page after a short delay
    setTimeout(() => {
      navigate('/billets-evenements');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Mettre en vente un billet</h1>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Information importante</AlertTitle>
            <AlertDescription>
              Les annonces pour des billets peuvent nécessiter une validation par nos équipes avant publication.
              Nous vous recommandons de fournir un justificatif du billet original pour accélérer ce processus.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Détails de l'événement</CardTitle>
              <CardDescription>
                Veuillez remplir les informations concernant l'événement et le billet que vous souhaitez vendre.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l'événement</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Concert de Jazz au Palais Royal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="eventTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heure</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="eventLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Salle Apollo, 8 rue de la Paix, Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Catégorie</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une catégorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Concerts">Concerts</SelectItem>
                              <SelectItem value="Festivals">Festivals</SelectItem>
                              <SelectItem value="Théâtre">Théâtre</SelectItem>
                              <SelectItem value="Soirées privées">Soirées privées</SelectItem>
                              <SelectItem value="Sport">Sport</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ticketType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de billet</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: VIP, Standard, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantité disponible</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" step="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (facultatif)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Détails supplémentaires sur l'événement ou le billet..." 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel htmlFor="file-upload">Justificatif du billet (facultatif)</FormLabel>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-mytroc-primary hover:text-mytroc-primary/80"
                          >
                            <span>Télécharger un fichier</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF jusqu'à 10MB
                        </p>
                        {selectedFile && (
                          <p className="text-sm text-mytroc-primary">
                            {selectedFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/billets-evenements')}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">
                      Publier l'annonce
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default PublishTicket;
