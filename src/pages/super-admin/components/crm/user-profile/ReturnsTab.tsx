
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RotateCcw, Package, FileText, AlertTriangle, CheckCircle, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ReturnForm from '../forms/ReturnForm';

interface ReturnsTabProps {
  userId: string;
  formatDate: (dateString: string) => string;
}

// Mock data for returns and claims
const RETURNS_DATA = [
  {
    id: "R001",
    orderNumber: "CMD-87562",
    date: "2025-03-15",
    product: "Table basse vintage",
    reason: "Produit endommagé",
    status: "approved",
    refundAmount: 129.99,
    refundDate: "2025-03-20"
  },
  {
    id: "R002",
    orderNumber: "CMD-87612",
    date: "2025-03-10",
    product: "Lampe design",
    reason: "Produit non conforme",
    status: "pending",
    refundAmount: 76.50,
    refundDate: null
  },
  {
    id: "R003",
    orderNumber: "CMD-88032",
    date: "2025-03-05",
    product: "Vase oriental",
    reason: "Erreur de commande",
    status: "rejected",
    refundAmount: 0,
    refundDate: null
  }
];

const ReturnsTab: React.FC<ReturnsTabProps> = ({ userId, formatDate }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState<any>(null);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Retours et réclamations</CardTitle>
            <CardDescription>Historique des demandes de retour et réclamations</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Traités
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              En attente
            </Button>
            <Button size="sm" className="gap-2" onClick={openNewReturnForm}>
              <Plus className="h-4 w-4" />
              Nouveau
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Remboursement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RETURNS_DATA.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell>
                    <div className="font-medium">{returnItem.orderNumber}</div>
                  </TableCell>
                  <TableCell>{formatDate(returnItem.date)}</TableCell>
                  <TableCell>{returnItem.product}</TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell>
                    {returnItem.status === 'approved' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvé</Badge>
                    )}
                    {returnItem.status === 'pending' && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">En attente</Badge>
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
                        Remboursé le {formatDate(returnItem.refundDate)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditReturn(returnItem)}>Détails</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Documents et preuves</CardTitle>
          <CardDescription>Photos et documents relatifs aux retours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {RETURNS_DATA.map((returnItem) => (
              <div key={`doc-${returnItem.id}`} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="font-medium text-sm">Documents de retour - {returnItem.orderNumber}</h3>
                </div>
                
                <div className="flex items-center justify-center h-32 bg-gray-100 rounded-md mb-3">
                  <Package className="h-10 w-10 text-gray-400" />
                </div>
                
                <div className="text-xs text-gray-500 mb-3">
                  Téléchargé le {formatDate(returnItem.date)}
                </div>
                
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Voir les documents
                </Button>
              </div>
            ))}
          </div>
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
              customerName: "Utilisateur actuel",
              customerEmail: "utilisateur@example.com",
              product: editingReturn.product,
              returnDate: new Date(editingReturn.date),
              reason: "damaged", // Simplifié pour l'exemple
              reasonDetails: editingReturn.reason,
              status: editingReturn.status,
              refundAmount: String(editingReturn.refundAmount || ''),
              refundDate: editingReturn.refundDate ? new Date(editingReturn.refundDate) : undefined,
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

export default ReturnsTab;
