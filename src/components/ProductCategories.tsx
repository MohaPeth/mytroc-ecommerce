
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  name: string;
  image: string;
  delay: number;
  href: string;
}

const CategoryItem = ({ name, image, delay, href }: CategoryItemProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <a 
      href={href}
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-3 transition-all duration-500 hover:scale-105",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="rounded-full border-2 border-mytroc-secondary p-0.5 sm:p-1 overflow-hidden">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          <img src={image} alt={name} className="w-3/4 h-3/4 object-contain" />
        </div>
      </div>
      <h3 className="text-xs sm:text-sm font-medium text-center leading-tight">{name}</h3>
    </a>
  );
};

const ProductCategories = () => {
  const categories = [
    {
      name: "Mode et accessoire",
      image: "/placeholder.svg",
      href: "/boutique?category=mode-accessoire"
    },
    {
      name: "Maison et Electroménager",
      image: "/placeholder.svg",
      href: "/boutique?category=maison-electromenager"
    },
    {
      name: "HighTech",
      image: "/placeholder.svg",
      href: "/boutique?category=hightech"
    },
    {
      name: "Vehicule et immobilier",
      image: "/placeholder.svg",
      href: "/boutique?category=vehicule-immobilier"
    },
    {
      name: "Enfant et education",
      image: "/placeholder.svg",
      href: "/boutique?category=enfant-education"
    },
    {
      name: "Loisirs",
      image: "/placeholder.svg",
      href: "/boutique?category=loisirs"
    },
    {
      name: "Services",
      image: "/placeholder.svg",
      href: "/boutique?category=services"
    }
  ];
  
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section className="py-8 sm:py-12 md:py-16 px-2 sm:px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 border-b border-mytroc-secondary pb-2">
          <h2 
            // @ts-ignore - ref type issue
            ref={ref}
            className={cn(
              "text-xl sm:text-2xl font-semibold text-gray-700 transition-all duration-700 mb-2 sm:mb-0",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Catégorie de produit
          </h2>
          <a href="/boutique" className="flex items-center text-mytroc-primary hover:underline text-sm sm:text-base">
            <span>Voir tout</span>
            <ArrowRight size={14} className="ml-1 sm:size-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              image={category.image}
              delay={index + 1}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
