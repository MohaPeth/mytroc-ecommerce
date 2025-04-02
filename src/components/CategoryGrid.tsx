
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  delay: number;
}

const CategoryCard = ({
  title,
  image,
  link,
  delay
}: CategoryCardProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <Link 
      to={link} 
      // @ts-ignore - ref type issue
      ref={ref} 
      className={cn(
        "category-card group block", 
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )} 
      style={{
        transitionDelay: `${delay * 0.1}s`
      }}
    >
      <div className="aspect-square overflow-hidden relative rounded-lg shadow-md">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <div className="flex items-center text-sm font-medium">
            <span>Découvrir</span>
            <ArrowRight size={16} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategoryGrid = () => {
  const categories = [
    {
      title: "Meubles & Déco",
      image: "/placeholder.svg",
      link: "/boutique?category=meubles-deco"
    },
    {
      title: "Électroménager",
      image: "/placeholder.svg",
      link: "/boutique?category=electromenager"
    },
    {
      title: "Ordinateurs & Périphériques",
      image: "/placeholder.svg",
      link: "/boutique?category=ordinateurs-peripheriques"
    },
    {
      title: "Téléphones & Tablettes",
      image: "/placeholder.svg",
      link: "/boutique?category=telephones-tablettes"
    },
    {
      title: "Vêtements & Chaussures",
      image: "/placeholder.svg",
      link: "/boutique?category=vetements-chaussures"
    },
    {
      title: "Véhicules",
      image: "/placeholder.svg",
      link: "/boutique?category=vehicules"
    },
    {
      title: "Bébés & Enfants",
      image: "/placeholder.svg",
      link: "/boutique?category=bebes-enfants"
    },
    {
      title: "Loisirs & Sport",
      image: "/placeholder.svg",
      link: "/boutique?category=loisirs-sport"
    }
  ];
  
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section className="py-16 px-4" ref={ref}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-mytroc-secondary pb-2">
          <h2 
            className={cn(
              "text-2xl font-semibold text-gray-700 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Explorez nos sous-catégories
          </h2>
          <Link to="/boutique" className="flex items-center text-mytroc-primary hover:underline">
            <span>Voir tout</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
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

export default CategoryGrid;
