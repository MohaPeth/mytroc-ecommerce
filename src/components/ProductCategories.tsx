
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  name: string;
  image: string;
  link: string;
}

const CategoryItem = ({ name, image, link }: CategoryItemProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-2 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <Link to={link} className="w-full h-full flex flex-col items-center">
        <div className="rounded-full border-2 border-green-500 p-1 overflow-hidden">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src={image} alt={name} className="w-3/4 h-3/4 object-contain" />
          </div>
        </div>
        <h3 className="text-sm text-center mt-2">{name}</h3>
      </Link>
    </div>
  );
};

const ProductCategories = () => {
  const categories = [
    {
      name: "Mobile",
      image: "/placeholder.svg",
      link: "/boutique?category=mobile"
    },
    {
      name: "Cosmetics",
      image: "/placeholder.svg",
      link: "/boutique?category=cosmetics"
    },
    {
      name: "Electronics",
      image: "/placeholder.svg",
      link: "/boutique?category=electronics"
    },
    {
      name: "Furniture",
      image: "/placeholder.svg",
      link: "/boutique?category=furniture"
    },
    {
      name: "Watches",
      image: "/placeholder.svg",
      link: "/boutique?category=watches"
    },
    {
      name: "Decor",
      image: "/placeholder.svg",
      link: "/boutique?category=decor"
    },
    {
      name: "Accessories",
      image: "/placeholder.svg",
      link: "/boutique?category=accessories"
    },
  ];
  
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 
            // @ts-ignore - ref type issue
            ref={ref}
            className={cn(
              "text-xl font-medium text-gray-700 border-b-2 border-green-500 pb-1",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Catégorie de produit
          </h2>
          <Link to="/boutique" className="flex items-center text-green-600 hover:underline">
            <span>View All</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
