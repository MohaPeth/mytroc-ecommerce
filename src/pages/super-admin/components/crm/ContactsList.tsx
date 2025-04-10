
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Import refactored components
import ContactsFilter from './contacts/ContactsFilter';
import ContactsTable from './contacts/ContactsTable';
import ContactsPagination from './contacts/ContactsPagination';
import { CONTACTS_DATA } from './contacts/contactsData';
import { formatDate, filterContacts } from './contacts/contactsUtils';

interface ContactsListProps {
  searchTerm: string;
  setActiveTab?: (tab: string) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ searchTerm, setActiveTab }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Handler for viewing user profile
  const handleViewProfile = (contactId: string) => {
    console.log(`Viewing profile for contact ID: ${contactId}`);
    // Navigate to profiles tab if setActiveTab is provided
    if (setActiveTab) {
      setActiveTab('profiles');
    }
  };

  // Filter contacts based on search term, type and status
  const filteredContacts = filterContacts(
    CONTACTS_DATA,
    searchTerm,
    selectedType,
    selectedStatus
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestion des contacts</CardTitle>
              <CardDescription>
                Liste des utilisateurs enregistrés sur la plateforme
              </CardDescription>
            </div>
            <ContactsFilter 
              selectedType={selectedType} 
              setSelectedType={setSelectedType} 
            />
          </div>
        </CardHeader>
        <CardContent>
          <ContactsTable 
            contacts={filteredContacts} 
            formatDate={formatDate} 
            onViewProfile={handleViewProfile} 
          />
        </CardContent>
      </Card>
      <ContactsPagination 
        totalContacts={CONTACTS_DATA.length} 
        filteredCount={filteredContacts.length} 
      />
    </div>
  );
};

export default ContactsList;
