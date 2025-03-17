
import React from 'react';
import { ServiceSection } from './ServiceSection';
import { FooterLinks } from './FooterLinks';
import { PaymentSection } from './PaymentSection';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-white pt-8 border-t border-gray-100">
      {/* Services Section */}
      <div className="container mx-auto px-4 mb-12">
        <ServiceSection />
      </div>

      {/* Main Footer */}
      <div className="bg-green-500 pt-12 pb-6 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <FooterLinks />
            <PaymentSection />
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
