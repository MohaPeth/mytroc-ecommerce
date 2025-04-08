
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Lock, CreditCard, Store, User } from 'lucide-react';
import ProfileSettings from '@/components/dashboard-pro/settings/ProfileSettings';
import StoreSettings from '@/components/dashboard-pro/settings/StoreSettings';
import NotificationSettings from '@/components/dashboard-pro/settings/NotificationSettings';
import SecuritySettings from '@/components/dashboard-pro/settings/SecuritySettings';
import PaymentSettings from '@/components/dashboard-pro/settings/PaymentSettings';
import { useToast } from '@/hooks/use-toast';

const ProSettings = () => {
  const { toast } = useToast();

  const handleSaveSettings = (settingType: string) => {
    toast({
      title: "Paramètres mis à jour",
      description: `Vos paramètres ${settingType} ont été mis à jour avec succès.`,
    });
  };

  return (
    <ProDashboardLayout title="Paramètres">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Paramètres du compte</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre compte vendeur premium
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profil</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span>Boutique</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Paiement</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab Content */}
        <TabsContent value="profile">
          <ProfileSettings onSave={() => handleSaveSettings('du profil')} />
        </TabsContent>

        {/* Store Tab Content */}
        <TabsContent value="store">
          <StoreSettings onSave={() => handleSaveSettings('de la boutique')} />
        </TabsContent>

        {/* Notifications Tab Content */}
        <TabsContent value="notifications">
          <NotificationSettings onSave={() => handleSaveSettings('de notifications')} />
        </TabsContent>

        {/* Security Tab Content */}
        <TabsContent value="security">
          <SecuritySettings onSave={() => handleSaveSettings('de sécurité')} />
        </TabsContent>

        {/* Payment Tab Content */}
        <TabsContent value="payment">
          <PaymentSettings onSave={() => handleSaveSettings('de paiement')} />
        </TabsContent>
      </Tabs>
    </ProDashboardLayout>
  );
};

export default ProSettings;
