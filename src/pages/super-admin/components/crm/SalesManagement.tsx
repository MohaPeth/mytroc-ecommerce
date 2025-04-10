
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Filter, Search, Download, LineChart, BarChart
} from 'lucide-react';

// Mock data for sales
const SALES_DATA = [
  {
    id: "S001",
    orderNumber: "CMD-87562",
    customer: "Jean Dupont",
    date: "15/03/2025",
    amount: 129.99,
    status: "completed",
    paymentMethod: "card",
    commission: 12.99
  },
  {
    id: "S002",
    orderNumber: "CMD-87612",
    customer: "Marie Laurent",
    date: "10/03/2025",
    amount: 224.50,
    status: "completed",
    paymentMethod: "paypal",
    commission: 22.45
  },
  {
    id: "S003",
    orderNumber: "CMD-88032",
    customer: "Pierre Michel",
    date: "05/03/2025",
    amount: 46.90,
    status: "completed",
    paymentMethod: "card",
    commission: 4.69
  },
  {
    id: "S004",
    orderNumber: "CMD-88145",
    customer: "Sophie Girard",
    date: "28/02/2025",
    amount: 189.00,
    status: "completed",
    paymentMethod: "card",
    commission: 18.90
  },
  {
    id: "S005",
    orderNumber: "CMD-88301",
    customer: "Lucas Bernard",
    date: "20/02/2025",
    amount: 53.50,
    status: "completed",
    paymentMethod: "paypal",
    commission: 5.35
  }
];

const SalesManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestion des ventes</CardTitle>
              <CardDescription>
                Suivez toutes les ventes réalisées sur la plateforme
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <LineChart className="h-4 w-4" />
                Graphiques
              </Button>
              <Button size="sm" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Nouvelle vente
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SALES_DATA.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div className="font-medium">{sale.orderNumber}</div>
                  </TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>
                    {sale.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Complété
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {sale.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}
                  </TableCell>
                  <TableCell>
                    {sale.commission.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Total des ventes : <span className="font-semibold">{SALES_DATA.reduce((sum, sale) => sum + sale.amount, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Total commissions : <span className="font-semibold">{SALES_DATA.reduce((sum, sale) => sum + sale.commission, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesManagement;
