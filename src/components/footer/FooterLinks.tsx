
import React from 'react';
import { ContactInfo } from './ContactInfo';
import { CategoryLinks } from './CategoryLinks';
import { CustomerServiceLinks } from './CustomerServiceLinks';

export const FooterLinks = () => {
  return (
    <>
      {/* Logo and Contact Section */}
      <ContactInfo />
      
      {/* Most Popular Categories */}
      <CategoryLinks />
      
      {/* Customer Services */}
      <CustomerServiceLinks />
    </>
  );
};
