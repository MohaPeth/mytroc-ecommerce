
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Settings } from 'lucide-react';
import InvoicesList from './invoices/InvoicesList';
import InvoiceCreator from './invoices/InvoiceCreator';
import InvoiceSettings from './invoices/InvoiceSettings';

const SuperAdminInvoices = () => {
  const [activeTab, setActiveTab] = useState('list');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Factures</h2>
          <p className="text-muted-foreground">
            Créez, personnalisez et gérez toutes les factures de la plateforme.
          </p>
        </div>
        <Button onClick={() => setActiveTab('create')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Facture
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Liste des Factures
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Créer une Facture
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les Factures</CardTitle>
              <CardDescription>
                Vue d'ensemble de toutes les factures générées sur la plateforme.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoicesList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Création de Facture</CardTitle>
              <CardDescription>
                Créez manuellement une nouvelle facture pour n'importe quel client.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceCreator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des Factures</CardTitle>
              <CardDescription>
                Personnalisez les modèles et options par défaut des factures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminInvoices;
