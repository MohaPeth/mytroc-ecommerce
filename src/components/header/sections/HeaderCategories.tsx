
import React from 'react';
import { cn } from '@/lib/utils';
import CategoryMenu from '../CategoryMenu';
import { Category } from '../types';

interface HeaderCategoriesProps {
  isScrolled: boolean;
  categories: Category[];
}

const HeaderCategories = ({ isScrolled, categories }: HeaderCategoriesProps) => {
  return (
    <div className={cn(
      "w-full bg-white border-t border-gray-100 shadow-subtle transition-all duration-300 ease-apple hidden md:block", 
      isScrolled ? "py-1" : "py-2"
    )}>
      <div className="container mx-auto px-4 overflow-x-auto">
        <CategoryMenu categories={categories} />
      </div>
    </div>
  );
};

export default HeaderCategories;
