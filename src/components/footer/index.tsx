import React from 'react';
import { ServiceSection } from './ServiceSection';
import { FooterLinks } from './FooterLinks';
import { PaymentSection } from './PaymentSection';
import { Separator } from '@/components/ui/separator';
const Footer = () => {
  return <footer className="bg-white pt-6 sm:pt-8 border-t border-gray-100 py-0 my-0">
      {/* Services Section */}
      <div className="container mx-auto px-2 sm:px-4 mb-8 sm:mb-12">
        <ServiceSection />
      </div>

      {/* Main Footer */}
      <div className="bg-green-500 pt-8 sm:pt-12 pb-4 sm:pb-6 text-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <FooterLinks />
            <PaymentSection />
          </div>
          
          <Separator className="bg-white/20 my-4 sm:my-6" />
          
          <div className="text-center text-xs sm:text-sm text-white/80">
            <p>© {new Date().getFullYear()} tous droits réservés devpeth</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;