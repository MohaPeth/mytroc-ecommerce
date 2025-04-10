
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, Filter, FileText, Download, Settings, AlertTriangle, CheckCircle,
  XCircle, RefreshCw, Package
} from 'lucide-react';

// Mock data for returns
const RETURNS_DATA = [
  {
    id: "R001",
    orderNumber: "CMD-87562",
    customer: "Jean Dupont",
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
    product: "Coussin décoratif",
    date: "20/02/2025",
    reason: "Changement d'avis",
    status: "pending",
    refundAmount: 29.90,
    refundDate: null
  }
];

const ReturnsManagement = () => {
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
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                En attente
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Traités
              </Button>
              <Button size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Rapports
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
                <div className="text-2xl font-bold">12</div>
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
                <div className="text-2xl font-bold">48</div>
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
              {RETURNS_DATA.map((returnItem) => (
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
                    <Button variant="ghost" size="sm">Traiter</Button>
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

export default ReturnsManagement;
