
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, Search, Filter, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SuperAdminReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const reviews = [
    {
      id: '1',
      user_id: 'user-1',
      product_id: 'prod-1',
      user_name: 'Jean Dupont',
      product_name: 'iPhone 14 Pro',
      rating: 5,
      comment: 'Excellent produit, très satisfait de mon achat !',
      is_verified: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      user_id: 'user-2',
      product_id: 'prod-2',
      user_name: 'Marie Martin',
      product_name: 'MacBook Pro M2',
      rating: 4,
      comment: 'Très bon ordinateur, quelques petits défauts mais globalement satisfaisant.',
      is_verified: false,
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      user_id: 'user-3',
      product_id: 'prod-3',
      user_name: 'Pierre Bernard',
      product_name: 'iPad Air',
      rating: 2,
      comment: 'Produit décevant, ne correspond pas à la description.',
      is_verified: true,
      created_at: '2024-01-13T09:15:00Z'
    }
  ];

  const filteredReviews = reviews.filter(review => 
    review.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Gestion des Avis
          </h2>
          <p className="text-muted-foreground">
            Modérez et gérez les avis clients sur la plateforme
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Avis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avis Vérifiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,891</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Avis</CardTitle>
          <CardDescription>
            Consultez et modérez tous les avis des utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par utilisateur, produit ou commentaire..."
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
                <SelectItem value="all">Tous les avis</SelectItem>
                <SelectItem value="verified">Vérifiés</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="low-rating">Notes faibles (≤2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="font-medium">{review.user_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{review.product_name}</div>
                  </TableCell>
                  <TableCell>
                    {renderStars(review.rating)}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{review.comment}</div>
                  </TableCell>
                  <TableCell>
                    {review.is_verified ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Vérifié
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <XCircle className="h-3 w-3 mr-1" />
                        En attente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(review.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      {!review.is_verified && (
                        <Button variant="outline" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Valider
                        </Button>
                      )}
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

export default SuperAdminReviews;
