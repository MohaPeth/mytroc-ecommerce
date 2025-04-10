
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Edit, Trash, Tag, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for contacts
const CONTACTS_DATA = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    type: 'buyer',
    status: 'active',
    lastActivity: '2025-04-08',
    notes: 'Cliente régulière, préfère les articles éco-responsables'
  },
  {
    id: '2',
    name: 'Thomas Durand',
    email: 'thomas.durand@example.com',
    phone: '07 98 76 54 32',
    type: 'seller',
    status: 'active',
    lastActivity: '2025-04-09',
    notes: 'Vendeur professionnel très actif'
  },
  {
    id: '3',
    name: 'Camille Petit',
    email: 'camille.petit@example.com',
    phone: '06 45 67 89 01',
    type: 'buyer_seller',
    status: 'inactive',
    lastActivity: '2025-03-20',
    notes: 'Achète et vend des articles de mode'
  },
  {
    id: '4',
    name: 'Lucas Bernard',
    email: 'lucas.bernard@example.com',
    phone: '07 23 45 67 89',
    type: 'seller',
    status: 'active',
    lastActivity: '2025-04-07',
    notes: 'Vendeur de produits électroniques'
  },
  {
    id: '5',
    name: 'Emma Dubois',
    email: 'emma.dubois@example.com',
    phone: '06 78 90 12 34',
    type: 'buyer',
    status: 'inactive',
    lastActivity: '2025-03-15',
    notes: ''
  },
  {
    id: '6',
    name: 'Hugo Moreau',
    email: 'hugo.moreau@example.com',
    phone: '07 34 56 78 90',
    type: 'buyer_seller',
    status: 'active',
    lastActivity: '2025-04-06',
    notes: 'À contacter pour le programme d\'ambassadeur'
  },
  {
    id: '7',
    name: 'Léa Roux',
    email: 'lea.roux@example.com',
    phone: '06 56 78 90 12',
    type: 'buyer',
    status: 'active',
    lastActivity: '2025-04-05',
    notes: 'Intéressée par les produits artisanaux'
  },
  {
    id: '8',
    name: 'Jules Fournier',
    email: 'jules.fournier@example.com',
    phone: '07 67 89 01 23',
    type: 'seller',
    status: 'active',
    lastActivity: '2025-04-08',
    notes: 'Vendeur de livres et jeux de société'
  }
];

interface ContactsListProps {
  searchTerm: string;
  setActiveTab?: (tab: string) => void; // Added this prop for tab navigation
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
  const filteredContacts = CONTACTS_DATA.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    
    const matchesType = selectedType === 'all' || contact.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedType('all')} 
                className={selectedType === 'all' ? 'bg-primary text-primary-foreground' : ''}>
                Tous
              </Button>
              <Button variant="outline" onClick={() => setSelectedType('buyer')} 
                className={selectedType === 'buyer' ? 'bg-primary text-primary-foreground' : ''}>
                Acheteurs
              </Button>
              <Button variant="outline" onClick={() => setSelectedType('seller')} 
                className={selectedType === 'seller' ? 'bg-primary text-primary-foreground' : ''}>
                Vendeurs
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} alt={contact.name} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {contact.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{contact.email}</div>
                    <div className="text-xs text-muted-foreground">{contact.phone}</div>
                  </TableCell>
                  <TableCell>
                    {contact.type === 'buyer' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Acheteur</Badge>
                    )}
                    {contact.type === 'seller' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vendeur</Badge>
                    )}
                    {contact.type === 'buyer_seller' && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Acheteur/Vendeur</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {contact.status === 'active' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Actif</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactif</Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(contact.lastActivity)}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={contact.notes}>
                    {contact.notes || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleViewProfile(contact.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Tag className="mr-2 h-4 w-4" />
                          Ajouter une note
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Affichage de {filteredContacts.length} contact(s) sur {CONTACTS_DATA.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={true}>Précédent</Button>
          <Button variant="outline" size="sm" disabled={true}>Suivant</Button>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
