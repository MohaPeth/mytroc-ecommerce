
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, DollarSign, Users, ShoppingCart, FileDown, Printer, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SalesAnalytics from './SalesAnalytics';
import UserAnalytics from './UserAnalytics';
import PerformanceAnalytics from './PerformanceAnalytics';
import CommissionsAnalytics from './CommissionsAnalytics';
import { toast } from 'sonner';

const AnalyticsManagement = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [period, setPeriod] = useState('30days');

  const handleExportReport = () => {
    toast.success(`Rapport d'analyse ${
      activeTab === 'sales' ? 'des ventes' : 
      activeTab === 'users' ? 'des utilisateurs' : 
      activeTab === 'performance' ? 'de performance' : 
      'des commissions'
    } exporté avec succès`);
  };

  const handlePrintReport = () => {
    toast.success('Préparation de l\'impression du rapport...');
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytiques</h2>
          <p className="text-muted-foreground">
            Suivez les performances de la plateforme et obtenez des insights précieux
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 derniers jours</SelectItem>
              <SelectItem value="30days">30 derniers jours</SelectItem>
              <SelectItem value="90days">90 derniers jours</SelectItem>
              <SelectItem value="year">Année en cours</SelectItem>
              <SelectItem value="alltime">Tout le temps</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={handleExportReport}>
            <FileDown className="h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" className="gap-2" onClick={handlePrintReport}>
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Ventes
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="commissions" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Commissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-6">
          <SalesAnalytics period={period} />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserAnalytics period={period} />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceAnalytics period={period} />
        </TabsContent>

        <TabsContent value="commissions" className="mt-6">
          <CommissionsAnalytics period={period} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsManagement;
