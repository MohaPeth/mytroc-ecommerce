
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
    { href: "#", label: "Staples" },
    { href: "#", label: "Beverages" },
    { href: "#", label: "Personal Care" },
    { href: "#", label: "Home Care" },
    { href: "#", label: "Baby Care" },
    { href: "#", label: "Vegetables & Fruits" },
    { href: "#", label: "Snacks & Foods" },
    { href: "#", label: "Dairy & Bakery" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Most Popular Categories</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <LinkItem key={index} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
};
