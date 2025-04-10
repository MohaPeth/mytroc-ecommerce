
import React from 'react';
import { Button } from '@/components/ui/button';

interface ContactsPaginationProps {
  totalContacts: number;
  filteredCount: number;
}

const ContactsPagination: React.FC<ContactsPaginationProps> = ({ 
  totalContacts, 
  filteredCount 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Affichage de {filteredCount} contact(s) sur {totalContacts}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={true}>Précédent</Button>
        <Button variant="outline" size="sm" disabled={true}>Suivant</Button>
      </div>
    </div>
  );
};

export default ContactsPagination;
