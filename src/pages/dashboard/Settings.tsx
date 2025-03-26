
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Bell, Settings as SettingsIcon, Sun } from 'lucide-react';
import ProfileSettings from '@/components/settings/ProfileSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <DashboardLayout title="Paramètres">
      <div className="space-y-8">
        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profil</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                <span>Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Apparence</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Version mobile avec accordion */}
        <div className="md:hidden">
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <AccordionItem value="profile">
              <AccordionTrigger className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profil</span>
              </AccordionTrigger>
              <AccordionContent>
                <ProfileSettings />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="security">
              <AccordionTrigger className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                <span>Sécurité</span>
              </AccordionTrigger>
              <AccordionContent>
                <SecuritySettings />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="notifications">
              <AccordionTrigger className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </AccordionTrigger>
              <AccordionContent>
                <NotificationSettings />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="appearance">
              <AccordionTrigger className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Apparence</span>
              </AccordionTrigger>
              <AccordionContent>
                <AppearanceSettings />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Contenu des onglets en version desktop */}
        <div className="hidden md:block">
          <TabsContent value="profile" className="mt-6">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6">
            <AppearanceSettings />
          </TabsContent>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
