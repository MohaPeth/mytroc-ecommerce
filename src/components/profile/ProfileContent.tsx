
import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Edit, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile, UserProfileType } from "@/hooks/useUserProfile";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileContent = () => {
  const { user } = useAuth();
  const { fetchUserProfile, updateUserProfile, uploadAvatar, loading } = useUserProfile();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileType | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  
  useEffect(() => {
    const getProfile = async () => {
      const userData = await fetchUserProfile();
      setProfile(userData);
      setFormData(userData);
    };
    
    if (user) {
      getProfile();
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      if (!prev) return prev;
      
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof UserProfileType] as any || {}),
            [child]: value
          }
        };
      }
      
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  const handleSave = async () => {
    if (formData) {
      const success = await updateUserProfile(formData);
      if (success) {
        setProfile(formData);
        setIsEditing(false);
      }
    }
  };
  
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarLoading(true);
      const file = e.target.files[0];
      const avatarUrl = await uploadAvatar(file);
      
      if (avatarUrl && profile) {
        setProfile({...profile, avatar_url: avatarUrl});
      }
      setAvatarLoading(false);
    }
  };
  
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };
  
  if (loading && !profile) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-32 h-32 rounded-full" />
                  <Skeleton className="h-8 w-28 mt-4" />
                </div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-1/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-mytroc-primary text-white text-2xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-200 cursor-pointer hover:bg-gray-100"
                    >
                      <Camera className="h-4 w-4" />
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={avatarLoading}
                      />
                    </label>
                  )}
                </div>
                {isEditing ? (
                  <p className="text-sm text-gray-500 mt-2">Cliquez sur l'icône pour modifier la photo</p>
                ) : (
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditing(true)}>
                    Modifier le profil
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-lg font-medium">Informations personnelles</h3>
              
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">Prénom</Label>
                      <Input 
                        id="first_name" 
                        name="first_name" 
                        value={formData?.first_name || ""} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Nom</Label>
                      <Input 
                        id="last_name" 
                        name="last_name" 
                        value={formData?.last_name || ""} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="email" 
                        className="pl-10" 
                        value={user?.email || ""} 
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="phone" 
                        name="phone" 
                        className="pl-10" 
                        value={formData?.phone || ""} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.street">Adresse</Label>
                    <Input 
                      id="address.street" 
                      name="address.street" 
                      value={formData?.address?.street || ""} 
                      onChange={handleInputChange}
                      placeholder="Rue"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address.zip_code">Code postal</Label>
                      <Input 
                        id="address.zip_code" 
                        name="address.zip_code" 
                        value={formData?.address?.zip_code || ""} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address.city">Ville</Label>
                      <Input 
                        id="address.city" 
                        name="address.city" 
                        value={formData?.address?.city || ""} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-2 justify-end">
                    <Button variant="outline" onClick={() => {
                      setIsEditing(false);
                      setFormData(profile);
                    }}>
                      Annuler
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Prénom</p>
                      <p className="font-medium">{profile?.first_name || "Non renseigné"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nom</p>
                      <p className="font-medium">{profile?.last_name || "Non renseigné"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{profile?.phone || "Non renseigné"}</p>
                    </div>
                  </div>
                  
                  {profile?.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Adresse</p>
                        <p className="font-medium">{profile.address.street}</p>
                        <p className="text-gray-600">{profile.address.zip_code} {profile.address.city}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContent;
