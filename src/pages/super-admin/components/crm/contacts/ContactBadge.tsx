
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ContactBadgeProps {
  type: string;
  status?: string;
}

const ContactBadge: React.FC<ContactBadgeProps> = ({ type, status }) => {
  if (status) {
    return status === 'active' ? (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Actif</Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactif</Badge>
    );
  }

  switch (type) {
    case 'buyer':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Acheteur</Badge>;
    case 'seller':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vendeur</Badge>;
    case 'buyer_seller':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Acheteur/Vendeur</Badge>;
    default:
      return null;
  }
};

export default ContactBadge;
