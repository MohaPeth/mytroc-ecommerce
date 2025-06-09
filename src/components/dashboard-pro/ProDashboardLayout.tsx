
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProSidebar from './ProSidebar';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Bell, User, Menu as MenuIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface ProDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const ProDashboardLayout: React.FC<ProDashboardLayoutProps> = ({
  children,
  title
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Get the user data from localStorage if available
  const getUserData = () => {
    const userData = localStorage.getItem("mytroc-user");
    if (userData) {
      return JSON.parse(userData);
    }
    return {
      name: "Utilisateur Pro",
      email: "pro@mytroc.com",
      role: "vendor"
    };
  };
  
  const user = getUserData();
  const initials = user && user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : "U";

  // Fonction de déconnexion
  const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem("mytroc-user");
    
    // Afficher un toast de confirmation
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    
    // Rediriger vers la page de connexion
    navigate("/auth/login");
  };

  const notificationsCount = 5;
  const ordersCount = 3;

  return (
    <div className="flex h-screen bg-gray-50">
      <ProSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 py-[36px]">
          <button className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100" onClick={toggleSidebar} aria-label="Toggle menu">
            <MenuIcon className="h-5 w-5" />
          </button>
          
          <div className="flex-1 flex items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{title}</h1>
              <Badge className="ml-2 bg-amber-500 text-white hidden md:flex">Premium</Badge>
            </div>
            
            <div className="relative ml-auto md:ml-8 max-w-md mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Rechercher..." className="pl-9 py-1.5 bg-gray-50 border-gray-200 focus:bg-white max-w-sm" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/shop" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-mytroc-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {ordersCount}
                </span>
              </Button>
            </Link>
            
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-mytroc-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationsCount}
                </span>
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 font-normal hidden md:flex">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg" alt={user?.name || "Utilisateur Pro"} />
                    <AvatarFallback className="bg-amber-500 text-white text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{user?.name?.split(' ')[0] || "Utilisateur"}</span>
                    <span className="text-xs text-muted-foreground">Vendeur Premium</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex items-center">
                  <span>Mon compte</span>
                  <Badge className="ml-2 bg-amber-500 text-white">Pro</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profil" className="flex w-full">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard-pro/parametres" className="flex w-full">Paramètres</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard-pro/support" className="flex w-full">Support H24</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="text-gray-600 md:hidden">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className={cn("flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300", sidebarCollapsed ? "ml-[70px]" : "ml-0 md:ml-0")}>
          <div className={cn("w-full mx-auto animate-fade-in", sidebarCollapsed ? "max-w-[calc(100%-20px)]" : "max-w-[calc(100%-20px)]")}>
            {location.pathname === "/dashboard-pro" && (
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold mb-1">Bonjour, {user?.name?.split(' ')[0] || "Utilisateur"}</h2>
                  <Badge className="ml-3 bg-amber-500 text-white">Vendeur Premium</Badge>
                </div>
                <p className="text-muted-foreground">
                  Voici un aperçu de votre activité récente
                </p>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProDashboardLayout;
