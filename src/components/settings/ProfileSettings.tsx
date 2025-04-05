
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/dashboard/ImageUploader';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  avatarUrl: string;
}

const ProfileSettings = () => {
  // État simulé de l'utilisateur
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    address: {
      street: '123 Rue de la République',
      city: 'Lyon',
      zipCode: '69001',
    },
    avatarUrl: '/lovable-uploads/26253943-a012-43da-8962-57f591eb6d0c.png',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === 'street' || field === 'city' || field === 'zipCode') {
      setEditedProfile({
        ...editedProfile,
        address: {
          ...editedProfile.address,
          [field]: e.target.value,
        },
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        [field]: e.target.value,
      });
    }
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditingProfile(false);
  };

  const handleImagesChange = (images: File[]) => {
    if (images.length > 0) {
      // We only need the first image for avatar
      const imageUrl = URL.createObjectURL(images[0]);
      setProfile({
        ...profile,
        avatarUrl: imageUrl,
      });
      setIsAvatarDialogOpen(false);
      toast({
        title: "Photo de profil mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Modifier</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier votre profil</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={editedProfile.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Adresse</Label>
                <Input
                  id="street"
                  value={editedProfile.address.street}
                  onChange={(e) => handleInputChange(e, 'street')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Code postal</Label>
                  <Input
                    id="zipCode"
                    value={editedProfile.address.zipCode}
                    onChange={(e) => handleInputChange(e, 'zipCode')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={editedProfile.address.city}
                    onChange={(e) => handleInputChange(e, 'city')}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile}>Enregistrer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo de profil */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Photo de profil</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback className="bg-mytroc-primary text-white text-xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-white"
                onClick={() => setIsAvatarDialogOpen(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAvatarDialogOpen(true)}
            >
              Changer la photo
            </Button>
          </div>
        </Card>

        {/* Informations personnelles */}
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-medium">{profile.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-4">Adresse</h3>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{profile.address.street}</p>
                  <p className="text-gray-600">{profile.address.zipCode} {profile.address.city}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Dialog for avatar upload */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Changer votre photo de profil</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Téléchargez une nouvelle photo de profil. Les formats PNG, JPG ou WEBP sont acceptés.
            </p>
            <ImageUploader onImagesChange={handleImagesChange} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSettings;
