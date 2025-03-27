import React from 'react';
import { Truck, Wrench, RefreshCw, ShieldCheck, Home } from 'lucide-react';
interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}
const ServiceItem = ({
  icon,
  title,
  description,
  isLast = false
}: ServiceItemProps) => <div className={`flex flex-col items-center p-6 text-center ${!isLast ? 'border-r border-gray-200' : ''}`}>
    <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full mb-3">
      {icon}
    </div>
    <h3 className="font-bold text-gray-700 uppercase mb-1 text-xs">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>;
export const ServiceSection = () => {
  const services = [{
    icon: <Truck className="text-white" size={24} />,
    title: "LIVRAISON OFFERTE",
    description: "Partout en France"
  }, {
    icon: <Wrench className="text-white" size={24} />,
    title: "GARANTIE",
    description: "Réparation de vos appareils en illimité"
  }, {
    icon: <RefreshCw className="text-white" size={24} />,
    title: "SATISFAIT OU REMBOURSÉ",
    description: "15 jours pour changer d'avis"
  }, {
    icon: <ShieldCheck className="text-white" size={24} />,
    title: "SERVICE APRÈS VENTE",
    description: "Dans chaque magasin et à domicile"
  }, {
    icon: <Home className="text-white" size={24} />,
    title: "DRIVE",
    description: "Pour toute commande sur Nesri.com"
  }];
  return <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 rounded-lg overflow-hidden">
      {services.map((service, index) => <ServiceItem key={index} icon={service.icon} title={service.title} description={service.description} isLast={index === services.length - 1} />)}
    </div>;
};