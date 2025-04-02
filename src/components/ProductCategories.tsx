
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  name: string;
  image: string;
  delay: number;
}

const CategoryItem = ({ name, image, delay }: CategoryItemProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-3 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="rounded-full border-2 border-mytroc-secondary p-1 overflow-hidden">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          <img src={image} alt={name} className="w-3/4 h-3/4 object-contain" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-center">{name}</h3>
    </div>
  );
};

const ProductCategories = () => {
  const categories = [
    {
      name: "Mobile",
      image: "/placeholder.svg",
    },
    {
      name: "Cosmetiques",
      image: "/placeholder.svg",
    },
    {
      name: "Electroménagers",
      image: "/placeholder.svg",
    },
    {
      name: "Meubles",
      image: "/placeholder.svg",
    },
    {
      name: "Montres",
      image: "/placeholder.svg",
    },
    {
      name: "Decor",
      image: "/placeholder.svg",
    },
    {
      name: "Accessoires",
      image: "/placeholder.svg",
    },
  ];
  
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-mytroc-secondary pb-2">
          <h2 
            // @ts-ignore - ref type issue
            ref={ref}
            className={cn(
              "text-2xl font-semibold text-gray-700 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Catégorie de produit
          </h2>
          <a href="#" className="flex items-center text-mytroc-primary hover:underline">
            <span>View All</span>
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              image={category.image}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
