
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Plus, 
  PenSquare, 
  Trash2, 
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  Forward,
  Calendar,
  FileText
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EmailCampaignForm from './forms/EmailCampaignForm';
import { toast } from 'sonner';

// Données d'exemple pour les campagnes email
const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: "Newsletter mensuelle - Avril 2025",
    subject: "Découvrez nos nouveautés du mois d'avril",
    status: "scheduled",
    recipientCount: 2458,
    openRate: 0,
    clickRate: 0,
    segment: "all_users",
    scheduledDate: "2025-04-20",
    createdAt: "2025-04-15"
  },
  {
    id: 2,
    name: "Bienvenue aux nouveaux clients",
    subject: "Bienvenue chez MyTroc ! Voici votre guide de démarrage",
    status: "active",
    recipientCount: 0,
    openRate: 67.3,
    clickRate: 24.8,
    segment: "new_users",
    scheduledDate: "auto",
    createdAt: "2025-03-01"
  },
  {
    id: 3,
    name: "Panier abandonné",
    subject: "Vous avez oublié quelque chose dans votre panier !",
    status: "active",
    recipientCount: 0,
    openRate: 54.2,
    clickRate: 38.1,
    segment: "cart_abandoners",
    scheduledDate: "auto",
    createdAt: "2025-02-15"
  },
  {
    id: 4,
    name: "Soldes d'été - Pré-annonce",
    subject: "Préparez-vous pour nos soldes d'été exceptionnelles !",
    status: "draft",
    recipientCount: 3680,
    openRate: 0,
    clickRate: 0,
    segment: "all_users",
    scheduledDate: "2025-06-15",
    createdAt: "2025-04-10"
  },
  {
    id: 5,
    name: "Enquête de satisfaction",
    subject: "Votre avis compte pour nous !",
    status: "sent",
    recipientCount: 1245,
    openRate: 42.6,
    clickRate: 18.9,
    segment: "recent_buyers",
    scheduledDate: "2025-04-05",
    createdAt: "2025-04-01"
  }
];

const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewCampaign, setViewCampaign] = useState<typeof INITIAL_CAMPAIGNS[0] | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<typeof INITIAL_CAMPAIGNS[0] | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFormSubmit = (data: any) => {
    if (editingCampaign) {
      // Mise à jour d'une campagne existante
      setCampaigns(campaigns.map(campaign => 
        campaign.id === editingCampaign.id ? { 
          ...campaign, 
          ...data
        } : campaign
      ));
      toast.success(`La campagne "${data.name}" a été mise à jour`);
    } else {
      // Création d'une nouvelle campagne
      const newCampaign = {
        id: Math.max(0, ...campaigns.map(c => c.id)) + 1,
        ...data,
        openRate: 0,
        clickRate: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCampaigns([...campaigns, newCampaign]);
      toast.success(`La campagne "${data.name}" a été créée`);
    }
    
    setIsFormOpen(false);
    setEditingCampaign(null);
  };

  const handleEditCampaign = (campaign: typeof INITIAL_CAMPAIGNS[0]) => {
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const handleDeleteCampaign = (id: number) => {
    const campaignToDelete = campaigns.find(c => c.id === id);
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    toast.success(`La campagne "${campaignToDelete?.name}" a été supprimée`);
  };

  const handleViewCampaign = (campaign: typeof INITIAL_CAMPAIGNS[0]) => {
    setViewCampaign(campaign);
    setPreviewOpen(true);
  };

  const handleDuplicateCampaign = (campaign: typeof INITIAL_CAMPAIGNS[0]) => {
    const newCampaign = {
      ...campaign,
      id: Math.max(0, ...campaigns.map(c => c.id)) + 1,
      name: `Copie de ${campaign.name}`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCampaigns([...campaigns, newCampaign]);
    toast.success(`La campagne "${campaign.name}" a été dupliquée`);
  };

  const openNewCampaignForm = () => {
    setEditingCampaign(null);
    setIsFormOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Brouillon</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Programmée</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'sent':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Envoyée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  const getSegmentLabel = (segment: string) => {
    switch (segment) {
      case 'all_users':
        return 'Tous les utilisateurs';
      case 'new_users':
        return 'Nouveaux utilisateurs';
      case 'cart_abandoners':
        return 'Paniers abandonnés';
      case 'recent_buyers':
        return 'Acheteurs récents';
      default:
        return segment;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Campagnes email</CardTitle>
          <CardDescription>
            Créez et gérez des campagnes email pour communiquer avec vos utilisateurs
          </CardDescription>
        </div>
        <Button onClick={openNewCampaignForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle campagne
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Performances</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">
                  <div>
                    {campaign.name}
                    <div className="text-xs text-muted-foreground mt-1">
                      Objet: {campaign.subject}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{getSegmentLabel(campaign.segment)}</span>
                    {campaign.recipientCount > 0 && (
                      <Badge variant="outline" className="ml-1">{campaign.recipientCount}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {campaign.scheduledDate === 'auto' 
                        ? 'Automatique' 
                        : campaign.scheduledDate}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(campaign.status)}
                </TableCell>
                <TableCell>
                  {campaign.status === 'sent' || campaign.status === 'active' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Ouvertures</span>
                        <span className="font-medium">{campaign.openRate}%</span>
                      </div>
                      <Progress value={campaign.openRate} className="h-1" />
                      <div className="flex justify-between text-xs">
                        <span>Clics</span>
                        <span className="font-medium">{campaign.clickRate}%</span>
                      </div>
                      <Progress value={campaign.clickRate} className="h-1" />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Pas encore de données
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewCampaign(campaign)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditCampaign(campaign)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDuplicateCampaign(campaign)}
                    >
                      <Forward className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteCampaign(campaign.id)}
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
          Total : {campaigns.length} campagnes
        </div>
      </CardFooter>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCampaign ? 'Modifier la campagne' : 'Créer une nouvelle campagne'}
            </DialogTitle>
            <DialogDescription>
              {editingCampaign 
                ? 'Modifiez les paramètres de la campagne existante' 
                : 'Définissez les paramètres de votre nouvelle campagne email'}
            </DialogDescription>
          </DialogHeader>
          <EmailCampaignForm 
            onSubmit={handleFormSubmit}
            initialData={editingCampaign}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Aperçu de la campagne : {viewCampaign?.name}
            </DialogTitle>
            <DialogDescription>
              {viewCampaign?.segment && `Segment ciblé : ${getSegmentLabel(viewCampaign.segment)}`}
              {viewCampaign?.scheduledDate && viewCampaign.scheduledDate !== 'auto' && ` • Date prévue : ${viewCampaign.scheduledDate}`}
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-md p-4 mt-2">
            <div className="border-b pb-2 mb-4">
              <div className="text-sm text-muted-foreground">De: MyTroc &lt;contact@mytroc.com&gt;</div>
              <div className="text-sm text-muted-foreground">À: {'{nom_destinataire}'} &lt;{'{email_destinataire}'}&gt;</div>
              <div className="text-sm text-muted-foreground">Objet: {viewCampaign?.subject}</div>
            </div>
            <div className="p-4 min-h-[300px] bg-gray-50 rounded">
              <div className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p>Ceci est un aperçu simplifié de l'email.</p>
                <p>Le contenu réel serait affiché ici, formaté en HTML avec images et styles.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Fermer
            </Button>
            <Button variant="outline" onClick={() => {
              setPreviewOpen(false);
              handleEditCampaign(viewCampaign!);
            }}>
              Modifier
            </Button>
            {viewCampaign?.status === 'draft' && (
              <Button onClick={() => {
                toast.success(`La campagne "${viewCampaign.name}" a été programmée pour envoi`);
                setCampaigns(campaigns.map(c => 
                  c.id === viewCampaign.id ? {...c, status: 'scheduled'} : c
                ));
                setPreviewOpen(false);
              }}>
                Programmer l'envoi
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EmailCampaigns;
