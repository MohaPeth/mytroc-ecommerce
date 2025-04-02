
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  name: string;
  image: string;
  link: string;
  delay: number;
}

const CategoryItem = ({ name, image, link, delay }: CategoryItemProps) => {
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
      <Link to={link} className="w-full h-full">
        <div className="rounded-full border-2 border-mytroc-secondary p-1 overflow-hidden hover:border-mytroc-primary transition-colors">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src={image} alt={name} className="w-3/4 h-3/4 object-contain" />
          </div>
        </div>
        <h3 className="text-sm font-medium text-center mt-2">{name}</h3>
      </Link>
    </div>
  );
};

const ProductCategories = () => {
  const categories = [
    {
      name: "Maison & Électroménager",
      image: "/placeholder.svg",
      link: "/boutique?category=maison-electromenager"
    },
    {
      name: "Électronique & High-Tech",
      image: "/placeholder.svg",
      link: "/boutique?category=electronique-hightech"
    },
    {
      name: "Mode & Accessoires",
      image: "/placeholder.svg",
      link: "/boutique?category=mode-accessoires"
    },
    {
      name: "Véhicules & Immobilier",
      image: "/placeholder.svg",
      link: "/boutique?category=vehicules-immobilier"
    },
    {
      name: "Enfants & Éducation",
      image: "/placeholder.svg",
      link: "/boutique?category=enfants-education"
    },
    {
      name: "Loisirs & Services",
      image: "/placeholder.svg",
      link: "/boutique?category=loisirs-services"
    },
    {
      name: "Dons & Gratuité",
      image: "/placeholder.svg",
      link: "/boutique?category=dons-gratuite"
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
            Catégories de produits
          </h2>
          <Link to="/boutique" className="flex items-center text-mytroc-primary hover:underline">
            <span>Voir tout</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              image={category.image}
              link={category.link}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
