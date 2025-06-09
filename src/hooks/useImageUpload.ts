
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UploadedImage {
  file: File;
  preview: string;
  uploaded?: boolean;
  url?: string;
}

export const useImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Fonction pour redimensionner l'image
  const resizeImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxWidth / height);
        
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const addImages = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        toast({
          title: "Format non pris en charge",
          description: "Veuillez utiliser des fichiers JPG, PNG ou WEBP.",
          variant: "destructive"
        });
      }
      
      if (!isValidSize) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 5 MB.",
          variant: "destructive"
        });
      }
      
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) return;

    // Créer les previews et redimensionner les images
    const newImages: UploadedImage[] = await Promise.all(
      validFiles.map(async (file) => {
        const resizedFile = await resizeImage(file);
        return {
          file: resizedFile,
          preview: URL.createObjectURL(resizedFile),
          uploaded: false
        };
      })
    );

    setImages(prev => [...prev, ...newImages]);
    
    toast({
      title: "Images ajoutées",
      description: `${validFiles.length} image(s) ajoutée(s) avec succès.`
    });
  };

  const uploadImages = async (userId: string): Promise<string[]> => {
    if (images.length === 0) return [];
    
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.uploaded && image.url) {
          uploadedUrls.push(image.url);
          continue;
        }

        const fileExt = image.file.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}-${i}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(fileName, image.file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(data.path);

        const publicUrl = urlData.publicUrl;
        uploadedUrls.push(publicUrl);

        // Mettre à jour l'état de l'image
        setImages(prev => prev.map((img, index) => 
          index === i ? { ...img, uploaded: true, url: publicUrl } : img
        ));
      }

      toast({
        title: "Upload réussi",
        description: "Toutes les images ont été uploadées avec succès."
      });

      return uploadedUrls;
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur d'upload",
        description: "Une erreur est survenue lors de l'upload des images.",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const clearImages = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  return {
    images,
    isUploading,
    addImages,
    uploadImages,
    removeImage,
    clearImages
  };
};
