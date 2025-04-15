
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Plus, 
  PenSquare, 
  Trash2, 
  UserPlus,
  Mail,
  FileDown,
  Filter,
  Check,
  ShoppingBag,
  Clock,
  Star,
  Tag
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import SegmentForm from './forms/SegmentForm';
import { toast } from 'sonner';

// Données d'exemple pour les segments
const INITIAL_SEGMENTS = [
  {
    id: 1,
    name: "Acheteurs fréquents",
    description: "Clients ayant effectué au moins 3 achats dans les 30 derniers jours",
    criteria: "purchases >= 3 AND last_purchase_date >= NOW() - INTERVAL 30 DAY",
    memberCount: 245,
    tags: ["vip", "actif"],
    lastUpdated: "2025-04-15"
  },
  {
    id: 2,
    name: "Utilisateurs inactifs",
    description: "Utilisateurs n'ayant pas effectué d'achat depuis 3 mois",
    criteria: "last_purchase_date < NOW() - INTERVAL 90 DAY OR last_purchase_date IS NULL",
    memberCount: 1872,
    tags: ["inactif", "cible-réactivation"],
    lastUpdated: "2025-04-14"
  },
  {
    id: 3,
    name: "Nouveaux vendeurs",
    description: "Vendeurs inscrits dans les 14 derniers jours",
    criteria: "role = 'vendor' AND registration_date >= NOW() - INTERVAL 14 DAY",
    memberCount: 38,
    tags: ["nouveau", "vendeur"],
    lastUpdated: "2025-04-15"
  },
  {
    id: 4,
    name: "Clients Premium",
    description: "Clients ayant dépensé plus de 500€ au total",
    criteria: "total_spent > 500",
    memberCount: 128,
    tags: ["premium", "grand-dépensier"],
    lastUpdated: "2025-04-13"
  }
];

const AutomationSegments = () => {
  const [segments, setSegments] = useState(INITIAL_SEGMENTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<typeof INITIAL_SEGMENTS[0] | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<typeof INITIAL_SEGMENTS[0] | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  const handleFormSubmit = (data: any) => {
    if (editingSegment) {
      // Mise à jour d'un segment existant
      setSegments(segments.map(segment => 
        segment.id === editingSegment.id ? { 
          ...segment, 
          ...data, 
          lastUpdated: new Date().toISOString().split('T')[0] 
        } : segment
      ));
      toast.success(`Le segment "${data.name}" a été mis à jour`);
    } else {
      // Création d'un nouveau segment
      const newSegment = {
        id: Math.max(0, ...segments.map(s => s.id)) + 1,
        ...data,
        memberCount: Math.floor(Math.random() * 100),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setSegments([...segments, newSegment]);
      toast.success(`Le segment "${data.name}" a été créé`);
    }
    
    setIsFormOpen(false);
    setEditingSegment(null);
  };

  const handleEditSegment = (segment: typeof INITIAL_SEGMENTS[0]) => {
    setEditingSegment(segment);
    setIsFormOpen(true);
  };

  const handleDeleteSegment = (id: number) => {
    const segmentToDelete = segments.find(s => s.id === id);
    setSegments(segments.filter(segment => segment.id !== id));
    toast.success(`Le segment "${segmentToDelete?.name}" a été supprimé`);
  };

  const openNewSegmentForm = () => {
    setEditingSegment(null);
    setIsFormOpen(true);
  };

  const openActionDialog = (segment: typeof INITIAL_SEGMENTS[0]) => {
    setSelectedSegment(segment);
    setActionDialogOpen(true);
  };

  const handleSendEmails = () => {
    toast.success(`Préparation de l'envoi d'emails à ${selectedSegment?.memberCount} utilisateurs du segment "${selectedSegment?.name}"`);
    setActionDialogOpen(false);
  };

  const handleExportUsers = () => {
    toast.success(`Export des ${selectedSegment?.memberCount} utilisateurs du segment "${selectedSegment?.name}" en cours...`);
    setActionDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Segmentation utilisateurs</CardTitle>
          <CardDescription>
            Regroupez les utilisateurs selon leur comportement pour des actions ciblées
          </CardDescription>
        </div>
        <Button onClick={openNewSegmentForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau segment
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Critères</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Membres</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segments.map((segment) => (
              <TableRow key={segment.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {segment.name.toLowerCase().includes('acheteur') || segment.name.toLowerCase().includes('client') ? (
                      <ShoppingBag className="h-4 w-4 text-green-500" />
                    ) : segment.name.toLowerCase().includes('inactif') ? (
                      <Clock className="h-4 w-4 text-amber-500" />
                    ) : segment.name.toLowerCase().includes('vendeur') ? (
                      <Tag className="h-4 w-4 text-blue-500" />
                    ) : segment.name.toLowerCase().includes('premium') ? (
                      <Star className="h-4 w-4 text-purple-500" />
                    ) : (
                      <Users className="h-4 w-4" />
                    )}
                    {segment.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{segment.description}</div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-gray-100 p-1 rounded">
                    {segment.criteria}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {segment.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{segment.memberCount.toLocaleString()}</TableCell>
                <TableCell>{segment.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openActionDialog(segment)}
                    >
                      Actions
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditSegment(segment)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteSegment(segment.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total : {segments.length} segments, {segments.reduce((acc, segment) => acc + segment.memberCount, 0).toLocaleString()} utilisateurs
        </div>
      </CardFooter>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingSegment ? 'Modifier le segment' : 'Créer un nouveau segment'}
            </DialogTitle>
            <DialogDescription>
              {editingSegment 
                ? 'Modifiez les paramètres du segment existant' 
                : 'Définissez les critères pour grouper les utilisateurs'}
            </DialogDescription>
          </DialogHeader>
          <SegmentForm 
            onSubmit={handleFormSubmit}
            initialData={editingSegment}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actions pour le segment "{selectedSegment?.name}"</DialogTitle>
            <DialogDescription>
              {selectedSegment?.memberCount.toLocaleString()} utilisateurs correspondent aux critères
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              variant="outline" 
              className="justify-start gap-2" 
              onClick={handleSendEmails}
            >
              <Mail className="h-4 w-4" />
              Envoyer un email à ce segment
            </Button>
            <Button 
              variant="outline" 
              className="justify-start gap-2"
              onClick={handleExportUsers}
            >
              <FileDown className="h-4 w-4" />
              Exporter les utilisateurs
            </Button>
            <Button 
              variant="outline"
              className="justify-start gap-2"
            >
              <Filter className="h-4 w-4" />
              Affiner les critères
            </Button>
            <Button 
              variant="outline"
              className="justify-start gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Ajouter des utilisateurs manuellement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AutomationSegments;
