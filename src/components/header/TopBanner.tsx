
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, Tag } from 'lucide-react';

const TopBanner = () => {
  return (
    <div className="w-full bg-gray-100 py-2 px-4 text-sm flex items-center justify-between">
      <div className="hidden md:block">
        <span className="text-gray-600">Welcome to MyTroc</span>
      </div>
      <div className="md:hidden">
        <span className="text-xs text-gray-600">Welcome to MyTroc</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/livraison" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
          <MapPin size={16} className="text-green-500" />
          <span>Livraison</span>
        </Link>
        <Link to="/commande" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
          <Package size={16} className="text-green-500" />
          <span>Votre commande</span>
        </Link>
        <Link to="/offres" className="flex items-center space-x-1 text-gray-600 hover:text-mytroc-primary">
          <Tag size={16} className="text-green-500" />
          <span>Nos offres</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
