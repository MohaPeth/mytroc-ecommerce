
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Filter, Plus, Edit, Trash2, Phone, Navigation, CheckCircle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SuperAdminRelayPoints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data pour les points relais
  const relayPoints = [
    {
      id: '1',
      name: 'Point Relais Central Paris',
      address: '123 Rue de Rivoli',
      city: 'Paris',
      region: 'Île-de-France',
      phone: '01 42 60 30 30',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      is_active: true,
      orders_count: 245,
      rating: 4.8,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Relais Express Lyon',
      address: '45 Avenue de la République',
      city: 'Lyon',
      region: 'Auvergne-Rhône-Alpes',
      phone: '04 78 90 12 34',
      coordinates: { lat: 45.7640, lng: 4.8357 },
      is_active: true,
      orders_count: 189,
      rating: 4.6,
      created_at: '2024-01-14T14:20:00Z',
      updated_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      name: 'Point Pickup Marseille',
      address: '67 Boulevard Saint-Charles',
      city: 'Marseille',
      region: 'Provence-Alpes-Côte d\'Azur',
      phone: '04 91 55 77 88',
      coordinates: { lat: 43.2965, lng: 5.3698 },
      is_active: false,
      orders_count: 92,
      rating: 4.2,
      created_at: '2024-01-13T09:15:00Z',
      updated_at: '2024-01-13T09:15:00Z'
    }
  ];

  const filteredRelayPoints = relayPoints.filter(point => 
    (point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
     point.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? point.is_active : !point.is_active)) &&
    (regionFilter === 'all' || point.region === regionFilter)
  );

  const regions = ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine', 'Occitanie'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-500" />
            Gestion des Points Relais
          </h2>
          <p className="text-muted-foreground">
            Gérez le réseau de points relais pour les livraisons
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau point relais
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un point relais</DialogTitle>
              <DialogDescription>
                Créez un nouveau point relais dans le réseau
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom du point relais</Label>
                <Input placeholder="Nom du point relais" />
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input placeholder="Adresse complète" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input placeholder="Ville" />
                </div>
                <div>
                  <Label htmlFor="region">Région</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Région" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input placeholder="Numéro de téléphone" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Point relais actif</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button>
                Créer le point relais
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points Relais Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-green-600">+3 ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">172</div>
            <p className="text-xs text-muted-foreground">92% du réseau</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Livraisons Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">+8% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5/5</div>
            <p className="text-xs text-green-600">+0.1 vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Réseau de Points Relais</CardTitle>
          <CardDescription>
            Gérez tous les points relais de livraison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, ville ou adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Point Relais</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelayPoints.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>
                    <div className="font-medium">{point.name}</div>
                    <div className="text-sm text-muted-foreground">{point.region}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{point.address}</div>
                    <div className="text-sm text-muted-foreground">{point.city}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {point.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    {point.is_active ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Actif
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactif
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{point.orders_count}</div>
                    <div className="text-sm text-muted-foreground">commandes</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{point.rating}/5</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-1" />
                        Carte
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
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

export default SuperAdminRelayPoints;
