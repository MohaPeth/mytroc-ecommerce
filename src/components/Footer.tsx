
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Truck, CreditCard, ShieldCheck, Wrench, RefreshCw, Home } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-white pt-8 border-t border-gray-100">
      {/* Services Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 rounded-lg overflow-hidden">
          <div className="flex flex-col items-center p-6 text-center border-r border-gray-200">
            <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full mb-3">
              <Truck className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-700 uppercase mb-1">LIVRAISON OFFERTE</h3>
            <p className="text-sm text-gray-600">Partout en France</p>
          </div>
          
          <div className="flex flex-col items-center p-6 text-center border-r border-gray-200">
            <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full mb-3">
              <Wrench className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-700 uppercase mb-1">GARANTIE</h3>
            <p className="text-sm text-gray-600">Réparation de vos appareils en illimité</p>
          </div>
          
          <div className="flex flex-col items-center p-6 text-center border-r border-gray-200">
            <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full mb-3">
              <RefreshCw className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-700 uppercase mb-1">SATISFAIT OU REMBOURSÉ</h3>
            <p className="text-sm text-gray-600">15 jours pour changer d'avis</p>
          </div>
          
          <div className="flex flex-col items-center p-6 text-center border-r border-gray-200">
            <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full mb-3">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-700 uppercase mb-1">SERVICE APRÈS VENTE</h3>
            <p className="text-sm text-gray-600">Dans chaque magasin et à domicile</p>
          </div>
          
          <div className="flex flex-col items-center p-6 text-center">
            <div className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full mb-3">
              <Home className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-700 uppercase mb-1">DRIVE</h3>
            <p className="text-sm text-gray-600">Pour toute commande sur Nesri.com</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-green-500 pt-12 pb-6 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Contact Section */}
            <div className="space-y-6">
              <div className="font-bold text-2xl flex items-center mb-4">
                <span className="font-bold mr-1">My</span>
                <span className="font-bold">Troc</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-xl mb-3">Contact Us</h3>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a href="tel:+33123223455" className="text-white/80 hover:text-white">+33 123 223 4 55</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a href="tel:+33123223455" className="text-white/80 hover:text-white">+33 123 223 4 55</a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-xl mb-2">Download App</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="bg-black rounded-lg px-4 py-2 flex items-center justify-center">
                    <img src="/lovable-uploads/78efde4f-a019-4598-ab31-67e12abbd85f.png" alt="App Store" className="h-8" />
                  </a>
                  <a href="#" className="bg-black rounded-lg px-4 py-2 flex items-center justify-center">
                    <img src="/lovable-uploads/78efde4f-a019-4598-ab31-67e12abbd85f.png" alt="Google Play" className="h-8" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Most Popular Categories */}
            <div className="space-y-6">
              <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Most Popular Categories</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Staples</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Beverages</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Personal Care</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Home Care</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Baby Care</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Vegetables & Fruits</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Snacks & Foods</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Dairy & Bakery</a>
                </li>
              </ul>
            </div>
            
            {/* Customer Services */}
            <div className="space-y-6">
              <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Customer Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Terms & Conditions</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">FAQ</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">E-waste Policy</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white/80">•</span>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Cancellation & Return Policy</a>
                </li>
              </ul>
            </div>
            
            {/* Payment Information */}
            <div className="space-y-6">
              <h3 className="font-semibold text-xl mb-4 border-b border-white/20 pb-2">Payment Methods</h3>
              <p className="text-white/80 mb-4">
                Par virement bancaire ou postal en précisant nos coordonnées bancaires : 
                <a href="#" className="text-white ml-1 underline">RIB</a>
              </p>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-md p-2 flex items-center justify-center">
                    <CreditCard className="text-gray-400" size={24} />
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-white/70">
                Les clients utilisant un terminal ou une plateforme de paiement Viva Wallet en combinaison avec un compte professionnel et une carte de débit d'entreprise peuvent accepter les paiements avec des frais d'acquisition à 0%.
              </p>
            </div>
          </div>
          
          <Separator className="bg-white/20 my-6" />
          
          <div className="text-center text-sm text-white/80">
            <p>© {new Date().getFullYear()} tous droits réservés devpeth</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

