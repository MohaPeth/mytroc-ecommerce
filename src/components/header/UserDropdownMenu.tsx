
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, CreditCard, Bell, Shield, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserDropdownMenu = () => {
  const { user, signOut } = useAuth();
  
  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 hover:text-mytroc-primary">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-mytroc-primary text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">Mon Compte</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profil" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profil?activeTab=orders" className="flex items-center gap-2 cursor-pointer">
            <Package className="h-4 w-4" />
            <span>Commandes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profil?activeTab=offers" className="flex items-center gap-2 cursor-pointer">
            <MessageSquare className="h-4 w-4" />
            <span>Offres</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profil?activeTab=payment" className="flex items-center gap-2 cursor-pointer">
            <CreditCard className="h-4 w-4" />
            <span>Paiement</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profil?activeTab=notifications" className="flex items-center gap-2 cursor-pointer">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profil?activeTab=security" className="flex items-center gap-2 cursor-pointer">
            <Shield className="h-4 w-4" />
            <span>Sécurité</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
