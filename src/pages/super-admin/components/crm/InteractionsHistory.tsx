
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Calendar, 
  Filter, 
  MessageCircle, 
  Mail, 
  Ticket, 
  Bell, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for interactions
const INTERACTIONS_DATA = [
  {
    id: 'I1',
    date: '2025-04-09',
    user: {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sophie Martin'
    },
    type: 'message',
    subject: 'Question sur la livraison',
    status: 'resolved',
    assignedTo: 'Agent Support'
  },
  {
    id: 'I2',
    date: '2025-04-08',
    user: {
      id: '3',
      name: 'Camille Petit',
      email: 'camille.petit@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Camille Petit'
    },
    type: 'email',
    subject: 'Demande de remboursement',
    status: 'pending',
    assignedTo: 'Service Financier'
  },
  {
    id: 'I3',
    date: '2025-04-08',
    user: {
      id: '2',
      name: 'Thomas Durand',
      email: 'thomas.durand@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Thomas Durand'
    },
    type: 'ticket',
    subject: 'Problème technique avec la boutique',
    status: 'in_progress',
    assignedTo: 'Support Technique'
  },
  {
    id: 'I4',
    date: '2025-04-07',
    user: {
      id: '5',
      name: 'Emma Dubois',
      email: 'emma.dubois@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Emma Dubois'
    },
    type: 'notification',
    subject: 'Rappel de mise à jour des informations',
    status: 'sent',
    assignedTo: 'Système'
  },
  {
    id: 'I5',
    date: '2025-04-06',
    user: {
      id: '4',
      name: 'Lucas Bernard',
      email: 'lucas.bernard@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lucas Bernard'
    },
    type: 'message',
    subject: 'Demande d\'information sur un produit',
    status: 'resolved',
    assignedTo: 'Agent Support'
  },
  {
    id: 'I6',
    date: '2025-04-05',
    user: {
      id: '6',
      name: 'Hugo Moreau',
      email: 'hugo.moreau@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Hugo Moreau'
    },
    type: 'ticket',
    subject: 'Bug sur le processus de paiement',
    status: 'resolved',
    assignedTo: 'Support Technique'
  },
  {
    id: 'I7',
    date: '2025-04-04',
    user: {
      id: '7',
      name: 'Léa Roux',
      email: 'lea.roux@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Léa Roux'
    },
    type: 'email',
    subject: 'Question sur la politique de retour',
    status: 'resolved',
    assignedTo: 'Service Client'
  },
  {
    id: 'I8',
    date: '2025-04-03',
    user: {
      id: '8',
      name: 'Jules Fournier',
      email: 'jules.fournier@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jules Fournier'
    },
    type: 'notification',
    subject: 'Bienvenue sur MyTroc',
    status: 'sent',
    assignedTo: 'Système'
  }
];

const InteractionsHistory = () => {
  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Function to get the appropriate icon for the interaction type
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'ticket':
        return <Ticket className="h-4 w-4" />;
      case 'notification':
        return <Bell className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  // Function to get the appropriate badge for the interaction status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Résolu
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1">
            <Clock className="h-3 w-3" />
            En cours
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
            <Clock className="h-3 w-3" />
            En attente
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Envoyé
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Historique des interactions</CardTitle>
              <CardDescription>
                Suivez toutes les interactions entre la plateforme et les utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Filtrer par date
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer par type
              </Button>
              <Button size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Recherche avancée
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INTERACTIONS_DATA.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="font-medium">{interaction.id}</TableCell>
                  <TableCell>{formatDate(interaction.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={interaction.user.avatar} alt={interaction.user.name} />
                        <AvatarFallback>{interaction.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{interaction.user.name}</div>
                        <div className="text-xs text-muted-foreground">{interaction.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getInteractionIcon(interaction.type)}
                      <span className="capitalize">{interaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{interaction.subject}</TableCell>
                  <TableCell>{getStatusBadge(interaction.status)}</TableCell>
                  <TableCell>{interaction.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem>Répondre</DropdownMenuItem>
                        <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                        <DropdownMenuItem>Réassigner</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Archiver</DropdownMenuItem>
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
          Affichage de {INTERACTIONS_DATA.length} interaction(s)
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={true}>Précédent</Button>
          <Button variant="outline" size="sm" disabled={true}>Suivant</Button>
        </div>
      </div>
    </div>
  );
};

export default InteractionsHistory;
