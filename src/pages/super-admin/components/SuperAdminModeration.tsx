
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Bell, 
  Check, 
  Flag, 
  Search, 
  Shield, 
  Trash, 
  UserX,
  Link as LinkIcon,
  ArrowUpDown,
  Eye,
  MessageSquare,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Types
interface ProductReport {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  reasonText: string;
  comment: string;
  screenshot?: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'resolved';
  adminComment?: string;
}

// Mock data
const mockReports: ProductReport[] = [
  {
    id: 'r1',
    productId: 1,
    productName: 'TV OLED SMART LG C2 42 (106CM) 4K',
    productImage: '/placeholder.svg',
    sellerId: 's1',
    sellerName: 'MarcElectroBoutique',
    reporterId: 'u1',
    reporterName: 'Jean Dupont',
    reason: 'misleading',
    reasonText: 'Contenu trompeur ou frauduleux',
    comment: 'Le produit n\'est pas neuf comme indiqué dans l\'annonce. Il s\'agit en fait d\'un modèle reconditionné.',
    screenshot: '/placeholder.svg',
    createdAt: '2023-04-15T14:30:00',
    status: 'pending'
  },
  {
    id: 'r2',
    productId: 3,
    productName: 'Support mural TV universel',
    productImage: '/placeholder.svg',
    sellerId: 's2',
    sellerName: 'MonturesExpert',
    reporterId: 'u2',
    reporterName: 'Marie Durand',
    reason: 'pricing',
    reasonText: 'Prix excessif ou suspect',
    comment: 'Le prix est trois fois plus élevé que sur les autres sites de vente en ligne.',
    createdAt: '2023-04-20T09:15:00',
    status: 'processing'
  },
  {
    id: 'r3',
    productId: 5,
    productName: 'Console PlayStation 5',
    productImage: '/placeholder.svg',
    sellerId: 's1',
    sellerName: 'MarcElectroBoutique',
    reporterId: 'u3',
    reporterName: 'Pierre Martin',
    reason: 'nonconforming',
    reasonText: 'Produit non conforme à la description',
    comment: 'Le produit est présenté comme neuf mais les photos montrent clairement des signes d\'usure.',
    screenshot: '/placeholder.svg',
    createdAt: '2023-04-22T16:45:00',
    status: 'resolved',
    adminComment: 'Après vérification, le vendeur a été contacté et a corrigé l\'annonce.'
  },
  {
    id: 'r4',
    productId: 2,
    productName: 'Barre de son LG',
    productImage: '/placeholder.svg',
    sellerId: 's1',
    sellerName: 'MarcElectroBoutique',
    reporterId: 'u4',
    reporterName: 'Sophie Lefebvre',
    reason: 'inappropriate',
    reasonText: 'Contenu inapproprié ou offensant',
    comment: 'La description contient des propos discriminatoires.',
    createdAt: '2023-04-25T11:20:00',
    status: 'pending'
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
          En attente
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          En traitement
        </Badge>
      );
    case 'resolved':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Résolu
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const ReasonBadge = ({ reason }: { reason: string }) => {
  switch (reason) {
    case 'misleading':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Trompeur/Frauduleux
        </Badge>
      );
    case 'nonconforming':
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
          Non conforme
        </Badge>
      );
    case 'pricing':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Prix suspect
        </Badge>
      );
    case 'inappropriate':
      return (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
          Inapproprié
        </Badge>
      );
    case 'other':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
          Autre
        </Badge>
      );
    default:
      return <Badge variant="outline">{reason}</Badge>;
  }
};

const SuperAdminModeration = () => {
  const [reports, setReports] = useState<ProductReport[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<ProductReport | null>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [showWarnDialog, setShowWarnDialog] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  
  // Filter reports
  const filteredReports = reports.filter(report => {
    // Apply status filter
    if (filterStatus !== 'all' && report.status !== filterStatus) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        report.productName.toLowerCase().includes(searchLower) ||
        report.sellerName.toLowerCase().includes(searchLower) ||
        report.reporterName.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Handle report actions
  const handleViewReport = (report: ProductReport) => {
    setSelectedReport(report);
    setShowReportDetails(true);
  };
  
  const handleValidateReport = (reportId: string) => {
    // Mark report as processing
    setReports(prev => 
      prev.map(r => r.id === reportId ? { ...r, status: 'processing' as const } : r)
    );
    
    toast({
      title: "Signalement validé",
      description: "Le signalement a été marqué comme 'En traitement'",
    });
    
    setShowReportDetails(false);
  };
  
  const handleIgnoreReport = (reportId: string) => {
    // Mark report as resolved
    setReports(prev => 
      prev.map(r => r.id === reportId ? { 
        ...r, 
        status: 'resolved' as const,
        adminComment: 'Signalement non pertinent après vérification.'
      } : r)
    );
    
    toast({
      title: "Signalement ignoré",
      description: "Le signalement a été marqué comme 'Résolu' et ignoré",
    });
    
    setShowReportDetails(false);
  };
  
  const handleWarnSeller = (reportId: string) => {
    if (!warningMessage.trim()) {
      toast({
        title: "Message requis",
        description: "Veuillez saisir un message d'avertissement",
        variant: "destructive"
      });
      return;
    }
    
    // Mark report as resolved and save admin comment
    setReports(prev => 
      prev.map(r => r.id === reportId ? { 
        ...r, 
        status: 'resolved' as const,
        adminComment: `Avertissement envoyé au vendeur: ${warningMessage}`
      } : r)
    );
    
    toast({
      title: "Avertissement envoyé",
      description: "Le vendeur a été averti et le signalement a été résolu",
    });
    
    setShowWarnDialog(false);
    setShowReportDetails(false);
    setWarningMessage('');
  };
  
  const handleRemoveProduct = (reportId: string) => {
    // Mark report as resolved with admin comment
    setReports(prev => 
      prev.map(r => r.id === reportId ? { 
        ...r, 
        status: 'resolved' as const,
        adminComment: 'Produit supprimé suite au signalement.'
      } : r)
    );
    
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé et le signalement a été résolu",
    });
    
    setShowReportDetails(false);
  };
  
  const handleSuspendSeller = (reportId: string) => {
    // Mark report as resolved with admin comment
    setReports(prev => 
      prev.map(r => r.id === reportId ? { 
        ...r, 
        status: 'resolved' as const,
        adminComment: 'Compte vendeur suspendu suite à des signalements multiples.'
      } : r)
    );
    
    toast({
      title: "Compte suspendu",
      description: "Le compte du vendeur a été suspendu et le signalement a été résolu",
    });
    
    setShowReportDetails(false);
  };

  // Stats
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    processing: reports.filter(r => r.status === 'processing').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Modération des Signalements</h2>
          <p className="text-muted-foreground">Gérez les signalements des produits par les utilisateurs</p>
        </div>
        
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Notifications
          <Badge className="ml-2 bg-red-500">{stats.pending}</Badge>
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-500">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500">En traitement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-500">Résolus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            placeholder="Rechercher un produit, vendeur ou utilisateur..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="processing">En traitement</SelectItem>
            <SelectItem value="resolved">Résolu</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Reports table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Produit</TableHead>
                <TableHead>Vendeur</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img 
                          src={report.productImage} 
                          alt={report.productName} 
                          className="w-10 h-10 object-cover rounded" 
                        />
                        <div className="truncate max-w-[200px]">{report.productName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{report.sellerName}</TableCell>
                    <TableCell>
                      <ReasonBadge reason={report.reason} />
                    </TableCell>
                    <TableCell>{report.reporterName}</TableCell>
                    <TableCell>{new Date(report.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <StatusBadge status={report.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    Aucun signalement trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Report details dialog */}
      <Dialog open={showReportDetails} onOpenChange={setShowReportDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-red-500" />
              Détails du signalement
            </DialogTitle>
            <DialogDescription>
              Examinez les détails du signalement et prenez les mesures appropriées.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Information du produit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedReport.productImage} 
                        alt={selectedReport.productName} 
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <div>
                        <h3 className="font-medium">{selectedReport.productName}</h3>
                        <Button variant="link" className="p-0 h-auto text-sm text-blue-600" asChild>
                          <a href={`/produit/${selectedReport.productId}`} target="_blank" rel="noopener noreferrer">
                            <LinkIcon className="h-3 w-3 mr-1" />
                            Voir le produit
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vendeur</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{selectedReport.sellerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{selectedReport.sellerName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Report info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Information du signalement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Signalé par</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{selectedReport.reporterName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{selectedReport.reporterName}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Raison</p>
                      <ReasonBadge reason={selectedReport.reason} />
                      <p className="mt-1 text-sm">{selectedReport.reasonText}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p>{new Date(selectedReport.createdAt).toLocaleString('fr-FR')}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Statut</p>
                      <StatusBadge status={selectedReport.status} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Comment and screenshot */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Détails supplémentaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Commentaire de l'utilisateur</p>
                    <p className="border rounded-md p-3 bg-gray-50">{selectedReport.comment}</p>
                  </div>
                  
                  {selectedReport.screenshot && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Capture d'écran fournie</p>
                      <img 
                        src={selectedReport.screenshot} 
                        alt="Screenshot de preuve" 
                        className="border rounded-md max-h-60 object-contain" 
                      />
                    </div>
                  )}
                  
                  {selectedReport.adminComment && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Commentaire administrateur</p>
                      <p className="border rounded-md p-3 bg-blue-50">{selectedReport.adminComment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Actions */}
              <div className="flex flex-wrap justify-end gap-2">
                {selectedReport.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-600 hover:bg-red-50" 
                      onClick={() => handleIgnoreReport(selectedReport.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Ignorer
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-green-200 text-green-600 hover:bg-green-50" 
                      onClick={() => handleValidateReport(selectedReport.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Valider
                    </Button>
                  </>
                )}
                
                {selectedReport.status !== 'resolved' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Choisir une action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={() => {
                        setShowWarnDialog(true);
                        setShowReportDetails(false);
                      }}>
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Avertir le vendeur</span>
                      </DropdownMenuItem>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash className="h-4 w-4 mr-2 text-red-500" />
                            <span>Supprimer l'annonce</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer l'annonce</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleRemoveProduct(selectedReport.id)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <UserX className="h-4 w-4 mr-2 text-red-700" />
                            <span>Suspendre le vendeur</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Suspendre le compte vendeur</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir suspendre le compte de ce vendeur ? Toutes ses annonces seront masquées.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleSuspendSeller(selectedReport.id)}
                            >
                              Suspendre
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={() => {
                        setShowReportDetails(false);
                      }}>
                        <X className="h-4 w-4 mr-2" />
                        <span>Fermer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Warn seller dialog */}
      <Dialog open={showWarnDialog} onOpenChange={setShowWarnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avertir le vendeur</DialogTitle>
            <DialogDescription>
              Envoyez un avertissement au vendeur concernant le signalement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="warningMessage">Message d'avertissement</Label>
              <Textarea
                id="warningMessage"
                placeholder="Écrivez votre message d'avertissement ici..."
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowWarnDialog(false);
              setShowReportDetails(true);
            }}>
              Annuler
            </Button>
            <Button 
              onClick={() => selectedReport && handleWarnSeller(selectedReport.id)}
              disabled={!warningMessage.trim()}
            >
              Envoyer l'avertissement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminModeration;
