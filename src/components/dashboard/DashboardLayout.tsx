
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import AssistanceButton from '@/components/AssistanceButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/boutique">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto p-6 transition-all duration-300",
          sidebarCollapsed ? "ml-[70px]" : "ml-64"
        )}>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <AssistanceButton />
    </div>
  );
};

export default DashboardLayout;
