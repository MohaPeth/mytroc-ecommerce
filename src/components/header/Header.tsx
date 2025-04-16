
import React, { useState, useEffect } from 'react';
import { MenuIcon, X, User, ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useScrollProgress } from '@/lib/animations';
import { cn } from '@/lib/utils';

import TopBanner from './TopBanner';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollProgress = useScrollProgress();
  const navigate = useNavigate();

  const categoryStructure = [
    {
      name: 'Boutique',
      link: '/boutique',
      subcategories: []
    },
    {
      name: 'Mode et accessoire',
      link: '/boutique?category=mode-accessoire',
      subcategories: [
        { name: 'Vêtements & Chaussures', link: '/boutique?subcategory=vetements-chaussures' },
        { name: 'Accessoires', link: '/boutique?subcategory=accessoires' }
      ]
    },
    {
      name: 'Maison et Electroménager',
      link: '/boutique?category=maison-electromenager',
      subcategories: [
        { name: 'Meubles & Déco', link: '/boutique?subcategory=meubles-deco' },
        { name: 'Électroménager', link: '/boutique?subcategory=electromenager' },
        { name: 'Bricolage & Jardinage', link: '/boutique?subcategory=bricolage-jardinage' }
      ]
    },
    {
      name: 'HighTech',
      link: '/boutique?category=hightech',
      subcategories: [
        { name: 'Téléphones & Tablettes', link: '/boutique?subcategory=telephones-tablettes' },
        { name: 'Ordinateurs & Périphériques', link: '/boutique?subcategory=ordinateurs-peripheriques' },
        { name: 'Audiovisuel', link: '/boutique?subcategory=audiovisuel' },
        { name: 'Photographie & Vidéo', link: '/boutique?subcategory=photographie-video' },
        { name: 'Accessoires High-Tech', link: '/boutique?subcategory=accessoires-hightech' }
      ]
    },
    {
      name: 'Vehicule et immobilier',
      link: '/boutique?category=vehicule-immobilier',
      subcategories: [
        { name: 'Véhicules', link: '/boutique?subcategory=vehicules' },
        { name: 'Immobilier', link: '/boutique?subcategory=immobilier' }
      ]
    },
    {
      name: 'Enfant et education',
      link: '/boutique?category=enfant-education',
      subcategories: [
        { name: 'Bébés & Enfants', link: '/boutique?subcategory=bebes-enfants' },
        { name: 'Livres & Fournitures', link: '/boutique?subcategory=livres-fournitures' },
        { name: 'Matériel éducatif', link: '/boutique?subcategory=materiel-educatif' }
      ]
    },
    {
      name: 'Loisirs',
      link: '/boutique?category=loisirs',
      subcategories: [
        { name: 'Loisirs & Sport', link: '/boutique?subcategory=loisirs-sport' },
        { name: 'Emploi & Services', link: '/boutique?subcategory=emploi-services' },
        { name: 'Produits Pro & Artisanaux', link: '/boutique?subcategory=produits-pro-artisanaux' }
      ]
    },
    {
      name: 'Services',
      link: '/boutique?category=services',
      subcategories: []
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkLoginStatus = () => {
      const userData = localStorage.getItem('mytroc-user');
      setIsLoggedIn(userData !== null && JSON.parse(userData).isLoggedIn === true);
    };

    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);
    
    // Important: Bloquer le scroll du body quand le menu mobile est ouvert
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
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
      
      {/* Main navigation */}
      <nav className={cn("w-full bg-white transition-all duration-300 ease-apple", 
        isScrolled ? "py-2 shadow-subtle" : "py-3"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and hamburger */}
            <div className="flex items-center md:w-1/4">
              <button 
                className="md:hidden mr-2 focus:outline-none"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setIsOpen(!isOpen)}
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
              <SearchBar onSubmit={handleSearchSubmit} />
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
            <SearchBar onSubmit={handleSearchSubmit} />
          </div>
        </div>
      </nav>
      
      {/* Categories navbar - Hidden on mobile */}
      <div className={cn(
        "w-full bg-white border-t border-gray-100 shadow-subtle transition-all duration-300 ease-apple hidden md:block", 
        isScrolled ? "py-1" : "py-2"
      )}>
        <div className="container mx-auto px-4 overflow-x-auto">
          <CategoryMenu categories={categoryStructure} />
        </div>
      </div>

      {/* Mobile menu */}
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
