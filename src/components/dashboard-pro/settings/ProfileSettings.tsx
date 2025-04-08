
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mail } from 'lucide-react';

interface ProfileSettingsProps {
  onSave: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Mettez à jour vos informations personnelles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Jean Dupont</h3>
            <p className="text-sm text-muted-foreground">Vendeur Premium depuis Janvier 2023</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" defaultValue="Jean" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" defaultValue="Dupont" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex">
              <Input id="email" defaultValue="jean.dupont@example.com" readOnly />
              <Button variant="ghost" size="sm" className="ml-2">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" defaultValue="+33 6 12 34 56 78" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Textarea id="address" defaultValue="123 Rue du Commerce, 75001 Paris, France" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input id="city" defaultValue="Paris" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">Code postal</Label>
            <Input id="zip" defaultValue="75001" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input id="country" defaultValue="France" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSave}>Enregistrer les modifications</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSettings;
