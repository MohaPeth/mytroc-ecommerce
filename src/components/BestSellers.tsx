
import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  discount?: number;
  savings?: number;
  id: number;
}

const ProductCard = ({ title, price, oldPrice, image, discount, savings, id }: ProductCardProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "bg-gray-100 rounded-lg relative transition-all duration-500 hover:shadow-elevated",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      {discount && (
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
          <div>{discount}%</div>
          <div>OFF</div>
        </div>
      )}
      
      <Link to={`/produit/${id}`}>
        <div className="aspect-square overflow-hidden flex items-center justify-center p-4">
          <img src={image} alt={title} className="max-h-full object-contain" />
        </div>
      </Link>
      
      <div className="bg-white p-3 rounded-b-lg">
        <Link to={`/produit/${id}`}>
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          
          <div className="flex items-start gap-2 mb-2">
            <span className="font-bold">€{price.toFixed(0)}</span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-sm">€{oldPrice.toFixed(0)}</span>
            )}
          </div>
        </Link>
        
        {savings && (
          <div className="text-sm text-green-600 font-medium mb-2">
            Save - €{savings}
          </div>
        )}
        
        <button className="bg-green-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors float-right">
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
};

const BestSellers = () => {
  const products = [
    {
      id: 1,
      title: "Mini Frigo",
      price: 300,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Asus Zenbook",
      price: 1499,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Cafétière Moulinex",
      price: 1234,
      oldPrice: 2100,
      image: "/placeholder.svg",
      discount: 56,
      savings: 876,
    },
    {
      id: 4,
      title: "Brosse à dent",
      price: 324,
      oldPrice: 367,
      image: "/placeholder.svg",
      discount: 56,
      savings: 43,
    },
    {
      id: 5,
      title: "Accessoires douche",
      price: 944,
      oldPrice: 956,
      image: "/placeholder.svg",
      discount: 56,
      savings: 12,
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
              "text-xl font-medium text-gray-700 border-b-2 border-blue-500 pb-1",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Meilleures ventes du mois
          </h2>
          <Link to="/boutique" className="flex items-center text-blue-500 hover:underline">
            <span>Voir tout</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              discount={product.discount}
              savings={product.savings}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
