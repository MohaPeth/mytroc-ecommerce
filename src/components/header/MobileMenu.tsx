import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, User, ShoppingCart, Home, Ticket, Package, HelpCircle, Settings, LogOut, MapPin, Tag } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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

  // Gestion du défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Fonction pour gérer les clics sur les liens
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onClose();
  };

  // Fonction pour gérer le clic sur le backdrop
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
        <div className="absolute top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4 border-b border-gray-100">
          <h2 className="text-lg font-medium">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Contenu du menu avec défilement */}
        <div className="flex-1 overflow-y-auto">
          {/* User profile section */}
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
                onClick={handleLinkClick}
              >
                <User size={20} className="text-mytroc-primary" />
                <span className="font-medium">Se connecter / S'inscrire</span>
              </Link>
            )}
          </div>

          <Separator className="mb-2" />

          {/* Navigation principale */}
          <div className="px-4 space-y-2">
            <Link 
              to="/" 
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
              onClick={handleLinkClick}
            >
              <Home size={20} className="text-mytroc-primary" />
              <span className="font-medium">Accueil</span>
            </Link>

            {/* Categories */}
            <div className="space-y-1">
              {categories.map((category) => {
                const IconComponent = menuIcons[category.name as keyof typeof menuIcons] || Package;
                
                return (
                  <div key={category.name} className="border-b border-gray-100 last:border-0">
                    {category.subcategories.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={category.name} className="border-0">
                          <AccordionTrigger className="py-3 px-3 hover:bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <IconComponent size={20} className="text-mytroc-secondary flex-shrink-0" />
                              <span className="font-medium text-left">{category.name}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="pl-9 space-y-1">
                              {category.subcategories.map((subcategory) => (
                                <li key={subcategory.name}>
                                  <Link 
                                    to={subcategory.link}
                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={handleLinkClick}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link 
                        to={category.link}
                        className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                        onClick={handleLinkClick}
                      >
                        <IconComponent size={20} className="text-mytroc-secondary flex-shrink-0" />
                        <span className="font-medium">{category.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-auto px-4 pt-2 border-t border-gray-100 bg-white">
          <Link 
            to="/help"
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={handleLinkClick}
          >
            <HelpCircle size={20} className="text-mytroc-primary" />
            <span className="font-medium">Aide / FAQ</span>
          </Link>

          <Link 
            to="/livraison"
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={handleLinkClick}
          >
            <MapPin size={20} className="text-mytroc-primary" />
            <span className="font-medium">Livraison</span>
          </Link>

          <Link 
            to="/offres"
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={handleLinkClick}
          >
            <Tag size={20} className="text-mytroc-primary" />
            <span className="font-medium">Nos offres</span>
          </Link>

          {isLoggedIn && (
            <>
              <Link 
                to="/profile/settings"
                className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                onClick={handleLinkClick}
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
      </div>
    </div>
  );
};

export default MobileMenu;
