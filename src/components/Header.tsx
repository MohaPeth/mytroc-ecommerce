
import React, { useState, useEffect } from 'react';
import { MenuIcon, X, Search, ShoppingCart, User, Truck, Package, Phone, Bell } from 'lucide-react';
import { useScrollProgress } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollProgress = useScrollProgress();
  const navigate = useNavigate();
  // Mock unread notifications count - in a real app, this would come from your API/state management
  const unreadNotificationsCount = 4;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const categories = [
    { name: 'Boutique', link: '/boutique' },
    { name: 'Meubles', link: '/boutique?category=meubles' },
    { name: 'Gros Electroménager', link: '/boutique?category=gros-electromenager' },
    { name: 'Petit Electroménager', link: '/boutique?category=petit-electromenager' },
    { name: 'Appareils', link: '/boutique?category=appareils' },
    { name: 'Jardin et Bricolage', link: '/boutique?category=jardin-bricolage' },
    { name: 'Loisirs', link: '/boutique?category=loisirs' },
    { name: 'Images et son', link: '/boutique?category=image-son' },
    { name: 'Produits neufs déclassés', link: '/boutique?category=declasses' },
  ];
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page with query parameter
    // In a real app, you would get the value from the input
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
      <div className="w-full bg-gray-100 py-1.5 px-4 text-sm flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/checkout/livraison" className="flex items-center space-x-1 hover:text-mytroc-primary">
            <Truck size={14} className="text-mytroc-primary" />
            <span>Livraison</span>
          </Link>
          <Link to="/checkout/confirmation" className="flex items-center space-x-1 hover:text-mytroc-primary">
            <Package size={14} className="text-mytroc-primary" />
            <span>Votre commande</span>
          </Link>
          <div className="flex items-center space-x-1">
            <Phone size={14} className="text-mytroc-primary" />
            <span>01 43 66 19 31</span>
          </div>
        </div>
        <div className="md:hidden">
          <span className="text-xs">MyTroc - 01 43 66 19 31</span>
        </div>
        <div className="hidden md:block">
          <span>98 Boulevard de Ménilmontant 75020 PARIS</span>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className={cn(
        "w-full bg-white transition-all duration-300 ease-apple",
        isScrolled ? "py-2 shadow-subtle" : "py-3"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and hamburger */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 focus:outline-none" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X size={24} className="text-mytroc-darkgray" />
                ) : (
                  <MenuIcon size={24} className="text-mytroc-darkgray" />
                )}
              </button>
              <Link to="/" className="flex items-center">
                <div className="font-bold text-2xl flex items-center text-mytroc-primary">
                  <span className="text-mytroc-primary font-bold mr-1">My</span>
                  <span className="text-mytroc-primary font-bold">Troc</span>
                </div>
              </Link>
            </div>
            
            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
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
            <div className="flex items-center space-x-1 md:space-x-4">
              <button className="mytroc-btn-primary">
                PIÈCES DÉTACHÉES
              </button>
              <button className="mytroc-btn-secondary">
                DEPANNAGE
              </button>
              <Link to="/profile" className="hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                <User size={20} />
                <span className="text-sm">Compte</span>
              </Link>
              
              {/* Notification Icon */}
              <Link 
                to="/notifications" 
                className="relative hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary"
              >
                <Bell size={20} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
                <span className="text-sm">Notifications</span>
              </Link>
              
              <Link to="/checkout/informations" className="flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
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
      <div className={cn(
        "w-full bg-white border-t border-gray-100 shadow-subtle transition-all duration-300 ease-apple",
        isScrolled ? "py-1" : "py-2"
      )}>
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-1 md:space-x-4 items-center whitespace-nowrap">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.link}
                className="nav-item text-sm"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-apple pt-20",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="text-xl font-medium py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="pt-4 space-y-4">
              <button className="mytroc-btn-primary w-full">PIÈCES DÉTACHÉES</button>
              <button className="mytroc-btn-secondary w-full">DEPANNAGE</button>
              <Link to="/profile" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <User size={20} />
                <span>Compte</span>
              </Link>
              {/* Mobile notification link */}
              <Link to="/notifications" className="flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                <div className="relative">
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
                <span>Notifications</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
