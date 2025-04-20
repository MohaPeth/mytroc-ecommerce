
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, Home, Ticket, Package } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MobileMenuHeader from './mobile/MobileMenuHeader';
import MobileMenuProfile from './mobile/MobileMenuProfile';
import MobileMenuCategory from './mobile/MobileMenuCategory';
import MobileMenuFooter from './mobile/MobileMenuFooter';

interface Category {
  name: string;
  link: string;
  subcategories: { name: string; link: string; }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  isLoggedIn: boolean;
}

const MobileMenu = ({ isOpen, onClose, categories, isLoggedIn }: MobileMenuProps) => {
  const menuIcons = {
    "Boutique": Package,
    "Billets/Événements": Ticket,
    "Mode et accessoire": ShoppingCart,
    "Maison et Electroménager": Home,
    "HighTech": Package,
    "Vehicule et immobilier": Package,
    "Enfant et education": Package,
    "Loisirs": Package,
    "Services": Package
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[100]" 
      onClick={handleBackdropClick}
    >
      <div 
        className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-elevated transform pt-16 pb-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <MobileMenuHeader onClose={onClose} />

        <div className="flex-1 overflow-y-auto">
          <MobileMenuProfile onLinkClick={handleLinkClick} />
          
          <Separator className="mb-2" />

          <div className="px-4 space-y-2">
            <Link 
              to="/" 
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
              onClick={handleLinkClick}
            >
              <Home size={20} className="text-mytroc-primary" />
              <span className="font-medium">Accueil</span>
            </Link>

            <div className="space-y-1">
              {categories.map((category) => (
                <MobileMenuCategory
                  key={category.name}
                  category={category}
                  icon={menuIcons[category.name as keyof typeof menuIcons] || Package}
                  onLinkClick={handleLinkClick}
                />
              ))}
            </div>
          </div>
        </div>

        <MobileMenuFooter 
          isLoggedIn={isLoggedIn} 
          onLinkClick={handleLinkClick}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
