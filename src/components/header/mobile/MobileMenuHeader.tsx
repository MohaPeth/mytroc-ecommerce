
import React from 'react';
import { X } from 'lucide-react';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

const MobileMenuHeader = ({ onClose }: MobileMenuHeaderProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4 border-b border-gray-100">
      <h2 className="text-lg font-medium">Menu</h2>
      <button 
        onClick={onClose}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Fermer le menu"
      >
        <X size={24} className="text-gray-700" />
      </button>
    </div>
  );
};

export default MobileMenuHeader;
