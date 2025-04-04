
import React, { useState, useEffect } from 'react';
import { MenuIcon, X, Search, ShoppingCart, User, MapPin, Package, Tag } from 'lucide-react';
import { useScrollProgress } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';

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

  const categories = [
    { name: 'Boutique', link: '/boutique' },
    { name: 'Mode et accessoire', link: '/boutique?category=mode-accessoire' },
    { name: 'Maison et Electroménager', link: '/boutique?category=maison-electromenager' },
    { name: 'HighTech', link: '/boutique?category=hightech' },
    { name: 'Vehicule et immobilier', link: '/boutique?category=vehicule-immobilier' },
    { name: 'Enfant et education', link: '/boutique?category=enfant-education' },
    { name: 'Loisirs', link: '/boutique?category=loisirs' },
    { name: 'Services', link: '/boutique?category=services' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page with query parameter
    navigate('/boutique?search=query');
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Progress bar */}
      <div
        className="h-0.5 bg-mytroc-primary fixed top-0 left-0 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
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
              <button className="md:hidden mr-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} className="text-mytroc-darkgray" /> : <MenuIcon size={24} className="text-mytroc-darkgray" />}
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
                <input
                  type="text"
                  placeholder="Rechercher essentials, groceries et plus..."
                  className="mytroc-input pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 hover:bg-white focus:bg-white border border-gray-200"
                />
                <button type="submit" className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
                  <Search size={18} className="text-gray-400" />
                </button>
              </form>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-4 md:w-1/4 justify-end">
              {isLoggedIn ? (
                <Link to="/profile" className="hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                  <User size={20} />
                  <span className="text-sm">Mon compte</span>
                </Link>
              ) : (
                <Link to="/auth/login" className="hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                  <User size={20} />
                  <span className="text-sm">Créer un compte / Se connecter</span>
                </Link>
              )}
              
              <Link to="/panier" className="flex items-center space-x-1 text-mytroc-secondary hover:text-mytroc-primary">
                <ShoppingCart size={20} />
                <span className="hidden md:inline text-sm">Panier</span>
              </Link>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher..."
                className="mytroc-input pl-10 pr-4 py-2 w-full text-sm rounded-full bg-gray-100"
              />
              <button type="submit" className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
                <Search size={16} className="text-gray-400" />
              </button>
            </form>
          </div>
        </div>
      </nav>
      
      {/* Categories navbar */}
      <div className={cn("w-full bg-white border-t border-gray-100 shadow-subtle transition-all duration-300 ease-apple", isScrolled ? "py-1" : "py-2")}>
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-4 items-center whitespace-nowrap">
            {categories.map(category => (
              <Link
                key={category.name}
                to={category.link}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors"
              >
                {category.name === 'Boutique' ? (
                  <span className="bg-mytroc-secondary text-white py-2 px-3 rounded-lg flex items-center">
                    {category.name}
                    <svg 
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center">
                    {category.name}
                    <svg 
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 text-mytroc-secondary"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-apple pt-20", isOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {categories.map(category => (
              <Link
                key={category.name}
                to={category.link}
                className="text-xl font-medium py-2 border-b border-gray-100 flex justify-between items-center"
                onClick={() => setIsOpen(false)}
              >
                <span>{category.name}</span>
                <svg 
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-mytroc-secondary"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            ))}
            
            <div className="pt-4 space-y-4">
              <Link to="/livraison" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <MapPin size={20} className="text-green-500" />
                <span>Livraison</span>
              </Link>
              
              <Link to="/commande" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <Package size={20} className="text-green-500" />
                <span>Votre commande</span>
              </Link>
              
              <Link to="/offres" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <Tag size={20} className="text-green-500" />
                <span>Nos offres</span>
              </Link>
              
              {isLoggedIn ? (
                <Link to="/profile" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                  <User size={20} />
                  <span>Mon compte</span>
                </Link>
              ) : (
                <Link to="/auth/login" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                  <User size={20} />
                  <span>Créer un compte / Se connecter</span>
                </Link>
              )}
              
              <Link to="/panier" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={20} className="text-green-500" />
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
