
import React from 'react';
import { Phone } from 'lucide-react';

export const ContactInfo = () => {
  return (
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
  );
};
