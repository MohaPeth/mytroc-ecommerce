
import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  discount?: string;
  savings?: string;
  delay: number;
}

const ProductCard = ({ title, price, oldPrice, image, discount, savings, delay }: ProductCardProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 relative transition-all duration-500 hover:shadow-elevated border border-gray-100",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      {discount && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-mytroc-accent text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs font-medium z-10">
          <div className="font-bold">{discount}</div>
          <div>OFF</div>
        </div>
      )}
      
      <div className="aspect-square overflow-hidden flex items-center justify-center mb-3 sm:mb-4">
        <img src={image} alt={title} className="max-h-full object-contain" />
      </div>
      
      <div className="mb-2">
        <h3 className="text-xs sm:text-sm font-medium line-clamp-2 h-8 sm:h-10 leading-tight">{title}</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-semibold text-sm sm:text-base">{price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-xs sm:text-sm">{oldPrice}</span>
          )}
        </div>
        <button className="text-mytroc-primary bg-mytroc-lightgray p-1 sm:p-1.5 rounded-md hover:bg-mytroc-primary hover:text-white transition-colors">
          <ShoppingCart size={16} className="sm:size-[18px]" />
        </button>
      </div>
      
      {savings && (
        <div className="text-mytroc-secondary text-xs sm:text-sm font-medium mt-2">
          Save - {savings}
        </div>
      )}
    </div>
  );
};

const BestSellers = () => {
  const products = [
    {
      title: "Mini Frigo",
      price: "€300",
      image: "/placeholder.svg",
    },
    {
      title: "Asus Zenbook",
      price: "€1499",
      image: "/placeholder.svg",
    },
    {
      title: "Cafétière Moulinex",
      price: "€1234",
      oldPrice: "€100",
      image: "/placeholder.svg",
      discount: "56%",
      savings: "€876",
    },
    {
      title: "Brosse à dent",
      price: "€324",
      oldPrice: "€132",
      image: "/placeholder.svg",
      discount: "56%",
      savings: "43€",
    },
    {
      title: "Accesoires douche",
      price: "€944",
      oldPrice: "€43",
      image: "/placeholder.svg",
      discount: "56%",
      savings: "12€",
    },
  ];
  
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section className="py-8 sm:py-12 md:py-16 px-2 sm:px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-mytroc-primary pb-2">
          <h2 
            // @ts-ignore - ref type issue
            ref={ref}
            className={cn(
              "text-xl sm:text-2xl font-semibold text-gray-700 transition-all duration-700 mb-2 sm:mb-0",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Meilleures ventes du mois
          </h2>
          <a href="#" className="flex items-center text-mytroc-primary hover:underline text-sm sm:text-base">
            <span>Voir tout</span>
            <ArrowRight size={14} className="ml-1 sm:size-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              discount={product.discount}
              savings={product.savings}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
