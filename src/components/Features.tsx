
import React from 'react';
import { Plane, Headphones, CreditCard, Package } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      // @ts-ignore - ref type issue
      ref={ref}
      className={cn(
        "bg-white rounded-xl p-6 shadow-subtle hover:shadow-elevated transition-all duration-500 flex flex-col items-center text-center",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="text-mytroc-primary mb-4 bg-mytroc-lightgray p-3 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Package size={32} />,
      title: "PIÈCES DÉTACHÉES FRANCE",
      description: "Grand choix de pièces pour appareils électroménager",
    },
    {
      icon: <Plane size={32} />,
      title: "PIÈCES DÉTACHÉES AFRIQUE",
      description: "Une base de données dédiée spécialement à l'Afrique",
    },
    {
      icon: <Headphones size={32} />,
      title: "6/7 SUPPORT",
      description: "Conseils, Service après vente. Contactez notre support de 10H à 19H",
    },
    {
      icon: <CreditCard size={32} />,
      title: "PAIEMENT EN 3 FOIS",
      description: "Des facilités de paiement. Paiement sécurisé. Devis en ligne.",
    }
  ];
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
