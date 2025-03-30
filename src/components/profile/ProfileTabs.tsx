import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingCart, CreditCard, Bell, Shield } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}
const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab
}) => {
  const isMobile = useIsMobile();
  const tabs = [{
    id: "profile",
    label: "Profil",
    icon: <User className="h-4 w-4" />
  }, {
    id: "orders",
    label: "Commandes",
    icon: <ShoppingCart className="h-4 w-4" />
  }, {
    id: "payment",
    label: "Paiement",
    icon: <CreditCard className="h-4 w-4" />
  }, {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="h-4 w-4" />
  }, {
    id: "security",
    label: "Sécurité",
    icon: <Shield className="h-4 w-4" />
  }];
  return <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5 gap-1 py-[43px]">
        {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className={`flex items-center justify-center ${isMobile ? 'flex-col px-1 py-2 text-center' : ''}`}>
            {tab.icon}
            <span className={isMobile ? "text-[10px] mt-1" : "ml-2 text-sm"}>{!isMobile && tab.label}</span>
            {isMobile && <span className="text-[10px] mt-1">{tab.label}</span>}
          </TabsTrigger>)}
      </TabsList>
    </Tabs>;
};
export default ProfileTabs;