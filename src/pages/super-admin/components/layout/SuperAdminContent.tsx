import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, BarChart4, FileText, Flag, UserCog, ShieldCheck, Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import SuperAdminUsers from '../SuperAdminUsers';
import SuperAdminProducts from '../SuperAdminProducts';
import SuperAdminAnalytics from '../SuperAdminAnalytics';
import SuperAdminInvoices from '../SuperAdminInvoices';
import SuperAdminModeration from '../SuperAdminModeration';
import SuperAdminCRM from '../SuperAdminCRM';
import SuperAdminSecurity from '../SuperAdminSecurity';
import SuperAdminTesting from '../SuperAdminTesting';

interface SuperAdminContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SuperAdminContent = ({ activeTab, setActiveTab }: SuperAdminContentProps) => {
  const isMobile = useIsMobile();

  return (
    <main className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Super Administrateur</h1>
        <p className="text-gray-500 text-sm md:text-base">Gérez tous les aspects de la plateforme MyTroc</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} gap-1 mb-6 overflow-x-auto`}>
          <TabsTrigger value="users" className="flex items-center gap-1 p-2 md:p-3">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-1 p-2 md:p-3">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Produits</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1 p-2 md:p-3">
            <BarChart4 className="h-4 w-4" />
            <span className="hidden sm:inline">Analyses</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-1 p-2 md:p-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Factures</span>
          </TabsTrigger>
          <TabsTrigger value="moderation" className="flex items-center gap-1 p-2 md:p-3">
            <Flag className="h-4 w-4" />
            <span className="hidden sm:inline">Modération</span>
          </TabsTrigger>
          <TabsTrigger value="crm" className="flex items-center gap-1 p-2 md:p-3">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">CRM</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1 p-2 md:p-3">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-1 p-2 md:p-3">
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline">Tests</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <SuperAdminUsers />
        </TabsContent>
        
        <TabsContent value="products">
          <SuperAdminProducts />
        </TabsContent>
        
        <TabsContent value="analytics">
          <SuperAdminAnalytics />
        </TabsContent>
        
        <TabsContent value="invoices">
          <SuperAdminInvoices />
        </TabsContent>
        
        <TabsContent value="moderation">
          <SuperAdminModeration />
        </TabsContent>
        
        <TabsContent value="crm">
          <SuperAdminCRM />
        </TabsContent>
        
        <TabsContent value="security">
          <SuperAdminSecurity />
        </TabsContent>
        
        <TabsContent value="testing">
          <SuperAdminTesting />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default SuperAdminContent;
