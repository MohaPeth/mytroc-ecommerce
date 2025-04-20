import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  ChevronFirst, 
  ChevronLast, 
  Package, 
  DollarSign, 
  PlusCircle, 
  LucideIcon, 
  Home, 
  HelpCircle,
  MessageSquare,
  Star,
  Bell,
  BadgePercent,
  FileText,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface SidebarLinkProps {
  href: string;
  text: string;
  icon: LucideIcon;
  active: boolean;
  collapsed: boolean;
  badge?: string | number;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, text, icon: Icon, active, collapsed, badge }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center py-3 px-4 text-sm font-medium rounded-md transition-colors relative",
              active 
                ? "bg-mytroc-primary/10 text-mytroc-primary hover:bg-mytroc-primary/20" 
                : "text-gray-600 hover:text-mytroc-primary hover:bg-gray-100",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>{text}</span>}
            {badge && (
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-auto bg-mytroc-secondary text-white",
                  collapsed && "absolute top-1 right-1 w-5 h-5 p-0 flex items-center justify-center"
                )}
              >
                {badge}
              </Badge>
            )}
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{text}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface ProSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const ProSidebar: React.FC<ProSidebarProps> = ({
  collapsed,
  toggleSidebar
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div 
      className={cn(
        "h-screen sticky top-0 border-r border-gray-200 transition-all duration-300 bg-white z-20",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo area with premium badge */}
        <div className={cn(
          "h-16 flex items-center px-4 border-b border-gray-200",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-mytroc-primary">MyTroc</span>
              </Link>
              <Badge className="ml-2 bg-amber-500 text-white">PRO</Badge>
            </div>
          )}
          {collapsed && (
            <Badge className="bg-amber-500 text-white">PRO</Badge>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
          >
            {collapsed ? (
              <ChevronLast className="h-5 w-5" />
            ) : (
              <ChevronFirst className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        {/* Navigation links */}
        <div className="flex-1 py-6 px-3 flex flex-col space-y-1 overflow-y-auto">
          <SidebarLink 
            href="/dashboard-pro" 
            text="Tableau de bord" 
            icon={Home} 
            active={currentPath === "/dashboard-pro"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/produits" 
            text="Mes produits" 
            icon={ShoppingBag} 
            active={currentPath === "/dashboard-pro/produits"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/billets" 
            text="Mes billets" 
            icon={Ticket} 
            active={currentPath === "/dashboard-pro/billets"} 
            collapsed={collapsed}
            badge={3}
          />
          <SidebarLink 
            href="/dashboard-pro/publier-billet" 
            text="Publier un billet" 
            icon={PlusCircle} 
            active={currentPath === "/dashboard-pro/publier-billet"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/ajouter-produit" 
            text="Ajouter produit" 
            icon={PlusCircle} 
            active={currentPath === "/dashboard-pro/ajouter-produit"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/commandes" 
            text="Commandes" 
            icon={Package} 
            active={currentPath === "/dashboard-pro/commandes"} 
            collapsed={collapsed}
            badge={3}
          />
          <SidebarLink 
            href="/dashboard-pro/offres" 
            text="Offres reçues" 
            icon={MessageSquare} 
            active={currentPath === "/dashboard-pro/offres"} 
            collapsed={collapsed}
            badge={5}
          />
          <SidebarLink 
            href="/dashboard-pro/statistiques" 
            text="Statistiques" 
            icon={BarChart3} 
            active={currentPath === "/dashboard-pro/statistiques"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/avis" 
            text="Avis clients" 
            icon={Star} 
            active={currentPath === "/dashboard-pro/avis"} 
            collapsed={collapsed}
            badge={2}
          />
          <SidebarLink 
            href="/dashboard-pro/marketing" 
            text="Marketing" 
            icon={BadgePercent} 
            active={currentPath === "/dashboard-pro/marketing"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/factures" 
            text="Factures" 
            icon={FileText} 
            active={currentPath === "/dashboard-pro/factures"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/parametres" 
            text="Paramètres" 
            icon={Settings} 
            active={currentPath === "/dashboard-pro/parametres"} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/dashboard-pro/support" 
            text="Support H24" 
            icon={HelpCircle} 
            active={currentPath === "/dashboard-pro/support"} 
            collapsed={collapsed}
            badge="24/7"
          />
        </div>
        
        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed && (
            <div className="text-xs text-gray-500">
              <p>Version Pro 2.0.0</p>
              <p className="mt-1">© 2025 MyTroc</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProSidebar;
