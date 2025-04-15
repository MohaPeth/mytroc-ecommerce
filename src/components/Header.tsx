import React, { useState, useEffect } from 'react';
import { MenuIcon, X, Search, ShoppingCart, User, MapPin, Package, Tag } from 'lucide-react';
import { useScrollProgress } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollProgress = useScrollProgress();
  const navigate = useNavigate();
  const {
    unreadCount
  } = useNotifications();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check if user is logged in
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('mytroc-user');
      setIsLoggedIn(userData !== null && JSON.parse(userData).isLoggedIn === true);
    };
    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();

    // Re-check login status when storage changes
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Define the category structure with subcategories
  const categoryStructure = [{
    name: 'Boutique',
    link: '/boutique',
    subcategories: []
  }, {
    name: 'Billets/Événements',
    link: '/billets-evenements',
    subcategories: [{
      name: 'Concerts',
      link: '/billets-evenements?category=Concerts'
    }, {
      name: 'Festivals',
      link: '/billets-evenements?category=Festivals'
    }, {
      name: 'Théâtre',
      link: '/billets-evenements?category=Théâtre'
    }, {
      name: 'Soirées privées',
      link: '/billets-evenements?category=Soirées privées'
    }, {
      name: 'Sport',
      link: '/billets-evenements?category=Sport'
    }]
  }, {
    name: 'Mode et accessoire',
    link: '/boutique?category=mode-accessoire',
    subcategories: [{
      name: 'Vêtements & Chaussures',
      link: '/boutique?subcategory=vetements-chaussures'
    }, {
      name: 'Accessoires',
      link: '/boutique?subcategory=accessoires'
    }]
  }, {
    name: 'Maison et Electroménager',
    link: '/boutique?category=maison-electromenager',
    subcategories: [{
      name: 'Meubles & Déco',
      link: '/boutique?subcategory=meubles-deco'
    }, {
      name: 'Électroménager',
      link: '/boutique?subcategory=electromenager'
    }, {
      name: 'Bricolage & Jardinage',
      link: '/boutique?subcategory=bricolage-jardinage'
    }]
  }, {
    name: 'HighTech',
    link: '/boutique?category=hightech',
    subcategories: [{
      name: 'Téléphones & Tablettes',
      link: '/boutique?subcategory=telephones-tablettes'
    }, {
      name: 'Ordinateurs & Périphériques',
      link: '/boutique?subcategory=ordinateurs-peripheriques'
    }, {
      name: 'Audiovisuel',
      link: '/boutique?subcategory=audiovisuel'
    }, {
      name: 'Photographie & Vidéo',
      link: '/boutique?subcategory=photographie-video'
    }, {
      name: 'Accessoires High-Tech',
      link: '/boutique?subcategory=accessoires-hightech'
    }]
  }, {
    name: 'Vehicule et immobilier',
    link: '/boutique?category=vehicule-immobilier',
    subcategories: [{
      name: 'Véhicules',
      link: '/boutique?subcategory=vehicules'
    }, {
      name: 'Immobilier',
      link: '/boutique?subcategory=immobilier'
    }]
  }, {
    name: 'Enfant et education',
    link: '/boutique?category=enfant-education',
    subcategories: [{
      name: 'Bébés & Enfants',
      link: '/boutique?subcategory=bebes-enfants'
    }, {
      name: 'Livres & Fournitures',
      link: '/boutique?subcategory=livres-fournitures'
    }, {
      name: 'Matériel éducatif',
      link: '/boutique?subcategory=materiel-educatif'
    }]
  }, {
    name: 'Loisirs',
    link: '/boutique?category=loisirs',
    subcategories: [{
      name: 'Loisirs & Sport',
      link: '/boutique?subcategory=loisirs-sport'
    }, {
      name: 'Emploi & Services',
      link: '/boutique?subcategory=emploi-services'
    }, {
      name: 'Produits Pro & Artisanaux',
      link: '/boutique?subcategory=produits-pro-artisanaux'
    }]
  }, {
    name: 'Services',
    link: '/boutique?category=services',
    subcategories: []
  }];
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page with query parameter
    navigate('/boutique?search=query');
  };
  
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Progress bar */}
      <div className="h-0.5 bg-mytroc-primary fixed top-0 left-0 z-50 transition-all duration-300" style={{
        width: `${scrollProgress}%`
      }} />
      
      {/* Top banner */}
      <div className="w-full bg-gray-100 py-2 px-4 text-sm flex items-center justify-between">
        <div className="hidden md:block">
          <span className="text-gray-600">Welcome to MyTroc</span>
        </div>
        <div className="md:hidden">
          <span className="text-xs text-gray-600">Welcome to MyTroc</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/livraison" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
            <MapPin size={16} className="text-green-500" />
            <span>Livraison</span>
          </Link>
          <Link to="/commande" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
            <Package size={16} className="text-green-500" />
            <span>Votre commande</span>
          </Link>
          <Link to="/offres" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
            <Tag size={16} className="text-green-500" />
            <span>Nos offres</span>
          </Link>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className={cn("w-full bg-white transition-all duration-300 ease-apple", isScrolled ? "py-2 shadow-subtle" : "py-3")}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and hamburger */}
            <div className="flex items-center md:w-1/4">
              <button 
                className="md:hidden mr-2 focus:outline-none" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? (
                  <X size={24} className="text-mytroc-darkgray" />
                ) : (
                  <MenuIcon size={24} className="text-mytroc-darkgray" />
                )}
              </button>
              <Link to="/" className="flex items-center">
                <div className="font-bold text-2xl flex items-center">
                  <span className="text-mytroc-primary font-bold mr-1">My</span>
                  <span className="text-mytroc-primary font-bold">Troc</span>
                </div>
              </Link>
            </div>
            
            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input type="text" placeholder="Rechercher essentials, groceries et plus..." className="mytroc-input pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 hover:bg-white focus:bg-white border border-gray-200" />
                <button type="submit" className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
                  <Search size={18} className="text-gray-400" />
                </button>
              </form>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-4 md:w-1/4 justify-end">
              {isLoggedIn ? <Link to="/profile" className="hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                  <User size={20} />
                  <span className="text-sm">Mon compte</span>
                </Link> : <Link to="/auth/login" className="hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                  <User size={20} />
                  <span className="text-sm">Créer un compte / Se connecter</span>
                </Link>}
              
              <Link to="/panier" className="flex items-center space-x-1 text-mytroc-secondary hover:text-mytroc-primary">
                <ShoppingCart size={20} />
                <span className="hidden md:inline text-sm">Panier</span>
              </Link>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input type="text" placeholder="Rechercher..." className="mytroc-input pl-10 pr-4 py-2 w-full text-sm rounded-full bg-gray-100" />
              <button type="submit" className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
                <Search size={16} className="text-gray-400" />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Categories navbar with dropdowns */}
      <div className={cn("w-full bg-white border-t border-gray-100 shadow-subtle transition-all duration-300 ease-apple", isScrolled ? "py-1" : "py-2")}>
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-4 items-center whitespace-nowrap">
            {categoryStructure.map(category => <div key={category.name} className="relative group">
                {category.subcategories.length > 0 ? <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors" onClick={() => navigate(category.link)}>
                        {category.name === 'Boutique' ? <span className="bg-mytroc-secondary text-white py-2 px-3 rounded-lg flex items-center">
                            {category.name}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span> : <span className="flex items-center">
                            {category.name}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-mytroc-secondary">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-64 rounded-xl shadow-elevated bg-white">
                      <div className="py-2">
                        <div className="font-medium px-4 py-2 text-mytroc-primary border-b border-gray-100">
                          {category.name}
                        </div>
                        <ul className="mt-2">
                          {category.subcategories.map(subcategory => <li key={subcategory.name}>
                              <Link to={subcategory.link} className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm" onClick={() => setIsOpen(false)}>
                                {subcategory.name}
                              </Link>
                            </li>)}
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover> : <Link to={category.link} className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors">
                    {category.name === 'Boutique' ? <span className="bg-mytroc-secondary text-white py-2 px-3 rounded-lg flex items-center">
                        {category.name}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span> : <span className="flex items-center">
                        {category.name}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-mytroc-secondary">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>}
                  </Link>}
              </div>)}
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Updated with improved spacing and design */}
      <div className={cn(
        "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-apple pt-20",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col h-full">
            {/* Main navigation items */}
            <div className="flex-1">
              <div className="space-y-4">
                {categoryStructure.map(category => (
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
                                    onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{category.name}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mytroc-secondary">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer navigation with enhanced spacing */}
            <div className="mt-8 border-t border-gray-100 pt-6 space-y-4">
              {isLoggedIn ? (
                <Link 
                  to="/profile" 
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 text-mytroc-primary mr-3" />
                  <span className="font-medium">Mon compte</span>
                </Link>
              ) : (
                <Link 
                  to="/auth/login" 
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 text-mytroc-primary mr-3" />
                  <span className="font-medium">Se connecter</span>
                </Link>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-gray-50 text-red-600 transition-colors"
              >
                <X className="h-5 w-5 mr-3" />
                <span className="font-medium">Fermer le menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
