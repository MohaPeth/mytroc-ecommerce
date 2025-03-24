
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const ProfileNotifications = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    promotional: false
  });
  
  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    toast.success(`Notifications ${notifications[type] ? 'désactivées' : 'activées'}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
        <CardDescription>
          Gérez vos préférences de notification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications par email</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des mises à jour par email
            </p>
          </div>
          <Switch
            checked={notifications.email}
            onCheckedChange={() => handleNotificationChange('email')}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications push</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des notifications sur votre appareil
            </p>
          </div>
          <Switch
            checked={notifications.push}
            onCheckedChange={() => handleNotificationChange('push')}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>SMS</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des notifications par SMS
            </p>
          </div>
          <Switch
            checked={notifications.sms}
            onCheckedChange={() => handleNotificationChange('sms')}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Offres promotionnelles</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des offres et promotions
            </p>
          </div>
          <Switch
            checked={notifications.promotional}
            onCheckedChange={() => handleNotificationChange('promotional')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileNotifications;
