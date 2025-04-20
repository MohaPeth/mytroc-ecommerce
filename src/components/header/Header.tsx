
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollProgress } from '@/lib/animations';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useScrollBehavior } from '@/hooks/useScrollBehavior';
import TopBanner from './TopBanner';
import HeaderMain from './sections/HeaderMain';
import HeaderCategories from './sections/HeaderCategories';
import MobileMenu from './MobileMenu';
import { categoryStructure } from './data/categoryData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuthStatus();
  const { isScrolled } = useScrollBehavior();
  const scrollProgress = useScrollProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/boutique?search=query');
    if (isOpen) setIsOpen(false);
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
        isLoggedIn={isLoggedIn}
        onMenuClick={() => setIsOpen(!isOpen)}
        onSearchSubmit={handleSearchSubmit}
      />

      <HeaderCategories 
        isScrolled={isScrolled}
        categories={categoryStructure}
      />
      
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        categories={categoryStructure}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
};

export default Header;
