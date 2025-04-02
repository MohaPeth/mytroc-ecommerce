
import React, { useState, useEffect } from 'react';
import { MenuIcon, X, Search, ShoppingCart, User, Truck, Package, ChevronDown } from 'lucide-react';
import { useScrollProgress } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';

// Import NavigationMenu components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollProgress = useScrollProgress();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/boutique?search=query');
  };

  // Category navigation structure
  const categories = [
    {
      name: 'Boutique',
      link: '/boutique',
      subcategories: []
    },
    {
      name: 'Mode et accessoire',
      link: '/boutique?category=mode-accessoires',
      subcategories: [
        { name: 'Vêtements & Chaussures', link: '/boutique?category=vetements-chaussures' },
        { name: 'Accessoires de Mode', link: '/boutique?category=accessoires-mode' }
      ]
    },
    {
      name: 'Maison et Électroménager',
      link: '/boutique?category=maison-electromenager',
      subcategories: [
        { name: 'Meubles & Déco', link: '/boutique?category=meubles-deco' },
        { name: 'Électroménager', link: '/boutique?category=electromenager' },
        { name: 'Bricolage & Jardinage', link: '/boutique?category=bricolage-jardinage' }
      ]
    },
    {
      name: 'HighTech',
      link: '/boutique?category=electronique-hightech',
      subcategories: [
        { name: 'Téléphones & Tablettes', link: '/boutique?category=telephones-tablettes' },
        { name: 'Ordinateurs & Périphériques', link: '/boutique?category=ordinateurs-peripheriques' },
        { name: 'Audiovisuel', link: '/boutique?category=audiovisuel' }
      ]
    },
    {
      name: 'Vehicule et immobilier',
      link: '/boutique?category=vehicules-immobilier',
      subcategories: [
        { name: 'Véhicules', link: '/boutique?category=vehicules' },
        { name: 'Immobilier', link: '/boutique?category=immobilier' }
      ]
    },
    {
      name: 'Enfant et education',
      link: '/boutique?category=enfants-education',
      subcategories: [
        { name: 'Bébés & Enfants', link: '/boutique?category=bebes-enfants' },
        { name: 'Livres & Fournitures', link: '/boutique?category=livres-fournitures' }
      ]
    },
    {
      name: 'Loisirs',
      link: '/boutique?category=loisirs-sport',
      subcategories: [
        { name: 'Jeux & Sports', link: '/boutique?category=jeux-sports' },
        { name: 'Instruments de musique', link: '/boutique?category=instruments-musique' }
      ]
    },
    {
      name: 'Services',
      link: '/boutique?category=services',
      subcategories: [
        { name: 'Services personnels', link: '/boutique?category=services-personnels' },
        { name: 'Services professionnels', link: '/boutique?category=services-professionnels' }
      ]
    }
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Progress bar */}
      <div className="h-0.5 bg-mytroc-primary fixed top-0 left-0 z-50 transition-all duration-300" style={{
        width: `${scrollProgress}%`
      }} />
      
      {/* Top banner - Simplified to match the image */}
      <div className="w-full bg-gray-100 py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-600">Welcome to MyTroc</div>
          <div className="flex items-center space-x-8">
            <Link to="/checkout/livraison" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
              <Truck size={16} className="text-green-500" />
              <span>Livraison</span>
            </Link>
            <Link to="/checkout/confirmation" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
              <Package size={16} className="text-green-500" />
              <span>Votre commande</span>
            </Link>
            <div className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
              <span className="text-green-500">●</span>
              <span>Nos offres</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation with logo and search */}
      <nav className={cn("w-full bg-white transition-all duration-300 ease-apple border-b border-gray-200", isScrolled ? "py-2 shadow-subtle" : "py-3")}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button and logo */}
            <div className="flex items-center space-x-4">
              <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} className="text-mytroc-darkgray" /> : <MenuIcon size={24} className="text-mytroc-darkgray" />}
              </button>
              <Link to="/" className="flex items-center">
                <img src="/lovable-uploads/d4eecaaa-8e54-488c-927a-c153c1e119dc.png" alt="MyTroc Logo" className="h-10" />
              </Link>
            </div>
            
            {/* Search bar - styled to match the image */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
                  <input 
                    type="text" 
                    placeholder="Rechercher essentials, groceries et plus..." 
                    className="py-2 px-4 w-full bg-transparent border-none focus:outline-none"
                  />
                  <button type="submit" className="p-2 text-gray-500 hover:text-gray-700">
                    <Search size={18} />
                  </button>
                </div>
              </form>
            </div>
            
            {/* User actions: account and cart */}
            <div className="flex items-center space-x-6">
              {isLoggedIn ? (
                <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
                  <User size={20} />
                  <span className="hidden md:inline">Mon compte</span>
                </Link>
              ) : (
                <Link to="/auth/login" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
                  <User size={20} />
                  <span className="hidden md:inline">Créer un compte /Se connecter</span>
                </Link>
              )}
              
              <Link to="/panier" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
                <ShoppingCart size={20} />
                <span className="hidden md:inline">Panier</span>
              </Link>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="py-2 px-4 w-full bg-transparent border-none focus:outline-none text-sm"
                />
                <button type="submit" className="p-1 text-gray-500 hover:text-gray-700">
                  <Search size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      
      {/* Categories navbar with dropdowns */}
      <div className="w-full bg-white border-b border-gray-200 hidden md:block">
        <div className="container mx-auto">
          <NavigationMenu className="justify-start w-full">
            <NavigationMenuList className="space-x-0">
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  {category.subcategories.length > 0 ? (
                    <>
                      <NavigationMenuTrigger className={
                        category.name === "Boutique" 
                          ? "bg-green-500 text-white hover:bg-green-600 rounded-full px-6" 
                          : "text-gray-700 hover:text-mytroc-primary"
                      }>
                        {category.name} {category.subcategories.length > 0 && <ChevronDown className="h-4 w-4 ml-1" />}
                      </NavigationMenuTrigger>
                      
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] p-2">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.name}>
                              <NavigationMenuLink asChild>
                                <Link 
                                  to={subcategory.link}
                                  className="block p-2 hover:bg-gray-100 rounded-md"
                                >
                                  {subcategory.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link 
                      to={category.link}
                      className={
                        category.name === "Boutique" 
                          ? "flex items-center bg-green-500 text-white hover:bg-green-600 rounded-full px-6 py-2 mx-2" 
                          : "flex items-center text-gray-700 hover:text-mytroc-primary px-4 py-2"
                      }
                    >
                      {category.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Mobile menu - Simplified to match the style */}
      <div className={cn("fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-apple pt-20", isOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="border-b border-gray-200 pb-2">
                <Link 
                  to={category.link} 
                  className="text-xl font-medium py-2 block"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
                
                {category.subcategories.length > 0 && (
                  <div className="ml-4 mt-1 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <Link 
                        key={subcategory.name} 
                        to={subcategory.link}
                        className="block py-1 text-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 space-y-4">
              {isLoggedIn ? (
                <Link to="/profile" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                  <User size={20} />
                  <span>Mon compte</span>
                </Link>
              ) : (
                <Link to="/auth/login" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                  <User size={20} />
                  <span>Se connecter</span>
                </Link>
              )}
              
              <Link to="/panier" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={20} />
                <span>Panier</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
