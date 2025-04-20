
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

interface MobileMenuFooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onClose: () => void;
}

const MobileMenuFooter = ({ onLinkClick, onClose }: MobileMenuFooterProps) => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    onClose();
  };

  if (user) {
    return (
      <div className="px-4 pt-2 border-t border-gray-100">
        <Button 
          variant="outline" 
          className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          Déconnexion
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 border-t border-gray-100">
      <Link 
        to="/auth/login" 
        className="block w-full"
        onClick={onLinkClick}
      >
        <Button variant="default" className="w-full justify-center">
          Se connecter / S'inscrire
        </Button>
      </Link>
    </div>
  );
};

export default MobileMenuFooter;
