
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NotificationSettingsProps {
  onSave: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notifications</CardTitle>
        <CardDescription>
          Configurez comment vous souhaitez être informé
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Notifications par email</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailOrders">Nouvelles commandes</Label>
                <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouvelle commande</p>
              </div>
              <Switch id="emailOrders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailOffers">Nouvelles offres</Label>
                <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouvelle offre</p>
              </div>
              <Switch id="emailOffers" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailReviews">Nouveaux avis</Label>
                <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouveau avis</p>
              </div>
              <Switch id="emailReviews" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailMarketing">Conseils marketing</Label>
                <p className="text-sm text-muted-foreground">Recevoir des conseils pour améliorer vos ventes</p>
              </div>
              <Switch id="emailMarketing" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Notifications sur la plateforme</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushOrders">Nouvelles commandes</Label>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvelle commande</p>
              </div>
              <Switch id="pushOrders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushOffers">Nouvelles offres</Label>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvelle offre</p>
              </div>
              <Switch id="pushOffers" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushReviews">Nouveaux avis</Label>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau avis</p>
              </div>
              <Switch id="pushReviews" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushMessages">Messages des clients</Label>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau message</p>
              </div>
              <Switch id="pushMessages" defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailDigest">Résumé d'activité</Label>
          <Select defaultValue="daily">
            <SelectTrigger>
              <SelectValue placeholder="Fréquence du résumé" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Temps réel</SelectItem>
              <SelectItem value="daily">Quotidien</SelectItem>
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
              <SelectItem value="never">Jamais</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">
            Recevez un résumé de toutes vos activités selon la fréquence choisie
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSave}>Enregistrer les modifications</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
