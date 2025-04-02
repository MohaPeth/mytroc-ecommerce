
import React from 'react';

interface LinkItemProps {
  href: string;
  label: string;
}

const LinkItem = ({ href, label }: LinkItemProps) => (
  <li className="flex items-center space-x-2">
    <span className="text-white/80">•</span>
    <a href={href} className="text-white/80 hover:text-white transition-colors">{label}</a>
  </li>
);

export const CategoryLinks = () => {
  const categories = [
    // Maison & Électroménager
    { href: "/boutique?category=meubles-deco", label: "Meubles & Déco" },
    { href: "/boutique?category=electromenager", label: "Électroménager" },
    { href: "/boutique?category=bricolage-jardinage", label: "Bricolage & Jardinage" },
    
    // Électronique & High-Tech
    { href: "/boutique?category=telephones-tablettes", label: "Téléphones & Tablettes" },
    { href: "/boutique?category=ordinateurs-peripheriques", label: "Ordinateurs & Périphériques" },
    { href: "/boutique?category=audiovisuel", label: "Audiovisuel" },
    
    // Mode & Accessoires
    { href: "/boutique?category=vetements-chaussures", label: "Vêtements & Chaussures" },
    { href: "/boutique?category=accessoires-mode", label: "Accessoires de Mode" },
    
    // Enfants & Éducation
    { href: "/boutique?category=bebes-enfants", label: "Bébés & Enfants" },
    { href: "/boutique?category=livres-fournitures", label: "Livres & Fournitures" },
    
    // Loisirs
    { href: "/boutique?category=loisirs-sport", label: "Loisirs & Sport" },
    { href: "/boutique?category=produits-artisanaux", label: "Produits Artisanaux" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Catégories Populaires</h3>
      <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        {categories.map((link, index) => (
          <LinkItem key={index} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
};
