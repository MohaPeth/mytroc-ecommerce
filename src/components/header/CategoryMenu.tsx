
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Category {
  name: string;
  link: string;
  subcategories: { name: string; link: string; }[];
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4 items-center whitespace-nowrap">
      {categories.map(category => (
        <div key={category.name} className="relative group">
          {category.subcategories.length > 0 ? (
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors"
                  onClick={() => navigate(category.link)}
                >
                  {category.name === 'Boutique' ? (
                    <span className="bg-mytroc-secondary text-white py-2 px-3 rounded-lg flex items-center">
                      {category.name}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {category.name}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-mytroc-secondary">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-64 rounded-xl shadow-elevated bg-white">
                <div className="py-2">
                  <div className="font-medium px-4 py-2 text-mytroc-primary border-b border-gray-100">
                    {category.name}
                  </div>
                  <ul className="mt-2">
                    {category.subcategories.map(subcategory => (
                      <li key={subcategory.name}>
                        <Link 
                          to={subcategory.link} 
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link 
              to={category.link} 
              className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors"
            >
              {category.name === 'Boutique' ? (
                <span className="bg-mytroc-secondary text-white py-2 px-3 rounded-lg flex items-center">
                  {category.name}
                </span>
              ) : (
                <span className="flex items-center">
                  {category.name}
                </span>
              )}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
