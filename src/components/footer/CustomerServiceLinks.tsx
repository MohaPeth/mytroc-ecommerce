
import React from 'react';
import { Link } from 'react-router-dom';

interface LinkItemProps {
  href: string;
  label: string;
  internal?: boolean;
}

const LinkItem = ({ href, label, internal = false }: LinkItemProps) => (
  <li className="flex items-center space-x-2">
    <span className="text-white/80">•</span>
    {internal ? (
      <Link to={href} className="text-white/80 hover:text-white transition-colors">{label}</Link>
    ) : (
      <a href={href} className="text-white/80 hover:text-white transition-colors">{label}</a>
    )}
  </li>
);

export const CustomerServiceLinks = () => {
  const links = [
    { href: "#", label: "About Us" },
    { href: "/privacy-policy", label: "Conditions de confidentialité", internal: true },
    { href: "/faq", label: "FAQ", internal: true },
    { href: "#", label: "E-waste Policy" },
    { href: "#", label: "Cancellation & Return Policy" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Customer Services</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <LinkItem 
            key={index} 
            href={link.href} 
            label={link.label}
            internal={link.internal}
          />
        ))}
      </ul>
    </div>
  );
};
