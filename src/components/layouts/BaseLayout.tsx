
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, User, Menu as MenuIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import AssistanceButton from '@/components/AssistanceButton';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
  sidebar?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  title,
  sidebar,
  showSearch = true,
  showNotifications = true,
  className
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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

  const handleLogout = () => {
    localStorage.removeItem("mytroc-user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebar && React.cloneElement(sidebar as React.ReactElement, { 
        collapsed: sidebarCollapsed, 
        toggleSidebar 
      })}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 py-[36px]">
          {sidebar && (
            <button 
              className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100" 
              onClick={toggleSidebar} 
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{title}</h1>
            
            {showSearch && (
              <div className="relative ml-auto md:ml-8 max-w-md mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Rechercher..." className="pl-9 py-1.5 bg-gray-50 border-gray-200 focus:bg-white max-w-sm" />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {showNotifications && (
              <Button variant="ghost" size="icon" className="text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-mytroc-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  5
                </span>
              </Button>
            )}
            
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
                  <button onClick={() => navigate("/profil")} className="flex w-full">Profil</button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => navigate("/dashboard/parametres")} className="flex w-full">Paramètres</button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300",
          sidebar && (sidebarCollapsed ? "ml-[70px]" : "ml-0 md:ml-0"),
          className
        )}>
          <div className="w-full mx-auto animate-fade-in max-w-[calc(100%-20px)]">
            {children}
          </div>
        </main>
      </div>
      
      <AssistanceButton />
    </div>
  );
};

export default BaseLayout;
