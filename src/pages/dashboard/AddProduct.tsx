import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUploader from '@/components/dashboard/ImageUploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { LoadingSpinner } from '@/components/ui/loading-states/LoadingSpinner';
import { Breadcrumbs } from '@/components/ui/navigation/Breadcrumbs';
import { ConfirmDialog } from '@/components/ui/feedback/ConfirmDialog';

// Schéma de validation Zod pour le formulaire
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom du produit doit comporter au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit comporter au moins 10 caractères.",
  }),
  category: z.string().min(1, {
    message: "Veuillez sélectionner une catégorie.",
  }),
  price: z.string().min(1, {
    message: "Veuillez entrer un prix.",
  }),
  comparePrice: z.string().optional(),
  stock: z.string().min(1, {
    message: "Veuillez indiquer la quantité en stock.",
  }),
  sku: z.string().optional(),
  brand: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const AddProduct = () => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();
  const { createProduct, isSubmitting } = useProducts();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
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

  const handleImagesChange = (images: File[]) => {
    setProductImages(images);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Convertir les données pour correspondre au type ProductFormData
      const productFormData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        comparePrice: data.comparePrice,
        stock: data.stock,
        sku: data.sku,
        brand: data.brand,
        published: data.published,
        featured: data.featured,
      };
      
      await createProduct(productFormData, productImages);
      navigate('/dashboard/produits');
    } catch (error) {
      // L'erreur est déjà gérée dans le hook useProducts
    }
  };

  const handleCancel = () => {
    if (form.formState.isDirty || productImages.length > 0) {
      setShowCancelDialog(true);
    } else {
      navigate('/dashboard/produits');
    }
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    navigate('/dashboard/produits');
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Mes produits', href: '/dashboard/produits' },
    { label: 'Ajouter un produit', current: true }
  ];

  if (categoriesLoading) {
    return (
      <DashboardLayout title="Ajouter un produit">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" text="Chargement..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Ajouter un produit">
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/produits')}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            </div>
            <h1 className="text-2xl font-bold">Ajouter un nouveau produit</h1>
            <p className="text-muted-foreground">Créez un nouveau produit pour votre boutique</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              type="button" 
              className="gap-2"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <Trash2 className="h-4 w-4" />
              Annuler
            </Button>
            <Button 
              type="submit" 
              form="product-form" 
              className="gap-2"
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
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
                              disabled={categoriesLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={categoriesLoading ? "Chargement..." : "Sélectionnez une catégorie"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
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
              <CardContent>
                <ImageUploader onImagesChange={handleImagesChange} />
                
                {productImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {productImages.length} image(s) téléchargée(s)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Annuler la création"
        description="Voulez-vous vraiment annuler ? Toutes les modifications seront perdues."
        confirmText="Oui, annuler"
        cancelText="Continuer l'édition"
        onConfirm={confirmCancel}
        variant="destructive"
      />
    </DashboardLayout>
  );
};

export default AddProduct;
