
import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Ban, 
  ChevronDown,
  Download,
  RefreshCw,
  PlusCircle,
  Search,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

const SuperAdminUsers = () => {
  const [searchUser, setSearchUser] = useState('');
  const [userRole, setUserRole] = useState('all');
  const [userStatus, setUserStatus] = useState('all');

  // Exemple de données utilisateurs
  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-24' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com', role: 'user', status: 'active', lastLogin: '2023-05-23' },
    { id: 3, name: 'Paul Bernard', email: 'paul.bernard@example.com', role: 'vendor', status: 'inactive', lastLogin: '2023-05-20' },
    { id: 4, name: 'Sophie Dubois', email: 'sophie.dubois@example.com', role: 'user', status: 'suspended', lastLogin: '2023-05-18' },
    { id: 5, name: 'Thomas Leroy', email: 'thomas.leroy@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-22' },
  ];

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchUser === '' || 
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase());
    
    const matchesRole = userRole === 'all' || user.role === userRole;
    const matchesStatus = userStatus === 'all' || user.status === userStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Fonction pour la gestion des actions sur les utilisateurs
  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case 'edit':
        toast({
          title: "Modification d'utilisateur",
          description: `Édition de l'utilisateur ${user.name} (ID: ${userId})`,
        });
        break;
      case 'suspend':
        toast({
          title: "Compte suspendu",
          description: `Le compte de ${user.name} a été suspendu`,
          variant: "destructive",
        });
        break;
      case 'delete':
        toast({
          title: "Compte supprimé",
          description: `Le compte de ${user.name} a été supprimé`,
          variant: "destructive",
        });
        break;
      case 'promote':
        toast({
          title: "Rôle modifié",
          description: `${user.name} a été promu au rôle d'administrateur`,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Utilisateurs</CardTitle>
        <CardDescription>Ajoutez, modifiez ou suspendez des comptes utilisateurs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={userRole} onValueChange={setUserRole}>
            <SelectTrigger>
              <SelectValue placeholder="Tous les rôles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="admin">Administrateurs</SelectItem>
              <SelectItem value="vendor">Vendeurs</SelectItem>
              <SelectItem value="user">Utilisateurs</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={userStatus} onValueChange={setUserStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actifs</SelectItem>
              <SelectItem value="inactive">Inactifs</SelectItem>
              <SelectItem value="suspended">Suspendus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            {filteredUsers.length} utilisateurs trouvés
          </span>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                      {user.role === 'admin' ? 'Admin' : user.role === 'vendor' ? 'Vendeur' : 'Utilisateur'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        user.status === 'active' 
                          ? 'success' 
                          : user.status === 'inactive' 
                            ? 'secondary' 
                            : 'destructive'
                      }
                    >
                      {user.status === 'active' 
                        ? 'Actif' 
                        : user.status === 'inactive' 
                          ? 'Inactif' 
                          : 'Suspendu'
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUserAction('edit', user.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction('promote', user.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Changer le rôle
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('suspend', user.id)}
                          className="text-amber-600"
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Suspendre
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('delete', user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter les données
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Actualiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuperAdminUsers;
