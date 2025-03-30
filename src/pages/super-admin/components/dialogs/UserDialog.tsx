
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from '../forms/UserForm';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
}

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSave: (user: Omit<User, 'id' | 'lastLogin'> & { id?: number }) => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const handleSubmit = (values: Omit<User, 'id' | 'lastLogin'>) => {
    // Dans un environnement réel, ce serait un appel API
    const updatedUser = user ? { ...values, id: user.id } : values;
    onSave(updatedUser);
    
    toast({
      title: user ? "Utilisateur mis à jour" : "Utilisateur créé",
      description: `L'utilisateur ${values.name} a été ${user ? "mis à jour" : "créé"} avec succès.`
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{user ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
          <DialogDescription>
            {user 
              ? "Modifiez les informations de l'utilisateur ci-dessous." 
              : "Remplissez les informations pour créer un nouvel utilisateur."}
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          initialData={user} 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
