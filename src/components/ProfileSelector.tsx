
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, testUsers } from '@/hooks/useAuth';

interface ProfileSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const handleLogin = () => {
    if (selectedEmail) {
      const success = login(selectedEmail);
      
      if (success) {
        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté',
        });
        onClose();
      } else {
        toast({
          title: 'Erreur de connexion',
          description: 'Impossible de se connecter avec ce profil',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Sélection requise',
        description: 'Veuillez sélectionner un profil',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sélectionner un profil de test</DialogTitle>
          <DialogDescription>
            Choisissez l'un des profils de test pour vous connecter à l'application.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {testUsers.map((user) => (
            <Card 
              key={user.id} 
              className={`cursor-pointer border-2 ${selectedEmail === user.email ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => setSelectedEmail(user.email)}
            >
              <CardContent className="flex items-center p-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback className={`${
                    user.role === 'super-admin' ? 'bg-red-500' : 
                    user.role === 'vendor' ? 'bg-amber-500' : 'bg-green-500'
                  }`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs mt-1">
                    {user.role === 'super-admin' ? 'Super Administrateur' : 
                     user.role === 'vendor' ? 'Vendeur' : 'Client'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleLogin}>Se connecter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSelector;
