
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  date: string;
  type: string;
  product: string;
  amount: number;
  status: string;
  customer: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
  formatDate: (dateString: string) => string;
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des transactions</CardTitle>
        <CardDescription>Dernières transactions effectuées</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Client/Vendeur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {transaction.type === 'sale' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vente</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Achat</Badge>
                  )}
                </TableCell>
                <TableCell>{transaction.product}</TableCell>
                <TableCell>
                  {transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Terminée
                  </Badge>
                </TableCell>
                <TableCell>{transaction.customer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
