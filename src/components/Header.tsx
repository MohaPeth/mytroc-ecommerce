
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
    { name: 'Boutique', link: '#' },
    { name: 'Meubles', link: '#' },
    { name: 'Gros Electroménager', link: '#' },
    { name: 'Petit Electroménager', link: '#' },
    { name: 'Appareils', link: '#' },
    { name: 'Jardin et Bricolage', link: '#' },
    { name: 'Loisirs', link: '#' },
    { name: 'Images et son', link: '#' },
    { name: 'Produits neufs déclassés', link: '#' },
  ];
  
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
          <div className="flex items-center space-x-1">
            <Truck size={14} className="text-mytroc-primary" />
            <span>Livraison</span>
          </div>
          <div className="flex items-center space-x-1">
            <Package size={14} className="text-mytroc-primary" />
            <span>Votre commande</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone size={14} className="text-mytroc-primary" />
            <span>Nos offres</span>
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
              <a href="/" className="flex items-center">
                <div className="font-bold text-2xl flex items-center text-mytroc-primary">
                  <span className="text-mytroc-primary font-bold mr-1">My</span>
                  <span className="text-mytroc-primary font-bold">Troc</span>
                </div>
              </a>
            </div>
            
            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Rechercher essentials, groceries et plus..." 
                  className="mytroc-input pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 hover:bg-white focus:bg-white border border-gray-200"
                />
                <Search size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <button className="mytroc-btn-primary">
                PIÈCES DÉTACHÉES
              </button>
              <button className="mytroc-btn-secondary">
                DEPANNAGE
              </button>
              <a href="#" className="hidden md:flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                <User size={20} />
                <span className="text-sm">Compte</span>
              </a>
              
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
              
              <a href="#" className="flex items-center space-x-1 text-mytroc-darkgray hover:text-mytroc-primary">
                <ShoppingCart size={20} />
                <span className="hidden md:inline text-sm">Panier</span>
              </a>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="mytroc-input pl-10 pr-4 py-2 w-full text-sm rounded-full bg-gray-100"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
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
              <a 
                key={category.name} 
                href={category.link}
                className="nav-item text-sm"
              >
                {category.name}
              </a>
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
              <a 
                key={category.name}
                href={category.link}
                className="text-xl font-medium py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </a>
            ))}
            <div className="pt-4 space-y-4">
              <button className="mytroc-btn-primary w-full">PIÈCES DÉTACHÉES</button>
              <button className="mytroc-btn-secondary w-full">DEPANNAGE</button>
              <a href="#" className="flex items-center space-x-2 py-2">
                <User size={20} />
                <span>Compte</span>
              </a>
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
