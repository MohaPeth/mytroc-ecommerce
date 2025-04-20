
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Category {
  name: string;
  link: string;
  subcategories: { name: string; link: string; }[];
}

interface MobileMenuCategoryProps {
  category: Category;
  icon: any;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MobileMenuCategory = ({ category, icon: IconComponent, onLinkClick }: MobileMenuCategoryProps) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      {category.subcategories.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={category.name} className="border-0">
            <AccordionTrigger className="py-3 px-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <IconComponent size={20} className="text-mytroc-secondary flex-shrink-0" />
                <span className="font-medium text-left">{category.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="pl-9 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.name}>
                    <Link 
                      to={subcategory.link}
                      className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={onLinkClick}
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link 
          to={category.link}
          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
          onClick={onLinkClick}
        >
          <IconComponent size={20} className="text-mytroc-secondary flex-shrink-0" />
          <span className="font-medium">{category.name}</span>
        </Link>
      )}
    </div>
  );
};

export default MobileMenuCategory;
