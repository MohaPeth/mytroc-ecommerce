
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Home,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SuperAdminHeader = () => {
  return (
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
  );
};

export default SuperAdminHeader;
