
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, User, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import SearchBar from '../SearchBar';
import UserDropdownMenu from '../UserDropdownMenu';

interface HeaderMainProps {
  isScrolled: boolean;
  isLoggedIn?: boolean; // Make this optional since we use useAuth() hook
  onMenuClick: () => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const HeaderMain = ({ isScrolled, onMenuClick, onSearchSubmit }: HeaderMainProps) => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
  return (
    <nav className={`w-full bg-white transition-all duration-300 ease-apple ${isScrolled ? "py-2 shadow-subtle" : "py-3"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and hamburger */}
          <div className="flex items-center md:w-1/4">
            <button 
              className="md:hidden mr-2 focus:outline-none" 
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <MenuIcon size={24} className="text-mytroc-darkgray" />
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
            <SearchBar onSubmit={onSearchSubmit} />
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-4 md:w-1/4 justify-end">
            {isLoggedIn ? (
              <UserDropdownMenu />
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
          <SearchBar onSubmit={onSearchSubmit} />
        </div>
      </div>
    </nav>
  );
};

export default HeaderMain;
