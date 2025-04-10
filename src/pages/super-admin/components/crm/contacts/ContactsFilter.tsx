
import React from 'react';
import { Button } from '@/components/ui/button';

interface ContactsFilterProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const ContactsFilter: React.FC<ContactsFilterProps> = ({ 
  selectedType, 
  setSelectedType 
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={() => setSelectedType('all')} 
        className={selectedType === 'all' ? 'bg-primary text-primary-foreground' : ''}
      >
        Tous
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setSelectedType('buyer')} 
        className={selectedType === 'buyer' ? 'bg-primary text-primary-foreground' : ''}
      >
        Acheteurs
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setSelectedType('seller')} 
        className={selectedType === 'seller' ? 'bg-primary text-primary-foreground' : ''}
      >
        Vendeurs
      </Button>
    </div>
  );
};

export default ContactsFilter;
