
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
    { href: "/boutique", label: "Boutique" },
    { href: "/billets-evenements", label: "Billets/Événements" },
    { href: "/boutique?category=mode-accessoire", label: "Mode et accessoire" },
    { href: "/boutique?category=maison-electromenager", label: "Maison et Electroménager" },
    { href: "/boutique?category=hightech", label: "HighTech" },
    { href: "/boutique?category=vehicule-immobilier", label: "Vehicule et immobilier" },
    { href: "/boutique?category=enfant-education", label: "Enfant et education" },
    { href: "/boutique?category=loisirs", label: "Loisirs" },
    { href: "/boutique?category=services", label: "Services" }
  ];

  const subcategories = [
    { href: "/boutique?subcategory=vetements-chaussures", label: "Vêtements & Chaussures" },
    { href: "/boutique?subcategory=meubles-deco", label: "Meubles & Déco" },
    { href: "/boutique?subcategory=telephones-tablettes", label: "Téléphones & Tablettes" },
    { href: "/boutique?subcategory=vehicules", label: "Véhicules" },
    { href: "/boutique?subcategory=bebes-enfants", label: "Bébés & Enfants" },
    { href: "/boutique?subcategory=loisirs-sport", label: "Loisirs & Sport" },
    { href: "/billets-evenements?subcategory=concerts", label: "Concerts" },
    { href: "/billets-evenements?subcategory=festivals", label: "Festivals" },
    { href: "/billets-evenements?subcategory=theatre", label: "Théâtre" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Catégories populaires</h3>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <LinkItem key={`category-${index}`} href={category.href} label={category.label} />
        ))}
      </ul>
      
      <h3 className="font-semibold text-xl mb-4 mt-6 border-b border-white/20 pb-2">Sous-catégories populaires</h3>
      <ul className="space-y-3">
        {subcategories.map((subcategory, index) => (
          <LinkItem key={`subcategory-${index}`} href={subcategory.href} label={subcategory.label} />
        ))}
      </ul>
    </div>
  );
};
