
import { useState } from 'react';
import { StorageService, UploadResult } from '@/services/storage.service';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useSupabaseStorage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, productId?: string): Promise<UploadResult> => {
    if (!user) {
      return { error: 'Utilisateur non connecté' };
    }

    setUploading(true);
    try {
      const result = await StorageService.uploadProductImage(file, user.id, productId);
      
      if (result.error) {
        toast({
          title: "Erreur d'upload",
          description: result.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Image uploadée",
          description: "L'image a été uploadée avec succès",
        });
      }

      return result;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[], productId?: string) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Utilisateur non connecté",
        variant: "destructive"
      });
      return { urls: [], errors: ['Utilisateur non connecté'] };
    }

    setUploading(true);
    try {
      const result = await StorageService.uploadMultipleImages(files, user.id, productId);
      
      if (result.errors.length > 0) {
        toast({
          title: "Erreurs d'upload",
          description: `${result.errors.length} images n'ont pas pu être uploadées`,
          variant: "destructive"
        });
      }

      if (result.urls.length > 0) {
        toast({
          title: "Images uploadées",
          description: `${result.urls.length} images uploadées avec succès`,
        });
      }

      return result;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (filePath: string) => {
    try {
      const result = await StorageService.deleteProductImage(filePath);
      
      if (result.error) {
        toast({
          title: "Erreur de suppression",
          description: result.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Image supprimée",
          description: "L'image a été supprimée avec succès",
        });
      }

      return result;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
      return { error: error.message };
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    uploading
  };
}
