
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { Json } from '@/integrations/supabase/types';

export type UserProfileType = {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: {
    street?: string;
    city?: string;
    zip_code?: string;
    country?: string;
  } | null;
  avatar_url?: string | null;
};

// Helper function to transform database address (Json) into our expected format
const transformAddress = (address: Json | null): UserProfileType['address'] => {
  if (!address) return null;
  
  // If address is an object with the expected properties, return it
  if (typeof address === 'object' && address !== null && !Array.isArray(address)) {
    const addressObj = address as Record<string, unknown>;
    return {
      street: typeof addressObj.street === 'string' ? addressObj.street : undefined,
      city: typeof addressObj.city === 'string' ? addressObj.city : undefined,
      zip_code: typeof addressObj.zip_code === 'string' ? addressObj.zip_code : undefined,
      country: typeof addressObj.country === 'string' ? addressObj.country : undefined
    };
  }
  
  // Default to null if the address format is not as expected
  return null;
};

export function useUserProfile() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      
      if (!user?.id) {
        throw new Error("Utilisateur non connecté");
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      // Transform the raw data into our UserProfileType
      const transformedData: UserProfileType = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: transformAddress(data.address),
        avatar_url: data.avatar_url
      };
      
      return transformedData;
    } catch (error: any) {
      console.error("Erreur lors de la récupération du profil:", error.message);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer votre profil",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const updateUserProfile = async (profileData: Partial<UserProfileType>) => {
    try {
      setLoading(true);
      
      if (!user?.id) {
        throw new Error("Utilisateur non connecté");
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });
      
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil:", error.message);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre profil: " + error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const uploadAvatar = async (file: File) => {
    try {
      setLoading(true);
      
      if (!user?.id) {
        throw new Error("Utilisateur non connecté");
      }
      
      // Création d'un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
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
      
      // Mise à jour du profil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès",
      });
      
      return data.publicUrl;
    } catch (error: any) {
      console.error("Erreur lors de l'upload de l'avatar:", error.message);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre photo de profil",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    fetchUserProfile,
    updateUserProfile,
    uploadAvatar,
    loading,
  };
}
