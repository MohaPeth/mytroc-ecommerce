
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
  const links = [
    { href: "/boutique?category=mode-accessoire", label: "Mode et accessoire" },
    { href: "/boutique?category=maison-electromenager", label: "Maison et Electroménager" },
    { href: "/boutique?category=hightech", label: "HighTech" },
    { href: "/boutique?category=vehicule-immobilier", label: "Vehicule et immobilier" },
    { href: "/boutique?category=enfant-education", label: "Enfant et education" },
    { href: "/boutique?category=loisirs", label: "Loisirs" },
    { href: "/boutique?category=services", label: "Services" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Catégories populaires</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <LinkItem key={index} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
};
