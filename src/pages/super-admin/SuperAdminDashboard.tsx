
import React, { useState } from 'react';
import SuperAdminSidebar from './components/layout/SuperAdminSidebar';
import SuperAdminHeader from './components/layout/SuperAdminHeader';
import SuperAdminContent from './components/layout/SuperAdminContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AssistanceButton from '@/components/AssistanceButton';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SuperAdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </SheetContent>
        </Sheet>
      ) : (
        <SuperAdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-20 lg:ml-64'}`}>
        <SuperAdminHeader />
        <SuperAdminContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Add the assistance button for mobile support */}
      <AssistanceButton />
    </div>
  );
};

export default SuperAdminDashboard;
