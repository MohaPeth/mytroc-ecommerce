
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  comparePrice?: string;
  stock: string;
  sku?: string;
  brand?: string;
  published: boolean;
  featured: boolean;
}

export const useProducts = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const createProduct = async (formData: ProductFormData, images: File[] = []) => {
    setIsSubmitting(true);
    
    try {
      // Obtenir l'utilisateur actuel
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Vous devez être connecté pour ajouter un produit');
      }

      // Uploader les images si présentes
      let imageUrls: string[] = [];
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, image);

          if (uploadError) {
            console.error('Erreur upload image:', uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('product-images')
              .getPublicUrl(fileName);
            imageUrls.push(publicUrl);
          }
        }
      }

      // Créer le produit
      const productData = {
        name: formData.name,
        description: formData.description,
        category_id: formData.category,
        price: parseFloat(formData.price),
        original_price: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
        stock: parseInt(formData.stock),
        seller_id: user.id,
        status: formData.published ? 'published' : 'draft',
        is_featured: formData.featured,
        images: imageUrls,
        metadata: {
          sku: formData.sku || '',
          brand: formData.brand || ''
        }
      };

      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Produit créé avec succès",
        description: `Le produit "${formData.name}" a été ajouté à votre catalogue.`,
      });

      return data;
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'ajout du produit.",
        variant: "destructive"
      });
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createProduct, isSubmitting };
};
