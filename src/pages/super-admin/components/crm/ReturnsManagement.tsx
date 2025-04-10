
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  RotateCcw, Filter, FileText, Download, Settings, AlertTriangle, CheckCircle,
  XCircle, RefreshCw, Package, Plus
} from 'lucide-react';
import ReturnForm from './forms/ReturnForm';

// Mock data for returns
const RETURNS_DATA = [
  {
    id: "R001",
    orderNumber: "CMD-87562",
    customer: "Jean Dupont",
    email: "jean.dupont@example.com",
    product: "Table basse vintage",
    date: "15/03/2025",
    reason: "Produit endommagé",
    status: "approved",
    refundAmount: 129.99,
    refundDate: "20/03/2025"
  },
  {
    id: "R002",
    orderNumber: "CMD-87612",
    customer: "Marie Laurent",
    email: "marie.laurent@example.com",
    product: "Lampe design",
    date: "10/03/2025",
    reason: "Produit non conforme",
    status: "pending",
    refundAmount: 76.50,
    refundDate: null
  },
  {
    id: "R003",
    orderNumber: "CMD-88032",
    customer: "Pierre Michel",
    email: "pierre.michel@example.com",
    product: "Vase oriental",
    date: "05/03/2025",
    reason: "Erreur de commande",
    status: "rejected",
    refundAmount: 0,
    refundDate: null
  },
  {
    id: "R004",
    orderNumber: "CMD-88145",
    customer: "Sophie Girard",
    email: "sophie.girard@example.com",
    product: "Étagère modulable",
    date: "28/02/2025",
    reason: "Produit endommagé",
    status: "approved",
    refundAmount: 189.00,
    refundDate: "03/03/2025"
  },
  {
    id: "R005",
    orderNumber: "CMD-88301",
    customer: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    product: "Coussin décoratif",
    date: "20/02/2025",
    reason: "Changement d'avis",
    status: "pending",
    refundAmount: 29.90,
    refundDate: null
  }
];

const ReturnsManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const handleFormSubmit = (data: any) => {
    if (editingReturn) {
      // Logique de mise à jour
      toast.success(`Retour ${data.orderNumber} mis à jour avec succès`);
    } else {
      // Logique d'ajout
      toast.success(`Retour ${data.orderNumber} créé avec succès`);
    }
    setIsFormOpen(false);
    setEditingReturn(null);
  };

  const handleEditReturn = (returnItem: any) => {
    setEditingReturn(returnItem);
    setIsFormOpen(true);
  };

  const openNewReturnForm = () => {
    setEditingReturn(null);
    setIsFormOpen(true);
  };

  const filteredReturns = filterStatus 
    ? RETURNS_DATA.filter(item => item.status === filterStatus)
    : RETURNS_DATA;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestion des retours et réclamations</CardTitle>
              <CardDescription>
                Gérez les demandes de retour et les réclamations des utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filterStatus === null ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus(null)}
              >
                Tous
              </Button>
              <Button 
                variant={filterStatus === "pending" ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus('pending')}
              >
                <AlertTriangle className="h-4 w-4" />
                En attente
              </Button>
              <Button 
                variant={filterStatus === "approved" ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus('approved')}
              >
                <CheckCircle className="h-4 w-4" />
                Approuvés
              </Button>
              <Button 
                variant={filterStatus === "rejected" ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus('rejected')}
              >
                <XCircle className="h-4 w-4" />
                Refusés
              </Button>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={openNewReturnForm}
              >
                <Plus className="h-4 w-4" />
                Nouveau retour
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Retours en attente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {RETURNS_DATA.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-xs text-gray-500">À traiter</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Retours approuvés
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {RETURNS_DATA.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-xs text-gray-500">Ce mois-ci</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  Taux de retour
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">3.2%</div>
                <div className="text-xs text-gray-500">Sur les 30 derniers jours</div>
              </CardContent>
            </Card>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Remboursement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell>
                    <div className="font-medium">{returnItem.orderNumber}</div>
                  </TableCell>
                  <TableCell>{returnItem.customer}</TableCell>
                  <TableCell>{returnItem.product}</TableCell>
                  <TableCell>{returnItem.date}</TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell>
                    {returnItem.status === 'approved' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvé</Badge>
                    )}
                    {returnItem.status === 'pending' && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En attente</Badge>
                    )}
                    {returnItem.status === 'rejected' && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Refusé</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {returnItem.refundAmount > 0 
                      ? returnItem.refundAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                      : '-'
                    }
                    {returnItem.refundDate && (
                      <div className="text-xs text-gray-500">
                        le {returnItem.refundDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditReturn(returnItem)}>Traiter</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingReturn ? 'Modifier la demande de retour' : 'Créer une demande de retour'}
            </DialogTitle>
          </DialogHeader>
          <ReturnForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
            initialData={editingReturn && {
              orderNumber: editingReturn.orderNumber,
              customerName: editingReturn.customer,
              customerEmail: editingReturn.email,
              product: editingReturn.product,
              returnDate: new Date(),
              reason: "damaged", // Simplifié pour l'exemple
              reasonDetails: editingReturn.reason,
              status: editingReturn.status,
              refundAmount: String(editingReturn.refundAmount || ''),
              refundDate: editingReturn.refundDate ? new Date() : undefined,
              acceptReturn: editingReturn.status === 'approved',
              issueRefund: editingReturn.refundAmount > 0
            }}
            title={editingReturn ? 'Modifier la demande de retour' : 'Créer une demande de retour'}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnsManagement;
