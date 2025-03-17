
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  delay: number;
}

const CategoryCard = ({ title, image, link, delay }: CategoryCardProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <a 
      href={link}
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "category-card group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="aspect-square overflow-hidden relative">
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
    </a>
  );
};

const CategoryGrid = () => {
  const categories = [
    {
      title: "Gros Électroménager",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Petit Électroménager",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Meubles",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Appareils",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Jardin et Bricolage",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Loisirs",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Images et son",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Produits neufs déclassés",
      image: "/placeholder.svg",
      link: "#",
    },
  ];
  
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section className="py-16 px-4 bg-mytroc-lightgray">
      <div className="container mx-auto">
        <div 
          // @ts-ignore - ref type issue
          ref={ref}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl font-bold mb-4">Nos Catégories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits de qualité à des prix compétitifs
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
