
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MobileMenuProfileProps {
  isLoggedIn: boolean;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MobileMenuProfile = ({ isLoggedIn, onLinkClick }: MobileMenuProfileProps) => {
  return (
    <div className="px-4 pb-4">
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-mytroc-primary text-white">U</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">user@mytroc.com</p>
          </div>
        </div>
      ) : (
        <Link 
          to="/auth/login" 
          className="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full"
          onClick={onLinkClick}
        >
          <User size={20} className="text-mytroc-primary" />
          <span className="font-medium">Se connecter / S'inscrire</span>
        </Link>
      )}
    </div>
  );
};

export default MobileMenuProfile;
