
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Truck, CreditCard, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-bold text-2xl flex items-center text-mytroc-primary mb-4">
              <span className="text-mytroc-primary font-bold mr-1">My</span>
              <span className="text-mytroc-primary font-bold">Troc</span>
            </div>
            <p className="text-gray-600 mb-4">
              Votre spécialiste en électroménager, pièces détachées et produits déclassés à prix abordables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-mytroc-primary hover:text-mytroc-primary/80 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-mytroc-primary hover:text-mytroc-primary/80 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-mytroc-primary hover:text-mytroc-primary/80 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Gros Électroménager</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Petit Électroménager</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Meubles</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Jardin et Bricolage</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Images et son</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Pièces Détachées</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Dépannage</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Devis CAF</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Paiement en 3x sans frais</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mytroc-primary transition-colors">Livraison</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-mytroc-primary mr-2 mt-0.5" />
                <span className="text-gray-600">98 Boulevard de Ménilmontant 75020 PARIS</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-mytroc-primary mr-2" />
                <a href="tel:0143661931" className="text-gray-600 hover:text-mytroc-primary transition-colors">01 43 66 19 31</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-mytroc-primary mr-2" />
                <a href="mailto:contact@mytroc.fr" className="text-gray-600 hover:text-mytroc-primary transition-colors">contact@mytroc.fr</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-100">
          <div className="flex items-center justify-center md:justify-start">
            <Truck size={20} className="text-mytroc-primary mr-2" />
            <span className="text-gray-600">Livraison rapide partout en France</span>
          </div>
          <div className="flex items-center justify-center">
            <CreditCard size={20} className="text-mytroc-primary mr-2" />
            <span className="text-gray-600">Paiement sécurisé</span>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <ShieldCheck size={20} className="text-mytroc-primary mr-2" />
            <span className="text-gray-600">Garantie sur tous nos produits</span>
          </div>
        </div>
      </div>
      
      <div className="bg-mytroc-lightgray py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} MyTroc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
