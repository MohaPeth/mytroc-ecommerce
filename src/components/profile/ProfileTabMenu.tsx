
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  User, MessageSquare, Settings, Shield, Home, Package, CreditCard, 
  RefreshCcw, Gift, Heart, BellPlus, HeadphonesIcon, LogOut, Info, MapPin 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProfileTabMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabMenu: React.FC<ProfileTabMenuProps> = ({ activeTab, setActiveTab }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'w-full' : 'w-64'} mr-0 md:mr-8`}>
      <Card className="sticky top-20">
        <CardContent className={`p-0 ${isMobile ? 'overflow-x-auto' : ''}`}>
          {isMobile ? (
            <ScrollArea className="whitespace-nowrap py-4">
              <TabsList className="flex w-auto pl-4 h-10 space-x-1">
                <TabsTrigger value="tableau-de-bord" className="px-3 py-1 text-xs truncate">
                  <User className="h-3 w-3 mr-1" /> Tableau
                </TabsTrigger>
                <TabsTrigger value="informations" className="px-3 py-1 text-xs truncate">
                  <Info className="h-3 w-3 mr-1" /> Profil
                </TabsTrigger>
                <TabsTrigger value="adresses" className="px-3 py-1 text-xs truncate">
                  <MapPin className="h-3 w-3 mr-1" /> Adresses
                </TabsTrigger>
                <TabsTrigger value="commandes" className="px-3 py-1 text-xs truncate">
                  <Package className="h-3 w-3 mr-1" /> Commandes
                </TabsTrigger>
                <TabsTrigger value="paiements" className="px-3 py-1 text-xs truncate">
                  <CreditCard className="h-3 w-3 mr-1" /> Paiements
                </TabsTrigger>
                <TabsTrigger value="retours" className="px-3 py-1 text-xs truncate">
                  <RefreshCcw className="h-3 w-3 mr-1" /> Retours
                </TabsTrigger>
                <TabsTrigger value="bons" className="px-3 py-1 text-xs truncate">
                  <Gift className="h-3 w-3 mr-1" /> Bons
                </TabsTrigger>
                <TabsTrigger value="souhaits" className="px-3 py-1 text-xs truncate">
                  <Heart className="h-3 w-3 mr-1" /> Souhaits
                </TabsTrigger>
                <TabsTrigger value="notifications" className="px-3 py-1 text-xs truncate">
                  <BellPlus className="h-3 w-3 mr-1" /> Notifs
                </TabsTrigger>
                <TabsTrigger value="support" className="px-3 py-1 text-xs truncate">
                  <HeadphonesIcon className="h-3 w-3 mr-1" /> Support
                </TabsTrigger>
                <TabsTrigger value="securite" className="px-3 py-1 text-xs truncate">
                  <Shield className="h-3 w-3 mr-1" /> Sécurité
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          ) : (
            <div className="space-y-1 p-4">
              <Button 
                variant={activeTab === 'tableau-de-bord' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('tableau-de-bord')}
              >
                <User className="h-4 w-4 mr-2" /> Tableau de bord
              </Button>
              <Button 
                variant={activeTab === 'informations' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('informations')}
              >
                <Info className="h-4 w-4 mr-2" /> Informations
              </Button>
              <Button 
                variant={activeTab === 'adresses' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('adresses')}
              >
                <MapPin className="h-4 w-4 mr-2" /> Adresses
              </Button>
              <Button 
                variant={activeTab === 'commandes' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('commandes')}
              >
                <Package className="h-4 w-4 mr-2" /> Commandes
              </Button>
              <Button 
                variant={activeTab === 'paiements' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('paiements')}
              >
                <CreditCard className="h-4 w-4 mr-2" /> Paiements
              </Button>
              <Button 
                variant={activeTab === 'retours' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('retours')}
              >
                <RefreshCcw className="h-4 w-4 mr-2" /> Retours
              </Button>
              <Button 
                variant={activeTab === 'bons' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('bons')}
              >
                <Gift className="h-4 w-4 mr-2" /> Bons de réduction
              </Button>
              <Button 
                variant={activeTab === 'souhaits' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('souhaits')}
              >
                <Heart className="h-4 w-4 mr-2" /> Liste de souhaits
              </Button>
              <Button 
                variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('notifications')}
              >
                <BellPlus className="h-4 w-4 mr-2" /> Notifications
              </Button>
              <Button 
                variant={activeTab === 'support' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('support')}
              >
                <HeadphonesIcon className="h-4 w-4 mr-2" /> Support
              </Button>
              <Button 
                variant={activeTab === 'securite' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('securite')}
              >
                <Shield className="h-4 w-4 mr-2" /> Sécurité
              </Button>
              <Separator className="my-2" />
              <Button variant="outline" className="w-full justify-start text-red-500">
                <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTabMenu;
