
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  BarChart4, 
  ShieldCheck, 
  LogOut,
  Home,
  Play,
  FileText,
  Flag,
  UserCog
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SuperAdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SuperAdminSidebar = ({ activeTab, setActiveTab }: SuperAdminSidebarProps) => {
  return (
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
  );
};

export default SuperAdminSidebar;
