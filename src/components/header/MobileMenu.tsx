
import React from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, Package, Tag, User, ShoppingCart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

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
  return (
    <div className={cn(
      "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-apple pt-20",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {categories.map(category => (
            <div key={category.name} className="border-b border-gray-100">
              {category.subcategories.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={category.name}>
                    <AccordionTrigger className="text-xl font-medium py-2 flex justify-between items-center">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-4 space-y-2">
                        {category.subcategories.map(subcategory => (
                          <li key={subcategory.name}>
                            <Link 
                              to={subcategory.link} 
                              className="block py-2 text-gray-700" 
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
                  className="text-xl font-medium py-2 flex justify-between items-center" 
                  onClick={onClose}
                >
                  <span>{category.name}</span>
                </Link>
              )}
            </div>
          ))}
          
          <div className="pt-4 space-y-4">
            <Link to="/livraison" className="flex items-center space-x-2 py-2" onClick={onClose}>
              <MapPin size={20} className="text-green-500" />
              <span>Livraison</span>
            </Link>
            
            <Link to="/commande" className="flex items-center space-x-2 py-2" onClick={onClose}>
              <Package size={20} className="text-green-500" />
              <span>Votre commande</span>
            </Link>
            
            <Link to="/offres" className="flex items-center space-x-2 py-2" onClick={onClose}>
              <Tag size={20} className="text-green-500" />
              <span>Nos offres</span>
            </Link>
            
            {isLoggedIn ? (
              <Link to="/profile" className="flex items-center space-x-2 py-2" onClick={onClose}>
                <User size={20} />
                <span>Mon compte</span>
              </Link>
            ) : (
              <Link to="/auth/login" className="flex items-center space-x-2 py-2" onClick={onClose}>
                <User size={20} />
                <span>Créer un compte / Se connecter</span>
              </Link>
            )}
            
            <Link to="/panier" className="flex items-center space-x-2 py-2" onClick={onClose}>
              <ShoppingCart size={20} className="text-green-500" />
              <span>Panier</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
