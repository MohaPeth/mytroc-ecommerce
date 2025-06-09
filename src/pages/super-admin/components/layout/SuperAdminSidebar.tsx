
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
  UserCog,
  Heart,
  Star,
  Bell,
  Activity,
  Shield,
  MapPin
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SuperAdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SuperAdminSidebar = ({ activeTab, setActiveTab }: SuperAdminSidebarProps) => {
  const menuItems = [
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'analytics', label: 'Analyses', icon: BarChart4 },
    { id: 'invoices', label: 'Factures', icon: FileText },
    { id: 'moderation', label: 'Modération', icon: Flag },
    { id: 'crm', label: 'CRM', icon: UserCog },
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'reviews', label: 'Avis', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics-events', label: 'Événements', icon: Activity },
    { id: 'audit-logs', label: 'Logs d\'Audit', icon: Shield },
    { id: 'relay-points', label: 'Points Relais', icon: MapPin },
    { id: 'security', label: 'Sécurité', icon: ShieldCheck },
    { id: 'testing', label: 'Tests', icon: Play }
  ];

  return (
    <div className="w-20 lg:w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0">
      <div className="p-4 border-b border-gray-800 flex items-center justify-center lg:justify-start gap-3">
        <ShieldCheck className="h-8 w-8 text-red-500" />
        <h1 className="text-xl font-bold hidden lg:block">Super Admin</h1>
      </div>
      
      <nav className="flex-1 py-6 px-2 lg:px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Button 
            key={item.id}
            variant="ghost" 
            className={`w-full justify-center lg:justify-start text-gray-300 hover:bg-gray-800 hover:text-white h-14 lg:h-11 ${
              activeTab === item.id ? 'bg-gray-800 text-white' : ''
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:inline">{item.label}</span>
          </Button>
        ))}
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
