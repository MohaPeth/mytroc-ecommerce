
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Filter, Trash2, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SuperAdminFavorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - remplacé par de vraies données Supabase plus tard
  const favorites = [
    {
      id: '1',
      user_id: 'user-1',
      product_id: 'prod-1',
      user_name: 'Jean Dupont',
      product_name: 'iPhone 14 Pro',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      user_id: 'user-2',
      product_id: 'prod-2',
      user_name: 'Marie Martin',
      product_name: 'MacBook Pro M2',
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      user_id: 'user-3',
      product_id: 'prod-3',
      user_name: 'Pierre Bernard',
      product_name: 'iPad Air',
      created_at: '2024-01-13T09:15:00Z'
    }
  ];

  const filteredFavorites = favorites.filter(fav => 
    fav.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fav.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Gestion des Favoris
          </h2>
          <p className="text-muted-foreground">
            Gérez les favoris des utilisateurs sur la plateforme
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Favoris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Favoris Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produits Favorisés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Favoris</CardTitle>
          <CardDescription>
            Consultez et gérez tous les favoris des utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par utilisateur ou produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les favoris</SelectItem>
                <SelectItem value="recent">Récents (7 jours)</SelectItem>
                <SelectItem value="older">Plus anciens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFavorites.map((favorite) => (
                <TableRow key={favorite.id}>
                  <TableCell>
                    <div className="font-medium">{favorite.user_name}</div>
                    <div className="text-sm text-muted-foreground">ID: {favorite.user_id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{favorite.product_name}</div>
                    <div className="text-sm text-muted-foreground">ID: {favorite.product_id}</div>
                  </TableCell>
                  <TableCell>
                    {new Date(favorite.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
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

export default SuperAdminFavorites;
