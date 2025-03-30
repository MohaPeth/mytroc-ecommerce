
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingCart, 
  BarChart4, 
  Settings, 
  LogOut,
  Menu,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Mes produits', path: '/dashboard/produits', icon: Package },
    { label: 'Ajouter un produit', path: '/dashboard/ajouter-produit', icon: PlusCircle },
    { label: 'Commandes', path: '/dashboard/commandes', icon: ShoppingCart },
    { label: 'Statistiques', path: '/dashboard/statistiques', icon: BarChart4 },
    { label: 'Paramètres', path: '/dashboard/parametres', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Simulation d'un utilisateur admin - dans une vraie application, cela viendrait d'un contexte d'authentification
  const isAdmin = true;

  return (
    <aside className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!collapsed && <h2 className="font-bold text-lg text-mytroc-primary">MyTroc Pro</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start font-normal h-11",
                    isActive(item.path) ? "bg-mytroc-primary/10 text-mytroc-primary" : "text-gray-600 hover:bg-gray-100",
                    collapsed ? "px-2" : "px-4"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        
        {isAdmin && (
          <>
            <div className="px-2 py-2 mt-2">
              {!collapsed && <p className="text-xs font-medium text-gray-500 uppercase px-4 mb-2">Administration</p>}
              <Link to="/super-admin">
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full justify-start font-normal h-11 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2",
                    collapsed ? "px-2" : "px-4"
                  )}
                >
                  <ShieldCheck className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && (
                    <>
                      <span>Super Admin</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                      <Badge variant="destructive" className="ml-1 px-1.5 py-0 text-[10px]">
                        Admin
                      </Badge>
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </>
        )}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-gray-600 hover:bg-gray-100 font-normal h-11",
            collapsed ? "px-2" : "px-4"
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>Déconnexion</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
