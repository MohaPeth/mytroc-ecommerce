
import React, { useState } from 'react';
import { BellIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const NotificationSettings = () => {
  // États pour les préférences de notification
  const [emailOrderNotifications, setEmailOrderNotifications] = useState(true);
  const [emailMarketingNotifications, setEmailMarketingNotifications] = useState(false);
  const [smsOrderConfirmation, setSmsOrderConfirmation] = useState(true);
  const [smsDeliveryUpdates, setSmsDeliveryUpdates] = useState(true);
  const [smsSpecialOffers, setSmsSpecialOffers] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <BellIcon className="h-5 w-5 text-mytroc-primary" />
        <h2 className="text-xl font-semibold">Préférences de notification</h2>
      </div>
      <p className="text-gray-500 mb-6">Gérez quand et comment vous souhaitez être notifié</p>
      
      <div className="space-y-6">
        <h3 className="font-medium text-lg mb-4">Email</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications de commande</p>
              <p className="text-sm text-gray-500">Recevez des emails concernant vos commandes</p>
            </div>
            <Switch 
              checked={emailOrderNotifications} 
              onCheckedChange={setEmailOrderNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Offres marketing</p>
              <p className="text-sm text-gray-500">Recevez des emails sur les nouvelles offres et produits</p>
            </div>
            <Switch 
              checked={emailMarketingNotifications} 
              onCheckedChange={setEmailMarketingNotifications} 
            />
          </div>
        </div>
        
        <div className="my-6 border-t border-gray-200 pt-6">
          <h3 className="font-medium text-lg mb-4">SMS</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Confirmation de commande</p>
                <p className="text-sm text-gray-500">Recevez un SMS lorsque votre commande est confirmée</p>
              </div>
              <Switch 
                checked={smsOrderConfirmation} 
                onCheckedChange={setSmsOrderConfirmation} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mises à jour de livraison</p>
                <p className="text-sm text-gray-500">Recevez un SMS lorsque votre commande est en cours de livraison</p>
              </div>
              <Switch 
                checked={smsDeliveryUpdates} 
                onCheckedChange={setSmsDeliveryUpdates} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Offres spéciales</p>
                <p className="text-sm text-gray-500">Recevez des SMS sur les offres spéciales et promotions</p>
              </div>
              <Switch 
                checked={smsSpecialOffers} 
                onCheckedChange={setSmsSpecialOffers} 
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;
