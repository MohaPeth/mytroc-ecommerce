
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  MessageCircle, 
  Star, 
  ShoppingCart, 
  Bell, 
  LifeBuoy, 
  RotateCcw,
  UserPlus,
  Download,
  Upload,
  Filter,
  Plus
} from 'lucide-react';
import ContactsList from './crm/ContactsList';
import UserProfile from './crm/UserProfile';
import InteractionsHistory from './crm/InteractionsHistory';
import RatingsManagement from './crm/RatingsManagement';
import SalesManagement from './crm/SalesManagement';
import NotificationsManagement from './crm/NotificationsManagement';
import CustomerSupport from './crm/CustomerSupport';
import ReturnsManagement from './crm/ReturnsManagement';

const SuperAdminCRM = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">CRM - Gestion des relations clients</h2>
          <p className="text-muted-foreground">
            Gérez l'ensemble des interactions entre la plateforme et les utilisateurs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Importer
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Ajouter un contact
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un utilisateur..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Profils</span>
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Interactions</span>
          </TabsTrigger>
          <TabsTrigger value="ratings" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Évaluations</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Ventes</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
          <TabsTrigger value="returns" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Retours</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts">
          <ContactsList searchTerm={searchTerm} />
        </TabsContent>
        
        <TabsContent value="profiles">
          <UserProfile />
        </TabsContent>
        
        <TabsContent value="interactions">
          <InteractionsHistory />
        </TabsContent>
        
        <TabsContent value="ratings">
          <RatingsManagement />
        </TabsContent>
        
        <TabsContent value="sales">
          <SalesManagement />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsManagement />
        </TabsContent>
        
        <TabsContent value="support">
          <CustomerSupport />
        </TabsContent>
        
        <TabsContent value="returns">
          <ReturnsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminCRM;
