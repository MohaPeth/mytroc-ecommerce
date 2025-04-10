
// Utility functions for the contacts module

/**
 * Format a date string to French format (DD/MM/YYYY)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

/**
 * Filter contacts based on search term, type and status
 */
export const filterContacts = (
  contacts: any[], 
  searchTerm: string, 
  selectedType: string, 
  selectedStatus: string
) => {
  return contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    
    const matchesType = selectedType === 'all' || contact.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
};
