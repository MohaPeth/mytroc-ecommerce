
import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, ShoppingCart, Home, Ticket, Package, HelpCircle, Settings, LogOut, MapPin, Tag } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
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

  return (
    <div className={cn(
      "fixed inset-0 bg-black/50 z-50 transform transition-all duration-300 ease-apple",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className={cn(
        "fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-elevated transform transition-transform duration-300 ease-apple pt-16 pb-4 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={24} className="text-gray-700" />
        </button>

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
              onClick={onClose}
            >
              <User size={20} className="text-mytroc-primary" />
              <span className="font-medium">Se connecter / S'inscrire</span>
            </Link>
          )}
        </div>

        <Separator className="mb-2" />

        {/* Main navigation */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="space-y-1">
            <Link 
              to="/" 
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
              onClick={onClose}
            >
              <Home size={20} className="text-mytroc-primary" />
              <span className="font-medium">Accueil</span>
            </Link>

            {/* Categories */}
            <div className="space-y-1">
              {categories.map(category => {
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
                              {category.subcategories.map(subcategory => (
                                <li key={subcategory.name}>
                                  <Link 
                                    to={subcategory.link} 
                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                                    onClick={onClose}
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
                        onClick={onClose}
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

        {/* Footer navigation */}
        <div className="mt-auto px-2 pt-2 border-t border-gray-100">
          <Link 
            to="/help" 
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={onClose}
          >
            <HelpCircle size={20} className="text-mytroc-primary" />
            <span className="font-medium">Aide / FAQ</span>
          </Link>

          <Link 
            to="/livraison" 
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={onClose}
          >
            <MapPin size={20} className="text-mytroc-primary" />
            <span className="font-medium">Livraison</span>
          </Link>

          <Link 
            to="/offres" 
            className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
            onClick={onClose}
          >
            <Tag size={20} className="text-mytroc-primary" />
            <span className="font-medium">Nos offres</span>
          </Link>

          {isLoggedIn && (
            <>
              <Link 
                to="/profile/settings" 
                className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                onClick={onClose}
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
      
      {/* Backdrop for closing the menu when clicking outside */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};

export default MobileMenu;
