
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProfileProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MobileMenuProfile = ({ onLinkClick }: MobileMenuProfileProps) => {
  const { user, signOut } = useAuth();
  
  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  if (!user) {
    return (
      <div className="px-4 pb-4">
        <Link 
          to="/auth/login" 
          className="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full"
          onClick={onLinkClick}
        >
          <User size={20} className="text-mytroc-primary" />
          <span className="font-medium">Se connecter / S'inscrire</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10 border border-gray-200">
          <AvatarImage src="/placeholder.svg" alt={user.email || "Utilisateur"} />
          <AvatarFallback className="bg-mytroc-primary text-white">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-900">
            {user.user_metadata?.first_name || user.email}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <Separator className="mb-4" />
      
      <div className="space-y-2">
        <Link 
          to="/profil" 
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
          onClick={onLinkClick}
        >
          <User size={20} className="text-mytroc-primary" />
          <span>Mon profil</span>
        </Link>
        <Link 
          to="/profil?activeTab=orders" 
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
          onClick={onLinkClick}
        >
          <Package size={20} className="text-mytroc-primary" />
          <span>Mes commandes</span>
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            signOut();
            onLinkClick({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>);
          }}
        >
          <LogOut size={20} className="mr-3" />
          <span>Déconnexion</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileMenuProfile;
