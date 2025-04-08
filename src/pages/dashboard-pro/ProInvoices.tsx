
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Search } from 'lucide-react';

const ProInvoices = () => {
  // Exemple de factures
  const invoices = [
    {
      id: 'INV-001',
      customer: 'Jean Dupont',
      amount: 149.99,
      date: '05/04/2023',
      status: 'Payée',
      order: 'ORD-001'
    },
    {
      id: 'INV-002',
      customer: 'Marie Martin',
      amount: 89.50,
      date: '03/04/2023',
      status: 'Payée',
      order: 'ORD-002'
    },
    {
      id: 'INV-003',
      customer: 'Paul Bernard',
      amount: 245.00,
      date: '01/04/2023',
      status: 'En attente',
      order: 'ORD-003'
    },
    {
      id: 'INV-004',
      customer: 'Sophie Dubois',
      amount: 67.25,
      date: '28/03/2023',
      status: 'Payée',
      order: 'ORD-004'
    },
    {
      id: 'INV-005',
      customer: 'Alexandre Moreau',
      amount: 352.75,
      date: '25/03/2023',
      status: 'Annulée',
      order: 'ORD-005'
    },
    {
      id: 'INV-006',
      customer: 'Isabelle Lefebvre',
      amount: 129.99,
      date: '20/03/2023',
      status: 'Payée',
      order: 'ORD-006'
    },
  ];

  // Exemple de facturations
  const billings = [
    {
      id: 'BILL-001',
      type: 'Abonnement Premium',
      amount: 29.99,
      date: '01/04/2023',
      status: 'Payée'
    },
    {
      id: 'BILL-002',
      type: 'Commission sur ventes',
      amount: 67.50,
      date: '01/04/2023',
      status: 'Payée'
    },
    {
      id: 'BILL-003',
      type: 'Services de promotion',
      amount: 15.00,
      date: '15/03/2023',
      status: 'Payée'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Payée':
        return <Badge className="bg-green-500">Payée</Badge>;
      case 'En attente':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'Annulée':
        return <Badge variant="secondary" className="bg-red-100 text-red-600 hover:bg-red-100">Annulée</Badge>;
      default:
        return null;
    }
  };

  return (
    <ProDashboardLayout title="Factures">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des factures</h1>
          <p className="text-muted-foreground">
            Consultez et gérez toutes vos factures et paiements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Créer une facture
          </Button>
        </div>
      </div>

      <Tabs defaultValue="client" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="client">Factures clients</TabsTrigger>
          <TabsTrigger value="platform">Facturations plateforme</TabsTrigger>
        </TabsList>

        {/* Onglet Factures clients */}
        <TabsContent value="client">
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Rechercher une facture..." 
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="paid">Payées</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="cancelled">Annulées</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tout</SelectItem>
                      <SelectItem value="this-month">Ce mois</SelectItem>
                      <SelectItem value="last-month">Mois dernier</SelectItem>
                      <SelectItem value="this-year">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">N° Facture</th>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">N° Commande</th>
                  <th className="text-left py-3 px-4">Montant</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{invoice.id}</td>
                    <td className="py-4 px-4">{invoice.customer}</td>
                    <td className="py-4 px-4">{invoice.date}</td>
                    <td className="py-4 px-4">{invoice.order}</td>
                    <td className="py-4 px-4">€{invoice.amount.toFixed(2)}</td>
                    <td className="py-4 px-4">{getStatusBadge(invoice.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de {invoices.length} factures sur {invoices.length} au total
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm" disabled>Suivant</Button>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Facturations plateforme */}
        <TabsContent value="platform">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Résumé de votre compte</CardTitle>
              <CardDescription>
                Aperçu de votre relation financière avec MyTroc
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Abonnement actuel</p>
                  <p className="text-xl font-bold mt-1">Premium</p>
                  <p className="text-sm mt-1">
                    <Badge className="bg-green-500">Actif</Badge>
                    <span className="ml-2">Renouvellement le 01/05/2023</span>
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Commissions ce mois</p>
                  <p className="text-xl font-bold mt-1">€67.50</p>
                  <p className="text-sm mt-1">
                    Sur €1,350.00 de ventes
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Solde actuel</p>
                  <p className="text-xl font-bold mt-1">€1,282.50</p>
                  <p className="text-sm mt-1">
                    Prochain versement: 15/04/2023
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique de facturation</CardTitle>
              <CardDescription>
                Toutes les factures émises par MyTroc pour votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">N° Facture</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Montant</th>
                      <th className="text-left py-3 px-4">Statut</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billings.map((billing) => (
                      <tr key={billing.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium">{billing.id}</td>
                        <td className="py-4 px-4">{billing.type}</td>
                        <td className="py-4 px-4">{billing.date}</td>
                        <td className="py-4 px-4">€{billing.amount.toFixed(2)}</td>
                        <td className="py-4 px-4">{getStatusBadge(billing.status)}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Affichage de {billings.length} factures sur {billings.length} au total
              </p>
              <Button variant="outline">Voir toutes les transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </ProDashboardLayout>
  );
};

export default ProInvoices;
