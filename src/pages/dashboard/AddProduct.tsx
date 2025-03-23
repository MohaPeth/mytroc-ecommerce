
import React from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUp, Save, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const AddProduct = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      comparePrice: '',
      stock: '',
      sku: '',
      brand: '',
      published: true,
      featured: false,
    }
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Ici, vous pourriez ajouter la logique pour sauvegarder le produit
  };

  return (
    <DashboardLayout title="Ajouter un produit">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Ajouter un nouveau produit</h1>
          <p className="text-muted-foreground">Créez un nouveau produit pour votre boutique</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" type="button" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Annuler
          </Button>
          <Button 
            type="submit" 
            form="product-form" 
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>
                    Entrez les informations de base du produit
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du produit</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Mini Frigo Samsung" {...field} />
                        </FormControl>
                        <FormDescription>
                          Le nom du produit sera affiché sur la page du produit et dans les résultats de recherche.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre produit en détail..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">Électronique</SelectItem>
                              <SelectItem value="homeappliances">Électroménager</SelectItem>
                              <SelectItem value="computers">Informatique</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                              <SelectItem value="health">Santé</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marque</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Samsung, Apple, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Prix et inventaire</CardTitle>
                  <CardDescription>
                    Gérez les informations de prix et de stock
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="comparePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix comparatif (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormDescription>
                            Prix d'origine avant réduction, si applicable
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU (Référence)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: MTR-FRIGO-001" {...field} />
                          </FormControl>
                          <FormDescription>
                            Code unique pour l'identification du produit
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statut du produit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Publier le produit</FormLabel>
                          <FormDescription>
                            Ce produit sera visible dans votre boutique
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Produit en vedette</FormLabel>
                          <FormDescription>
                            Ce produit sera mis en avant sur votre page d'accueil
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
              <CardDescription>
                Ajoutez des images pour présenter votre produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Glissez et déposez des images</p>
                <p className="text-xs text-muted-foreground mb-4">PNG, JPG ou WEBP jusqu'à 5 MB</p>
                <Button variant="outline" size="sm">Parcourir les fichiers</Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-md overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
                  <img src="/placeholder.svg" alt="Preview" className="h-full w-full object-cover" />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="border-2 border-dashed rounded-md flex items-center justify-center aspect-square">
                  <Button variant="ghost" size="icon">
                    <FileUp className="h-6 w-6 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
