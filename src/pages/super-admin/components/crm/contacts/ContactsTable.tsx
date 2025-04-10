
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import ContactRow from './ContactRow';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  lastActivity: string;
  notes: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  formatDate: (dateString: string) => string;
  onViewProfile: (contactId: string) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ 
  contacts, 
  formatDate, 
  onViewProfile 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Utilisateur</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Dernière activité</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <ContactRow 
            key={contact.id}
            contact={contact} 
            formatDate={formatDate} 
            onViewProfile={onViewProfile}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactsTable;
