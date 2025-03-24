
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent } from '@/components/ui/tabs';

// Import all profile components
import ProfileTabMenu from '@/components/profile/ProfileTabMenu';
import ProfileDashboard from '@/components/profile/ProfileDashboard';
import ProfileInformation from '@/components/profile/ProfileInformation';
import ProfileAddresses from '@/components/profile/ProfileAddresses';
import ProfileOrders from '@/components/profile/ProfileOrders';
import ProfilePayments from '@/components/profile/ProfilePayments';
import ProfileNotifications from '@/components/profile/ProfileNotifications';
import ProfileSecurity from '@/components/profile/ProfileSecurity';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('tableau-de-bord');
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Mon Compte</h1>
      
      {isMobile ? (
        <Tabs defaultValue="tableau-de-bord" value={activeTab} onValueChange={setActiveTab}>
          <ProfileTabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="w-full mt-4">
            <TabsContent value="tableau-de-bord"><ProfileDashboard /></TabsContent>
            <TabsContent value="informations"><ProfileInformation /></TabsContent>
            <TabsContent value="adresses"><ProfileAddresses /></TabsContent>
            <TabsContent value="commandes"><ProfileOrders /></TabsContent>
            <TabsContent value="paiements"><ProfilePayments /></TabsContent>
            <TabsContent value="notifications"><ProfileNotifications /></TabsContent>
            <TabsContent value="securite"><ProfileSecurity /></TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <ProfileTabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex-1">
            {activeTab === 'tableau-de-bord' && <ProfileDashboard />}
            {activeTab === 'informations' && <ProfileInformation />}
            {activeTab === 'adresses' && <ProfileAddresses />}
            {activeTab === 'commandes' && <ProfileOrders />}
            {activeTab === 'paiements' && <ProfilePayments />}
            {activeTab === 'notifications' && <ProfileNotifications />}
            {activeTab === 'securite' && <ProfileSecurity />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
