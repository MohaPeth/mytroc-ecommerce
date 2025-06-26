
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Bell, User, Menu as MenuIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import AssistanceButton from '@/components/AssistanceButton';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
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
      name: "Utilisateur",
      email: "utilisateur@mytroc.com",
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

  return <div className="flex h-screen bg-gray-50">
      <DashboardSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 py-[36px]">
          <button className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100" onClick={toggleSidebar} aria-label="Toggle menu">
            <MenuIcon className="h-5 w-5" />
          </button>
          
          <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{title}</h1>
            
            <div className="relative ml-auto md:ml-8 max-w-md mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Rechercher..." className="pl-9 py-1.5 bg-gray-50 border-gray-200 focus:bg-white max-w-sm" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-mytroc-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  5
                </span>
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 font-normal hidden md:flex">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg" alt={user?.name || "Utilisateur"} />
                    <AvatarFallback className="bg-mytroc-primary text-white text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <span>{user?.name?.split(' ')[0] || "Utilisateur"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profil" className="flex w-full">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/parametres" className="flex w-full">Paramètres</Link>
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
        
        {/* Main Content - Modification du padding et des marges */}
        <main className={cn("flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300", sidebarCollapsed ? "ml-[70px]" : "ml-0 md:ml-0")}>
          <div className={cn("w-full mx-auto animate-fade-in", sidebarCollapsed ? "max-w-[calc(100%-20px)]" : "max-w-[calc(100%-20px)]")}>
            {location.pathname === "/dashboard" && <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold mb-1">Bonjour, {user?.name?.split(' ')[0] || "Utilisateur"}</h2>
                <p className="text-muted-foreground">
                  Voici un aperçu de votre activité récente
                </p>
              </div>}
            {children}
          </div>
        </main>
      </div>
      
      <AssistanceButton />
    </div>;
};
export default DashboardLayout;
