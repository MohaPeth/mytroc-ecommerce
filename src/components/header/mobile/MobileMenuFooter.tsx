
import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, MapPin, Tag, Settings, LogOut } from 'lucide-react';

interface MobileMenuFooterProps {
  isLoggedIn: boolean;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onClose: () => void;
}

const MobileMenuFooter = ({ isLoggedIn, onLinkClick, onClose }: MobileMenuFooterProps) => {
  return (
    <div className="mt-auto px-4 pt-2 border-t border-gray-100 bg-white">
      <Link 
        to="/help"
        className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
        onClick={onLinkClick}
      >
        <HelpCircle size={20} className="text-mytroc-primary" />
        <span className="font-medium">Aide / FAQ</span>
      </Link>

      <Link 
        to="/livraison"
        className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
        onClick={onLinkClick}
      >
        <MapPin size={20} className="text-mytroc-primary" />
        <span className="font-medium">Livraison</span>
      </Link>

      <Link 
        to="/offres"
        className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
        onClick={onLinkClick}
      >
        <Tag size={20} className="text-mytroc-primary" />
        <span className="font-medium">Nos offres</span>
      </Link>

      {isLoggedIn && (
        <>
          <Link 
            to="/profile/settings"
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={onLinkClick}
          >
            <Settings size={20} className="text-mytroc-primary" />
            <span className="font-medium">Paramètres</span>
          </Link>
          
          <button
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-red-600"
            onClick={onClose}
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </>
      )}
    </div>
  );
};

export default MobileMenuFooter;
