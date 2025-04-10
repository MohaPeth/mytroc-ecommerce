
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash, Tag, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ContactBadge from './ContactBadge';

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

interface ContactRowProps {
  contact: Contact;
  formatDate: (dateString: string) => string;
  onViewProfile: (contactId: string) => void;
}

const ContactRow: React.FC<ContactRowProps> = ({ 
  contact, 
  formatDate, 
  onViewProfile 
}) => {
  return (
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
        <ContactBadge type={contact.type} />
      </TableCell>
      <TableCell>
        <ContactBadge status={contact.status} />
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
              onClick={() => onViewProfile(contact.id)}
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
  );
};

export default ContactRow;
