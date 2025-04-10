
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, MoreHorizontal, Filter, Search, CheckCircle, AlertTriangle, Flag, Eye, MessageCircle, XCircle, ShieldAlert
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for ratings
const RATINGS_DATA = [
  {
    id: 'R1',
    date: '2025-04-09',
    from: {
      id: '1',
      name: 'Sophie Martin',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sophie Martin'
    },
    to: {
      id: '2',
      name: 'Thomas Durand',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Thomas Durand'
    },
    rating: 5,
    comment: 'Excellent vendeur, livraison rapide et produit conforme à la description !',
    status: 'approved',
    productId: 'P1',
    productName: 'Smartphone reconditionné'
  },
  {
    id: 'R2',
    date: '2025-04-08',
    from: {
      id: '3',
      name: 'Camille Petit',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Camille Petit'
    },
    to: {
      id: '8',
      name: 'Jules Fournier',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jules Fournier'
    },
    rating: 4,
    comment: 'Bonne transaction, vendeur réactif.',
    status: 'approved',
    productId: 'P8',
    productName: 'Livre ancien'
  },
  {
    id: 'R3',
    date: '2025-04-07',
    from: {
      id: '5',
      name: 'Emma Dubois',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Emma Dubois'
    },
    to: {
      id: '2',
      name: 'Thomas Durand',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Thomas Durand'
    },
    rating: 5,
    comment: 'Très satisfaite de mon achat, je recommande !',
    status: 'approved',
    productId: 'P2',
    productName: 'Casque audio sans fil'
  },
  {
    id: 'R4',
    date: '2025-04-06',
    from: {
      id: '4',
      name: 'Lucas Bernard',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lucas Bernard'
    },
    to: {
      id: '6',
      name: 'Hugo Moreau',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Hugo Moreau'
    },
    rating: 2,
    comment: 'Produit non conforme à la description, communication difficile avec le vendeur.',
    status: 'flagged',
    productId: 'P6',
    productName: 'Enceinte portable'
  },
  {
    id: 'R5',
    date: '2025-04-05',
    from: {
      id: '7',
      name: 'Léa Roux',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Léa Roux'
    },
    to: {
      id: '4',
      name: 'Lucas Bernard',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lucas Bernard'
    },
    rating: 1,
    comment: 'Très déçue, ne répond pas aux messages et produit jamais envoyé !',
    status: 'pending_review',
    productId: 'P4',
    productName: 'Souris ergonomique'
  },
  {
    id: 'R6',
    date: '2025-04-04',
    from: {
      id: '2',
      name: 'Thomas Durand',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Thomas Durand'
    },
    to: {
      id: '1',
      name: 'Sophie Martin',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sophie Martin'
    },
    rating: 5,
    comment: 'Acheteur sérieux, paiement rapide, communication efficace.',
    status: 'approved',
    productId: 'P1',
    productName: 'Smartphone reconditionné'
  }
];

const RatingsManagement = () => {
  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Function to render stars for a rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  // Function to get the appropriate badge for the rating status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Approuvé
          </Badge>
        );
      case 'pending_review':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
            <AlertTriangle className="h-3 w-3" />
            À examiner
          </Badge>
        );
      case 'flagged':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <Flag className="h-3 w-3" />
            Signalé
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
              <CardTitle>Gestion des évaluations</CardTitle>
              <CardDescription>
                Gérez les évaluations échangées entre les utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer par note
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Flag className="h-4 w-4" />
                Voir les signalements
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
                <TableHead>De</TableHead>
                <TableHead>À</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RATINGS_DATA.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell className="font-medium">{rating.id}</TableCell>
                  <TableCell>{formatDate(rating.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={rating.from.avatar} alt={rating.from.name} />
                        <AvatarFallback>{rating.from.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">{rating.from.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={rating.to.avatar} alt={rating.to.name} />
                        <AvatarFallback>{rating.to.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">{rating.to.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm truncate max-w-[140px]" title={rating.productName}>
                      {rating.productName}
                    </div>
                    <div className="text-xs text-muted-foreground">{rating.productId}</div>
                  </TableCell>
                  <TableCell>{renderStars(rating.rating)}</TableCell>
                  <TableCell>
                    <div className="text-sm truncate max-w-[200px]" title={rating.comment}>
                      {rating.comment}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(rating.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contacter l'utilisateur
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approuver
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Flag className="mr-2 h-4 w-4" />
                          Signaler
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Masquer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <ShieldAlert className="mr-2 h-4 w-4" />
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
    </div>
  );
};

export default RatingsManagement;
