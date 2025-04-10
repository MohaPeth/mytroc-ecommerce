
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  BarChart4, 
  ShieldCheck, 
  Search, 
  PlusCircle,
  Bell,
  LogOut,
  Settings,
  ChevronDown,
  Home,
  Play,
  FileText,
  Flag,
  UserCog
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import SuperAdminUsers from './components/SuperAdminUsers';
import SuperAdminProducts from './components/SuperAdminProducts';
import SuperAdminAnalytics from './components/SuperAdminAnalytics';
import SuperAdminSecurity from './components/SuperAdminSecurity';
import SuperAdminTesting from './components/SuperAdminTesting';
import SuperAdminInvoices from './components/SuperAdminInvoices';
import SuperAdminModeration from './components/SuperAdminModeration';
import SuperAdminCRM from './components/SuperAdminCRM';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-20 lg:w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0">
        <div className="p-4 border-b border-gray-800 flex items-center justify-center lg:justify-start gap-3">
          <ShieldCheck className="h-8 w-8 text-red-500" />
          <h1 className="text-xl font-bold hidden lg:block">Super Admin</h1>
        </div>
        
        <nav className="flex-1 py-6 px-2 lg:px-4 space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('users')}
          >
            <Users className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Utilisateurs</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('products')}
          >
            <Package className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Produits</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart4 className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Analyses</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('invoices')}
          >
            <FileText className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Factures</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('moderation')}
          >
            <Flag className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Modération</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('crm')}
          >
            <UserCog className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">CRM</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('security')}
          >
            <ShieldCheck className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Sécurité</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            onClick={() => setActiveTab('testing')}
          >
            <Play className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">Tests</span>
          </Button>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="hidden lg:flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10 border-2 border-gray-700">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback className="bg-gray-700">SA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin System</p>
              <p className="text-xs text-gray-400">admin@mytroc.com</p>
            </div>
          </div>
          
          <div className="flex lg:hidden justify-center mb-2">
            <Avatar className="h-10 w-10 border-2 border-gray-700">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback className="bg-gray-700">SA</AvatarFallback>
            </Avatar>
          </div>
          
          <Link to="/">
            <Button 
              variant="ghost" 
              className="w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11"
            >
              <LogOut className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:inline">Déconnexion</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-20 lg:ml-64 flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex gap-2 items-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              <Home className="h-5 w-5" />
            </Link>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-700 font-medium">Super Admin</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="Admin" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/">
              <Button variant="default">Retour au site</Button>
            </Link>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Dashboard Super Administrateur</h1>
            <p className="text-gray-500">Gérez tous les aspects de la plateforme MyTroc</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-8 mb-6">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Utilisateurs</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Produits</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4" />
                <span className="hidden sm:inline">Analyses</span>
              </TabsTrigger>
              <TabsTrigger value="invoices" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Factures</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Modération</span>
              </TabsTrigger>
              <TabsTrigger value="crm" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span className="hidden sm:inline">CRM</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="testing" className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
