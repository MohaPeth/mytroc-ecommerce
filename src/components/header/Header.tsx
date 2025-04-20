
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollProgress } from '@/lib/animations';
import { useScrollBehavior } from '@/hooks/useScrollBehavior';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useAuth } from '@/hooks/useAuth';
import TopBanner from './TopBanner';
import HeaderMain from './sections/HeaderMain';
import HeaderCategories from './sections/HeaderCategories';
import MobileMenu from './MobileMenu';
import { categoryStructure } from './data/categoryData';

const Header = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const { isScrolled } = useScrollBehavior();
  const scrollProgress = useScrollProgress();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/boutique?search=query');
    if (isOpen) closeMenu();
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Progress bar */}
      <div 
        className="h-0.5 bg-mytroc-primary fixed top-0 left-0 z-50 transition-all duration-300" 
        style={{ width: `${scrollProgress}%` }} 
      />
      
      <TopBanner />
      
      <HeaderMain 
        isScrolled={isScrolled}
        onMenuClick={toggleMenu}
        onSearchSubmit={handleSearchSubmit}
      />

      <HeaderCategories 
        isScrolled={isScrolled}
        categories={categoryStructure}
      />
      
      <MobileMenu 
        isOpen={isOpen} 
        onClose={closeMenu} 
        categories={categoryStructure}
      />
    </header>
  );
};

export default Header;
