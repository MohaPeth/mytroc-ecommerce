
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export function useAvatarStorage() {
  const [loading, setLoading] = useState(false);
  const [bucketExists, setBucketExists] = useState(false);
  const { toast } = useToast();
  
  // Vérifie si le bucket 'avatars' existe
  useEffect(() => {
    const checkBucket = async () => {
      try {
        // Tentative de listage pour voir si le bucket existe
        const { data, error } = await supabase.storage.getBucket('avatars');
        
        if (!error && data) {
          setBucketExists(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du bucket avatars:", error);
      }
    };
    
    checkBucket();
  }, []);
  
  const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
    if (!bucketExists) {
      toast({
        title: "Erreur",
        description: "Le stockage des avatars n'est pas configuré",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setLoading(true);
      
      // Création d'un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;
      
      // Upload de l'image
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Récupération de l'URL publique
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error: any) {
      console.error("Erreur lors de l'upload de l'avatar:", error.message);
      toast({
        title: "Erreur d'upload",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    uploadAvatar,
    loading,
    bucketExists
  };
}
