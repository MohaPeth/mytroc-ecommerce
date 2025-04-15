
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSubmit: (e: React.FormEvent) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input 
        type="text" 
        placeholder="Rechercher essentials, groceries et plus..." 
        className="mytroc-input pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 hover:bg-white focus:bg-white border border-gray-200" 
      />
      <button type="submit" className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
        <Search size={18} className="text-gray-400" />
      </button>
    </form>
  );
};

export default SearchBar;
